import { sleep } from '../helpers';

interface Links {
	prevLink: string | null;
	nextLink: string | null;
}

function generateButtons(params: { links: Links; images: HTMLAnchorElement[]; }) {
	const { links, images } = params;
	const div = document.createElement('div');
	div.setAttribute('style', 'position:fixed;left:100px;top:100px;');

	{
		const button = document.createElement('button');
		button.textContent = 'open';
		button.onclick = generateHandler(images);
		div.appendChild(button);
	}
	if (links.prevLink !== null) {
		const button = document.createElement('button');
		button.textContent = 'prev';
		button.onclick = () => {
			div.remove();
			location.href = links.prevLink!;
		};
		div.appendChild(button);
	}
	if (links.nextLink !== null) {
		const button = document.createElement('button');
		button.textContent = 'next';
		button.onclick = () => {
			div.remove();
			location.href = links.nextLink!;
		};
		div.appendChild(button);
	}

	return div;
}

async function waitForElement(selector: string) {
	while (true) {
		const e = document.querySelectorAll(selector);
		if (e.length > 0) { return e; }
		await sleep(100);
	}
}

function generateHandler(images: HTMLAnchorElement[]) {
	return async () => {
		console.log(images);
		for (const { href } of images) {
			const x = open(href);
		}
	};
}

async function getArticle() {
	await waitForElement('article');
	const x = document.querySelector('article');
	if (x === null) {
		throw new Error('article not found');
	}
	return x;
}

async function getImages(article: HTMLElement) {
	const e = article.querySelectorAll('article div:last-child a');
	return Array.from(e) as HTMLAnchorElement[];
}

async function attach(links: Links) {
	const article = await getArticle();
	const images = await getImages(article);

	const buttons = generateButtons({ links, images });
	article.appendChild(buttons);
}

function getLink(userId: string, postId: string): string {
	return `https://www.pixiv.net/fanbox/creator/${userId}/post/${postId}`;
}

function getLinks(response: any): Links {
	const userId = response.user.userId;
	const prevId = response.prevPost?.id;
	const nextId = response.nextPost?.id;
	return {
		prevLink: prevId !== undefined ? getLink(userId, prevId) : null,
		nextLink: nextId !== undefined ? getLink(userId, nextId) : null,
	};
}

(async () => {
	const XHR = window.XMLHttpRequest;
	// @ts-ignore
	window.XMLHttpRequest = () => {
		const xhr = new XHR();
		xhr.addEventListener('readystatechange', () => {
			if (xhr.readyState !== 4) {
				return;
			}
			if (xhr.status !== 200) {
				return;
			}
			if (xhr.responseURL.match(/post\.info/) === null) {
				return;
			}
			const getArticleId = () => {
				const match = window.location.pathname.match(/^\/posts\/(\d+)/);
				if (!match) {
					return null;
				}
				return match[1];
			};
			const articleId = getArticleId();
			const response = JSON.parse(xhr.response).body;
			if (articleId !== response.id) {
				return;
			}
			const links = getLinks(response);
			attach(links);
		}, false);
		return xhr;
	};

	// await main();
})();
