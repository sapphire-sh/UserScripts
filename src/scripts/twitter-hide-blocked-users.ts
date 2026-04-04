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
		if (Object.prototype.hasOwnProperty.call(object, key)) {
			extractBlockedScreenNames(object[key]);
		}
	}
};

const hideTweet = () => {
	const tweetEls = Array.from(document.querySelectorAll<HTMLElement>('[data-testid="cellInnerDiv"]'));

	for (const tweetEl of tweetEls) {
		let shouldHideTweet = false;

		const linkEls = Array.from(tweetEl.querySelectorAll<HTMLAnchorElement>('a[role="link"]'));

		for (const linkEl of linkEls) {
			const screenName = linkEl.getAttribute('href')?.replace(/^\//, '').toLowerCase();
			if (screenName !== undefined && screenName !== '' && blockedScreenNames.has(screenName)) {
				shouldHideTweet = true;
				break;
			}
		}

		if (shouldHideTweet) {
			tweetEl.style.opacity = '0.3';
			tweetEl.style.filter = 'grayscale(100%)';
			tweetEl.style.pointerEvents = 'none';
			tweetEl.style.transition = 'opacity 0.3s ease';
		}
	}
};

const main = () => {
	const originalSend = XMLHttpRequest.prototype.send;
	XMLHttpRequest.prototype.send = function (body) {
		this.addEventListener('load', () => {
			if (this.status === 200 && this.responseURL.includes('SearchTimeline')) {
				try {
					const data = JSON.parse(this.responseText);
					extractBlockedScreenNames(data);
				} catch (error) {
					console.error(error);
				}
			}
		});
		return originalSend.call(this, body);
	};

	const observer = new MutationObserver(hideTweet);
	observer.observe(document.documentElement, {
		childList: true,
		subtree: true,
	});
};

void (async () => {
	try {
		main();
	} catch (error) {
		console.error(error);
	}
})();

export {};
