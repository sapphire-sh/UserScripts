import { getArticleStatusAnchor } from '../lib/getArticleStatusAnchor';

const PROCESSED_ATTR = 'data-view-quotes';
const TWEET_SELECTOR = 'article[data-testid="tweet"]';
const STATUS_PATTERN = /\/([^/]+)\/status\/(\d+)/;

const getStatusPath = (value: string): string | null => {
	const match = STATUS_PATTERN.exec(value);
	return match ? `/${match[1]}/status/${match[2]}` : null;
};

const getPageStatusPath = (): string | null => getStatusPath(window.location.pathname);

const getArticleStatusPath = (article: HTMLElement): string | null => {
	const anchor = getArticleStatusAnchor(article);
	if (anchor === null) {
		return null;
	}

	const href = anchor.getAttribute('href');
	if (href === null) {
		return null;
	}

	return getStatusPath(href);
};

// the page's class names are generated per deploy, so the injected markup copies them off an anchor the
// page itself rendered rather than naming them
const findDonorLink = (row: Element | null, fallbackRoot: HTMLElement): HTMLAnchorElement | null =>
	row?.querySelector<HTMLAnchorElement>('a[role="link"]') ??
	fallbackRoot.querySelector<HTMLAnchorElement>('a[role="link"]');

const createLinkWrapper = (statusPath: string, donor: HTMLAnchorElement | null): HTMLElement => {
	const linkWrapper = document.createElement('div');

	const link = document.createElement('a');
	link.href = `${statusPath}/quotes`;
	link.target = '_blank';
	link.rel = 'noopener';
	link.dir = 'ltr';
	link.role = 'link';

	const span = document.createElement('span');
	span.textContent = 'View quotes';

	if (donor !== null) {
		link.className = donor.className;
		link.style.color = window.getComputedStyle(donor).color;

		const donorWrapper = donor.parentElement;
		if (donorWrapper !== null) {
			linkWrapper.className = donorWrapper.className;
		}

		const donorSpan = donor.querySelector<HTMLSpanElement>('span');
		if (donorSpan !== null) {
			span.className = donorSpan.className;
		}
	}

	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.setAttribute('viewBox', '0 0 24 24');
	svg.setAttribute('aria-hidden', 'true');
	// no donor carries the icon, so it is sized against the label text and painted with the link's own color
	svg.style.width = '1.25em';
	svg.style.height = '1.25em';
	svg.style.fill = 'currentColor';
	svg.style.verticalAlign = 'text-bottom';

	const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	path.setAttribute('d', 'M14.586 12L7.543 4.96l1.414-1.42L17.414 12l-8.457 8.46-1.414-1.42L14.586 12z');
	g.appendChild(path);
	svg.appendChild(g);

	link.appendChild(span);
	link.appendChild(svg);
	linkWrapper.appendChild(link);

	return linkWrapper;
};

const processArticle = (article: HTMLElement, pageStatusPath: string) => {
	if (article.hasAttribute(PROCESSED_ATTR)) {
		return;
	}

	const articleStatusPath = getArticleStatusPath(article);
	if (articleStatusPath !== pageStatusPath) {
		return;
	}

	if (article.querySelector('a[href$="/quotes"]') !== null) {
		article.setAttribute(PROCESSED_ATTR, '');
		return;
	}

	const group = article.querySelector<HTMLElement>('div[role="group"]');
	if (group === null) {
		return;
	}

	const groupParent = group.parentElement;
	if (groupParent === null) {
		return;
	}

	const actionWrapper = groupParent.parentElement;
	if (actionWrapper === null) {
		return;
	}

	const existingRow = groupParent.nextElementSibling;

	if (existingRow instanceof HTMLElement) {
		existingRow.appendChild(createLinkWrapper(pageStatusPath, findDonorLink(existingRow, actionWrapper)));
	} else {
		const row = document.createElement('div');
		// the row the page draws around the action group is the shape this one repeats
		row.className = groupParent.className;

		const wrapper = createLinkWrapper(pageStatusPath, findDonorLink(null, actionWrapper));
		wrapper.style.marginLeft = 'auto';
		row.appendChild(wrapper);

		actionWrapper.appendChild(row);
	}

	article.setAttribute(PROCESSED_ATTR, '');
};

const processArticlesWithin = (root: ParentNode, pageStatusPath: string) => {
	const articles = Array.from(root.querySelectorAll<HTMLElement>(TWEET_SELECTOR));
	for (const article of articles) {
		processArticle(article, pageStatusPath);
	}
};

let rafPending = false;
let pendingMutations: MutationRecord[] = [];

const processMutations = () => {
	const batch = pendingMutations;
	pendingMutations = [];
	rafPending = false;

	const pageStatusPath = getPageStatusPath();
	if (pageStatusPath === null) {
		return;
	}

	for (const mutation of batch) {
		for (const node of Array.from(mutation.addedNodes)) {
			if (!(node instanceof HTMLElement)) {
				continue;
			}
			if (node.matches(TWEET_SELECTOR)) {
				processArticle(node, pageStatusPath);
			}
			processArticlesWithin(node, pageStatusPath);
		}
	}
};

const handleMutations = (mutations: MutationRecord[]) => {
	pendingMutations.push(...mutations);
	if (!rafPending) {
		rafPending = true;
		requestAnimationFrame(processMutations);
	}
};

const observer = new MutationObserver(handleMutations);

const observationTarget = document.querySelector('[data-testid="primaryColumn"]') ?? document.documentElement;
observer.observe(observationTarget, {
	childList: true,
	subtree: true,
});

const initialPageStatusPath = getPageStatusPath();
if (initialPageStatusPath !== null) {
	processArticlesWithin(document, initialPageStatusPath);
}
