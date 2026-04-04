import { waitForElement, waitForElements } from '@sapphire-sh/utils';

const TWEET_ID_PATTERN = /status\/(\d+)\/?/;
const IMAGE_FORMAT_PATTERN = /\.(\w+):large$/;

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

		const match = new RegExp(TWEET_ID_PATTERN).exec(linkEl.href);
		if (!match) {
			return;
		}

		const [, tweetId] = match;
		window.open(`http://acrux:9001/tweet/${tweetId}`, '_blank');
	};

	return button;
};

const _getFormat = async () => {
	const el = await waitForElement('[property="og:image"]');
	if (el === null) {
		console.error('waitForElement: og:image not found');
		return;
	}
	if (!(el instanceof HTMLMetaElement)) {
		return;
	}

	const match = new RegExp(IMAGE_FORMAT_PATTERN).exec(el.content);
	if (!match) {
		return;
	}

	return match[1];
};

const createHandler = (images: HTMLImageElement[]) => async () => {
	for (const { src } of images) {
		const url = src.replace(/name=\w+$/, 'name=orig');
		open(url);
	}
};

const getArticles = async () => {
	const articles = await waitForElements(['article', '[data-testid="error-detail"]']);
	return articles?.filter((article) => {
		const e = article.querySelector('article div[role="group"]');
		return e !== null;
	});
};

const getImages = async (article: HTMLElement) => {
	const images = await waitForElements<HTMLImageElement>('div[data-testid="tweetPhoto"] img', {
		parent: article,
	});
	return images;
};

const main = async () => {
	const articles = await getArticles();
	if (!articles || articles.length === 0) {
		const containerEl = document.querySelector('[data-testid="error-detail"]');
		if (!containerEl) {
			return;
		}

		const linkButton = createLinkButton();

		const buttonWrapperEl = document.createElement('div');
		Object.assign(buttonWrapperEl.style, {
			position: 'absolute',
			top: '8px',
			right: '64px',
		});

		buttonWrapperEl.appendChild(linkButton);

		containerEl.appendChild(buttonWrapperEl);

		return;
	}

	for (const article of articles) {
		const images = await getImages(article);
		if (!images) {
			continue;
		}
		if (images.length === 0) {
			continue;
		}

		const downloadButton = createDownloadButton(images);
		const linkButton = createLinkButton();

		const buttonWrapperEl = document.createElement('div');
		Object.assign(buttonWrapperEl.style, {
			position: 'absolute',
			top: '8px',
			right: '64px',
		});

		buttonWrapperEl.appendChild(linkButton);
		buttonWrapperEl.appendChild(downloadButton);

		article.appendChild(buttonWrapperEl);
	}
};

try {
	await main();
} catch (error) {
	console.error(error);
}
