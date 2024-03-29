import { waitForElement } from '../helpers';

enum PageType {
	A,
	B,
}

interface Links {
	prevLink: string | null;
	nextLink: string | null;
}

interface ParamsA {
	type: PageType.A;
	id: string;
	username: string;
}

interface ParamsB {
	type: PageType.B;
	id: string;
	title: string;
	links: Links;
	images: HTMLAnchorElement[];
}

const generateButtons = (params: ParamsA | ParamsB): HTMLDivElement => {
	const div = document.createElement('div');
	div.setAttribute('style', 'position:fixed;left:100px;top:100px;');

	switch (params.type) {
		case PageType.A: {
			const { id, username } = params;
			{
				const button = document.createElement('button');
				button.textContent = 'sanitize';
				button.onclick = () => {
					window.location.href = `https://${username}.fanbox.cc/posts/${id}`;
				};
				div.appendChild(button);
			}

			break;
		}
		case PageType.B: {
			const { id, title, links, images } = params;

			{
				const button = document.createElement('button');
				button.textContent = 'copy';
				button.onclick = () => {
					window.navigator.clipboard.writeText(`${id}_${title}`);
				};
				div.appendChild(button);
			}

			{
				const button = document.createElement('button');
				button.textContent = `open (${images.length})`;
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
			break;
		}
	}

	return div;
};

const generateHandler = (images: HTMLAnchorElement[]) => {
	return async () => {
		console.log(images);
		for (const { href } of images) {
			open(href);
		}
	};
};

const getArticle = async () => {
	await waitForElement('article');
	const x = document.querySelector('article');
	if (x === null) {
		throw new Error('article not found');
	}
	return x;
};

const getImages = (article: HTMLElement): HTMLAnchorElement[] => {
	const e = article.querySelectorAll<HTMLAnchorElement>('article div:last-child a');
	return Array.from(e);
};

const attachA = async (id: string, username: string) => {
	const article = await getArticle();

	const buttons = generateButtons({ type: PageType.A, id, username });
	article.appendChild(buttons);
};

const attachB = async (id: string, title: string, links: Links) => {
	const article = await getArticle();
	const images = getImages(article);

	const buttons = generateButtons({ type: PageType.B, id, title, links, images });
	article.appendChild(buttons);
};

const getLink = (userId: string, postId: string): string => {
	return `https://www.pixiv.net/fanbox/creator/${userId}/post/${postId}`;
};

const getLinks = (response: any): Links => {
	const userId = response.user.userId;
	const prevId = response.prevPost?.id;
	const nextId = response.nextPost?.id;
	return {
		prevLink: prevId !== undefined ? getLink(userId, prevId) : null,
		nextLink: nextId !== undefined ? getLink(userId, nextId) : null,
	};
};

const main = () => {
	const getArticleId = () => {
		const match = window.location.pathname.match(/\/posts\/(\d+)/);
		if (!match) {
			return null;
		}
		return match[1];
	};
	const getUsername = () => {
		const match = window.location.pathname.match(/\/@(.+?)\//);
		if (!match) {
			return null;
		}
		return match[1];
	};

	const articleId = getArticleId();
	if (!articleId) {
		return;
	}

	if (window.location.href.match(/^https:\/\/www\.fanbox\.cc\/\@/)) {
		const username = getUsername();
		if (!username) {
			return;
		}
		return attachA(articleId, username);
	}

	const XHR = window.XMLHttpRequest;
	// @ts-ignore
	window.XMLHttpRequest = function () {
		const xhr = new XHR();
		const handleReadyStateChange = () => {
			if (xhr.readyState !== 4) {
				return;
			}
			if (xhr.status !== 200) {
				return;
			}
			if (xhr.responseURL.match(/post\.info/) === null) {
				return;
			}
			const response = JSON.parse(xhr.response).body;
			if (articleId !== response.id) {
				return;
			}
			const id = response.id;
			const title = response.title;
			const links = getLinks(response);
			attachB(id, title, links);
		};
		xhr.addEventListener('readystatechange', handleReadyStateChange, false);
		return xhr;
	};
};

(async () => {
	try {
		main();
	} catch (error) {
		console.error(error);
	}
})();
