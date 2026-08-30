import { interceptXHR, waitForElement } from '@sapphire-sh/utils/browser';

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

const addButton = (div: HTMLDivElement, label: string, onClick: () => void): void => {
	const button = document.createElement('button');
	button.textContent = label;
	button.onclick = onClick;
	div.appendChild(button);
};

const generateButtons = (params: ParamsA | ParamsB): HTMLDivElement => {
	const div = document.createElement('div');
	div.setAttribute('style', 'position:fixed;left:100px;top:100px;');

	switch (params.type) {
		case PageType.A: {
			const { id, username } = params;
			addButton(div, 'sanitize', () => {
				window.location.href = `https://${username}.fanbox.cc/posts/${id}`;
			});

			break;
		}
		case PageType.B: {
			const { id, title, links, images } = params;

			addButton(div, 'copy', () => {
				void window.navigator.clipboard.writeText(`${id}_${title}`);
			});

			addButton(div, `open (${images.length})`, generateHandler(images));

			if (links.prevLink !== null) {
				const { prevLink } = links;
				addButton(div, 'prev', () => {
					div.remove();
					location.href = prevLink;
				});
			}
			if (links.nextLink !== null) {
				const { nextLink } = links;
				addButton(div, 'next', () => {
					div.remove();
					location.href = nextLink;
				});
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
	const el = await waitForElement('article');
	if (el === null) {
		throw new Error('article not found');
	}
	return el;
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
