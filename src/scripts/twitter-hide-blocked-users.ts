import { interceptXHR } from '@sapphire-sh/utils/browser';

type JsonValue = string | number | boolean | null | undefined | JsonValue[] | JsonObject;
interface JsonObject {
	[key: string]: JsonValue;
}

const blockedScreenNames = new Set<string>();

const asJsonObject = (value: JsonValue): JsonObject | null =>
	value !== null && value !== undefined && typeof value === 'object' && !Array.isArray(value) ? value : null;

const extractBlockedScreenNames = (root: JsonValue) => {
	const stack: JsonValue[] = [root];
	while (stack.length > 0) {
		const value = stack.pop();
		if (Array.isArray(value)) {
			for (const item of value) {
				stack.push(item);
			}
			continue;
		}

		const object = asJsonObject(value);
		if (object === null) {
			continue;
		}

		const perspectives = asJsonObject(object.relationship_perspectives);
		const core = asJsonObject(object.core);
		if (perspectives?.['blocking'] === true && core !== null) {
			const { screen_name: screenName } = core;
			if (typeof screenName === 'string' && screenName !== '') {
				blockedScreenNames.add(screenName.toLowerCase());
				console.log(`blocked user: @${screenName}`);
			}
		}

		for (const key in object) {
			if (Object.hasOwn(object, key)) {
				stack.push(object[key]);
			}
		}
	}
};

const hideTweetEl = (tweetEl: HTMLElement) => {
	const linkEls = Array.from(tweetEl.querySelectorAll<HTMLAnchorElement>('a[role="link"]'));

	for (const linkEl of linkEls) {
		const screenName = linkEl.getAttribute('href')?.replace(/^\//, '').toLowerCase();
		if (screenName !== undefined && screenName !== '' && blockedScreenNames.has(screenName)) {
			tweetEl.style.setProperty('filter', 'grayscale(100%) opacity(0.3)', 'important');
			return;
		}
	}
};

let rafPending = false;
let pendingMutations: MutationRecord[] = [];

const processMutations = () => {
	const batch = pendingMutations;
	pendingMutations = [];
	rafPending = false;

	for (const mutation of batch) {
		for (const node of Array.from(mutation.addedNodes)) {
			if (!(node instanceof HTMLElement)) {
				continue;
			}
			if (node.dataset.testid === 'cellInnerDiv') {
				hideTweetEl(node);
			} else {
				const tweetEls = Array.from(node.querySelectorAll<HTMLElement>('[data-testid="cellInnerDiv"]'));
				for (const tweetEl of tweetEls) {
					hideTweetEl(tweetEl);
				}
			}
		}
	}
};

const hideTweets = (mutations: MutationRecord[]) => {
	pendingMutations.push(...mutations);
	if (!rafPending) {
		rafPending = true;
		requestAnimationFrame(processMutations);
	}
};

const main = () => {
	interceptXHR('SearchTimeline', (xhr) => {
		try {
			const data = JSON.parse(xhr.responseText);
			extractBlockedScreenNames(data);

			const tweetEls = document.querySelectorAll<HTMLElement>('[data-testid="cellInnerDiv"]');
			for (const tweetEl of Array.from(tweetEls)) {
				hideTweetEl(tweetEl);
			}
		} catch (error) {
			console.error(error);
		}
	});

	const observationTarget = document.querySelector('[data-testid="primaryColumn"]') ?? document.documentElement;
	const observer = new MutationObserver(hideTweets);
	observer.observe(observationTarget, {
		childList: true,
		subtree: true,
	});
};

try {
	main();
} catch (error) {
	console.error(error);
}
