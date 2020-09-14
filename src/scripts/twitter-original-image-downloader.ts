import {
	sleep,
} from '../helpers';

(async () => {
	function generateButton() {
		const button = document.createElement('button');
		button.textContent = 'download';
		button.setAttribute('style', 'position:absolute;top:8px;right:48px;');
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

	async function getArticles() {
		await waitForElement('article');
		const e = document.querySelectorAll('article');
		const articles = Array.from(e);
		return articles.filter(x => {
			const e = x.querySelector('article div[role="group"]');
			return e !== null;
		});
	}

	async function getImages(article: HTMLElement) {
		await waitForElement('img[alt="Image"]');
		const e = article.querySelectorAll<HTMLImageElement>('img[alt="Image"]');
		const images = Array.from(e);
		if (images.length === 4) {
			const t = images[1];
			images[1] = images[2];
			images[2] = t;
		}
		return images;
	}

	const articles = await getArticles();

	for (const article of articles) {
		const images = await getImages(article);
		if (images.length === 0) { continue; }

		const button = generateButton();
		button.onclick = generateHandler(images);
		article.appendChild(button);
	}
})();
