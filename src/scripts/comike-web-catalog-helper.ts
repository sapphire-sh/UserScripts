import { waitForElement } from '@sapphire-sh/utils/browser';

interface Circle {
	Id: string;
	Author?: string;
	PixivUrl?: string;
	TwitterUrl?: string;
}

interface ModelData {
	Circles: Circle[];
}

const parseModelData = (text: string): ModelData => JSON.parse(text);

const appendArtistName = (circleEl: HTMLElement, author: string) => {
	const circleNameEl = circleEl.querySelector('.infotable-circlename');
	if (circleNameEl === null) {
		return;
	}

	const artistNameEl = document.createElement('p');
	artistNameEl.textContent = author;

	circleNameEl.appendChild(artistNameEl);
};

const getActionsEl = (circleEl: HTMLElement): Element | null => {
	let el = circleEl.nextElementSibling;
	while (el !== null) {
		if (el.querySelector('.md-support') !== null) {
			return el;
		}
		el = el.nextElementSibling;
	}
	return null;
};

const linkSupportIcon = (actionsEl: Element, selector: string, url: string) => {
	const iconEl = actionsEl.querySelector(selector);
	if (iconEl === null) {
		return;
	}

	const listEl = iconEl.parentElement;
	if (listEl === null) {
		return;
	}

	const wrapperEl = document.createElement('a');
	wrapperEl.target = '_blank';
	wrapperEl.href = url;

	iconEl.remove();
	listEl.appendChild(wrapperEl);
	wrapperEl.appendChild(iconEl.cloneNode(true));
};

const decorateCircle = (circle: Circle) => {
	const { Id, Author, PixivUrl, TwitterUrl } = circle;
	console.log('circle', circle);
	const circleEl = document.getElementById(Id);
	if (circleEl === null) {
		console.log(`cannot find circle: ${Id}`);
		return;
	}

	if (Author !== undefined && Author !== '') {
		appendArtistName(circleEl, Author);
	}

	const actionsEl = getActionsEl(circleEl);
	if (actionsEl === null) {
		return;
	}

	const links: [string, string | undefined][] = [
		['.support-list-pixiv', PixivUrl],
		['.support-list-twitter', TwitterUrl],
	];

	for (const [selector, url] of links) {
		if (url !== undefined && url !== '') {
			linkSupportIcon(actionsEl, selector, url);
		}
	}
};

const main = async () => {
	const dataEl = await waitForElement('#TheModel');
	if (dataEl === null) {
		throw new Error('cannot find #TheModel');
	}
	if (dataEl.textContent === '') {
		throw new Error('cannot find data');
	}

	const data = parseModelData(dataEl.textContent);

	console.log('data', data);

	// wait once for the rows to be present; every circle is then resolved
	// against the loaded document, so an id with no row costs nothing
	const renderedEl = await waitForElement('.infotable-circlename');
	if (renderedEl === null) {
		console.log('cannot find rendered circles');
	}

	for (const circle of data.Circles) {
		decorateCircle(circle);
	}
};

try {
	await main();
} catch (error) {
	console.error(error);
}
