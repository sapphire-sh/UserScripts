import { waitForElements } from '@sapphire-sh/utils/browser';
import { LOCATION_CHANGE_EVENT, patchHistory } from '../lib/history';

const TWEET_ID_PATTERN = /status\/(\d+)\/?/;
const INJECTED_ATTR = 'data-dl-injected';
const BUTTON_WRAPPER_ATTR = 'data-dl-buttons';

const createDownloadButton = (images: HTMLImageElement[]) => {
	const button = document.createElement('button');
	button.textContent = 'download';
	button.onclick = createHandler(images);
	return button;
};

const createLinkButton = () => {
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
		window.open(`http://acrux:9001/tweet/${tweetId}`, '_blank');
	};

	return button;
};

const createHandler = (images: HTMLImageElement[]) => async () => {
	for (const { src } of images) {
		const url = src.replace(/name=\w+$/, 'name=orig');
		open(url);
	}
};

const getArticles = async () => {
	const articles = await waitForElements(['article', '[data-testid="error-detail"]']);
	return articles?.filter((article) => article.querySelector('article div[role="group"]') !== null);
};

const createButtonWrapper = () => {
	const wrapper = document.createElement('div');
	Object.assign(wrapper.style, {
		position: 'absolute',
		top: '8px',
		right: '64px',
	});
	return wrapper;
};

const main = async () => {
	const articles = await getArticles();
	if (!articles || articles.length === 0) {
		const containerEl = document.querySelector('[data-testid="error-detail"]');
		if (!containerEl) {
			return;
		}

		const buttonWrapperEl = createButtonWrapper();
		buttonWrapperEl.appendChild(createLinkButton());

		containerEl.appendChild(buttonWrapperEl);

		return;
	}

	for (const article of articles) {
		if (article.hasAttribute(INJECTED_ATTR)) {
			continue;
		}

		const images = Array.from(article.querySelectorAll<HTMLImageElement>('div[data-testid="tweetPhoto"] img'));
		if (images.length === 0) {
			continue;
		}

		const buttonWrapperEl = createButtonWrapper();
		buttonWrapperEl.setAttribute(BUTTON_WRAPPER_ATTR, '');

		buttonWrapperEl.appendChild(createLinkButton());
		buttonWrapperEl.appendChild(createDownloadButton(images));

		article.appendChild(buttonWrapperEl);
		article.setAttribute(INJECTED_ATTR, '');
	}
};

patchHistory();

let isRunning = false;
let isPending = false;

const runMain = async () => {
	if (isRunning) {
		isPending = true;
		return;
	}

	isRunning = true;
	try {
		await main();
	} catch (error) {
		console.error(error);
	}
	isRunning = false;

	if (isPending) {
		isPending = false;
		void runMain();
	}
};

await runMain();

document.addEventListener('visibilitychange', () => {
	if (document.visibilityState === 'visible') {
		void runMain();
	}
});

window.addEventListener(LOCATION_CHANGE_EVENT, () => {
	void runMain();
});
