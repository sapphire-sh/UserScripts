import { interceptXHR, waitForElement } from '../helpers';

const POST_ID_PATTERN = /\/posts\/(\d+)/;
const USERNAME_PATTERN = /\/@(.+?)\//;
const FANBOX_URL_PATTERN = /^https:\/\/www\.fanbox\.cc\/@/;

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
					void window.navigator.clipboard.writeText(`${id}_${title}`);
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
				const { prevLink } = links;
				const button = document.createElement('button');
				button.textContent = 'prev';
				button.onclick = () => {
					div.remove();
					location.href = prevLink;
				};
				div.appendChild(button);
			}
			if (links.nextLink !== null) {
				const { nextLink } = links;
				const button = document.createElement('button');
				button.textContent = 'next';
				button.onclick = () => {
					div.remove();
					location.href = nextLink;
				};
				div.appendChild(button);
			}
			break;
		}
	}

	return div;
};

const generateHandler = (images: HTMLAnchorElement[]) => () => {
	console.log(images);
	for (const { href } of images) {
		open(href);
	}
};

const getArticle = async () => {
	const els = await waitForElement('article');
	if (els === null) {
		throw new Error('article not found');
	}
	const x = els.item(0);
	if (!(x instanceof HTMLElement)) {
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

const getLink = (userId: string, postId: string): string =>
	`https://www.pixiv.net/fanbox/creator/${userId}/post/${postId}`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getLinks = (response: any): Links => {
	const { userId } = response.user;
	const prevId = response.prevPost?.id;
	const nextId = response.nextPost?.id;
	return {
		prevLink: prevId === undefined ? null : getLink(userId, prevId),
		nextLink: nextId === undefined ? null : getLink(userId, nextId),
	};
};

const main = async () => {
	const getArticleId = () => {
		const match = window.location.pathname.match(POST_ID_PATTERN);
		if (!match) {
			return null;
		}
		return match[1];
	};
	const getUsername = () => {
		const match = window.location.pathname.match(USERNAME_PATTERN);
		if (!match) {
			return null;
		}
		return match[1];
	};

	const articleId = getArticleId();
	if (articleId === null) {
		return;
	}

	if (FANBOX_URL_PATTERN.test(window.location.href)) {
		const username = getUsername();
		if (username === null) {
			return;
		}
		return attachA(articleId, username);
	}

	interceptXHR(/post\.info/, (xhr) => {
		const response = JSON.parse(xhr.response).body;
		if (articleId !== response.id) {
			return;
		}
		const { id } = response;
		const { title } = response;
		const links = getLinks(response);
		void attachB(id, title, links);
	});
};

try {
	await main();
} catch (error) {
	console.error(error);
}
