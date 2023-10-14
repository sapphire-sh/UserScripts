import { waitForElement, waitForElements } from '../helpers';

const generateButton = () => {
	const button = document.createElement('button');
	button.textContent = 'download';
	button.setAttribute('style', 'position:absolute;top:8px;right:48px;');
	return button;
};

const getFormat = async () => {
	const el = await waitForElement('[property="og:image"]');
	if (!el) {
		return;
	}
	if (!(el instanceof HTMLMetaElement)) {
		return;
	}

	const match = el.content.match(/\.(\w+):large$/);
	if (!match) {
		return;
	}

	return match[1];
};

const generateHandler = (images: HTMLImageElement[], format: string) => {
	return async () => {
		for (const { src } of images) {
			// const url = src.replace(/name=\w+$/, 'name=orig');
			const url = src
				.replace(/format=webp/, `format=${format}`)
				.replace(/name=\w+$/, 'name=orig');
			open(url);
		}
	};
};

const getArticles = async () => {
	const articles = await waitForElements('article');
	return articles?.filter((article) => {
		const e = article.querySelector('article div[role="group"]');
		return e !== null;
	});
};

const getImages = async (article: HTMLElement) => {
	const images = await waitForElements<HTMLImageElement>(
		'div[data-testid="tweetPhoto"] img',
		{
			parent: article,
		}
	);
	// if (images.length === 4) {
	// 	const t = images[1];
	// 	images[1] = images[2];
	// 	images[2] = t;
	// }
	return images;
};

const main = async () => {
	const articles = await getArticles();
	if (!articles) {
		return;
	}

	const format = (await getFormat()) ?? 'jpg';

	for (const article of articles) {
		const images = await getImages(article);
		if (!images) {
			continue;
		}
		if (images.length === 0) {
			continue;
		}

		const button = generateButton();
		button.onclick = generateHandler(images, format);
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
