import { waitForElement } from '../helpers';

const generateButton = () => {
	const button = document.createElement('button');
	button.textContent = 'download';
	button.setAttribute('style', 'position:absolute;top:8px;right:48px;');
	return button;
};

const generateHandler = (images: HTMLImageElement[]) => {
	return async () => {
		for (const { src } of images) {
			const url = src.replace(/name=\w+$/, 'name=orig');
			open(url);
		}
	};
};

const getArticles = async () => {
	const selector = 'article';
	await waitForElement(selector);
	const e = document.querySelectorAll(selector);
	const articles = Array.from(e);
	return articles.filter((x) => {
		const e = x.querySelector('article div[role="group"]');
		return e !== null;
	});
};

const getImages = async (article: HTMLElement) => {
	const selector = 'div[data-testid="tweetPhoto"] img';
	await waitForElement(selector);
	const e = article.querySelectorAll<HTMLImageElement>(selector);
	const images = Array.from(e);
	// if (images.length === 4) {
	// 	const t = images[1];
	// 	images[1] = images[2];
	// 	images[2] = t;
	// }
	return images;
};

const main = async () => {
	const articles = await getArticles();

	for (const article of articles) {
		const images = await getImages(article);
		if (images.length === 0) {
			continue;
		}

		const button = generateButton();
		button.onclick = generateHandler(images);
		article.appendChild(button);
	}
};

(async () => {
	try {
		await main();
	} catch (error) {
		console.error(error);
	}
})();
