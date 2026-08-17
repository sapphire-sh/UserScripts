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

	for (const circle of data.Circles) {
		const { Id, Author, PixivUrl, TwitterUrl } = circle;
		console.log('circle', circle);
		const circleEl = await waitForElement(`[id="${Id}"]`);
		if (circleEl === null) {
			console.log(`cannot find circle: ${Id}`);
			continue;
		}

		if (Author !== undefined && Author !== '') {
			const circleNameEl = circleEl.querySelector('.infotable-circlename');
			if (circleNameEl !== null) {
				const artistNameEl = document.createElement('p');
				artistNameEl.textContent = Author;

				circleNameEl.appendChild(artistNameEl);
			}
		}

		const getActionsEl = () => {
			if (circleEl.parentElement === null) {
				return null;
			}

			const els = Array.from(circleEl.parentElement.children);
			const index = els.findIndex((x) => x === circleEl);
			return els.find((el, elementIndex) => {
				if (elementIndex <= index) {
					return false;
				}
				return el.querySelector('.md-support') !== null;
			});
		};
		const actionsEl = getActionsEl();

		if (actionsEl !== undefined && actionsEl !== null) {
			const links: [string, string | undefined][] = [
				['.support-list-pixiv', PixivUrl],
				['.support-list-twitter', TwitterUrl],
			];

			for (const [selector, url] of links) {
				if (url === undefined || url === '') {
					continue;
				}

				const iconEl = actionsEl.querySelector(selector);
				if (iconEl === null) {
					continue;
				}

				const listEl = iconEl.parentElement;
				if (listEl === null) {
					continue;
				}

				const wrapperEl = document.createElement('a');
				wrapperEl.target = '_blank';
				wrapperEl.href = url;

				iconEl.remove();
				listEl.appendChild(wrapperEl);
				wrapperEl.appendChild(iconEl.cloneNode(true));
			}
		}
	}
};

try {
	await main();
} catch (error) {
	console.error(error);
}
