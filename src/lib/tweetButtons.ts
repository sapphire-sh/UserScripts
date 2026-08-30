export const TWEET_ID_PATTERN = /status\/(\d+)\/?/;
export const INJECTED_ATTR = 'data-dl-injected';
export const BUTTON_WRAPPER_ATTR = 'data-dl-buttons';

const DASHBOARD_HOST_KEY = 'dashboardHost';
const DEFAULT_DASHBOARD_HOST = 'http://acrux:9001';

export const createLinkButton = () => {
	const button = document.createElement('button');
	button.textContent = 'link';

	button.onclick = () => {
		const linkEl = document.querySelector('link[rel="canonical"]');
		if (!linkEl) {
			return;
		}
		if (!(linkEl instanceof HTMLLinkElement)) {
			return;
		}

		const match = TWEET_ID_PATTERN.exec(linkEl.href);
		if (!match) {
			return;
		}

		const [, tweetId] = match;
		const host = GM_getValue(DASHBOARD_HOST_KEY, DEFAULT_DASHBOARD_HOST);
		window.open(`${host}/tweet/${tweetId}`, '_blank');
	};

	return button;
};

export const createButtonWrapper = () => {
	const wrapper = document.createElement('div');
	Object.assign(wrapper.style, {
		position: 'absolute',
		top: '8px',
		right: '64px',
	});
	return wrapper;
};
