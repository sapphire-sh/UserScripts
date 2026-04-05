import { interceptXHR } from '@sapphire-sh/utils';

const blockedScreenNames = new Set();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extractBlockedScreenNames = (object: any) => {
	if (object === null || object === undefined || typeof object !== 'object') {
		return;
	}

	if (object.relationship_perspectives?.blocking === true) {
		const screenName = object.core.screen_name;
		if (typeof screenName === 'string' && screenName !== '') {
			blockedScreenNames.add(screenName.toLowerCase());
			console.log(`blocked user: @${screenName}`);
		}
	}

	for (const key in object) {
		if (Object.hasOwn(object, key)) {
			extractBlockedScreenNames(object[key]);
		}
	}
};

const hideTweetEl = (tweetEl: HTMLElement) => {
	const linkEls = Array.from(tweetEl.querySelectorAll<HTMLAnchorElement>('a[role="link"]'));

	for (const linkEl of linkEls) {
		const screenName = linkEl.getAttribute('href')?.replace(/^\//, '').toLowerCase();
		if (screenName !== undefined && screenName !== '' && blockedScreenNames.has(screenName)) {
			tweetEl.style.setProperty('opacity', '0.3', 'important');
			tweetEl.style.setProperty('filter', 'grayscale(100%)', 'important');
			tweetEl.style.setProperty('pointer-events', 'none', 'important');
			return;
		}
	}
};

const hideTweets = (mutations: MutationRecord[]) => {
	for (const mutation of mutations) {
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

const main = () => {
	interceptXHR('SearchTimeline', (xhr) => {
		try {
			const data = JSON.parse(xhr.responseText);
			extractBlockedScreenNames(data);
		} catch (error) {
			console.error(error);
		}
	});

	const observer = new MutationObserver(hideTweets);
	observer.observe(document.documentElement, {
		childList: true,
		subtree: true,
	});
};

try {
	main();
} catch (error) {
	console.error(error);
}
