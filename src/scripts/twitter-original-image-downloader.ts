import {
	sleep,
} from '../helpers';

(async () => {
	function generateButton() {
		const button = document.createElement('button');
		button.textContent = 'download';
		button.setAttribute('style', 'position:absolute;right:0;');
		return button;
	}

	async function waitForElement(selector: string) {
		while (true) {
			const e = document.querySelectorAll(selector);
			if (e.length > 0) { return e; }
			await sleep(100);
		}
	}

	function generateHandler(images: HTMLImageElement[]) {
		return async () => {
			for (const { src } of images) {
				const url = src.replace(/name=\w+$/, 'name=orig');
				const x = open(url);
			}
		};
	}

	async function getArticle() {
		await waitForElement('article');
		const e = document.querySelectorAll('article');
		const articles = Array.from(e);
		for (const article of articles) {
			const e = article.querySelector('article > div > div[role="group"]');
			if (e !== null) { return article; }
		}
		return null;
	}

	async function getImages(article: HTMLElement) {
		await waitForElement('img[alt="Image"]');
		const e = article.querySelectorAll<HTMLImageElement>('img[alt="Image"]');
		return Array.from(e);
	}

	const article = await getArticle();
	if (article === null) { return; }

	const images = await getImages(article);
	if (images.length === 0) { return; }

	const button = generateButton();
	button.onclick = generateHandler(images);
	article.appendChild(button);
})();
