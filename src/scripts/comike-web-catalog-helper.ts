import { waitForElement } from '../helpers';

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
	const dataEls = await waitForElement('#TheModel');
	if (dataEls === null) {
		throw new Error('cannot find #TheModel');
	}
	const dataEl = dataEls.item(0);
	if (dataEl.textContent === '') {
		throw new Error('cannot find data');
	}

	const data = parseModelData(dataEl.textContent);

	console.log('data', data);

	for (const circle of data.Circles) {
		const { Id, Author, PixivUrl, TwitterUrl } = circle;
		console.log('circle', circle);
		const circleEls = await waitForElement(`[id="${Id}"]`);
		if (circleEls === null || circleEls.length === 0) {
			console.log(`cannot find circle: ${Id}`);
			continue;
		}
		const circleEl = circleEls.item(0);

		if (Author !== undefined && Author !== '') {
			const circleNameEl = circleEl.querySelector('.infotable-circlename');
			if (circleNameEl) {
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
			if (PixivUrl !== undefined && PixivUrl !== '') {
				const pixivEl = actionsEl.querySelector('.support-list-pixiv');
				if (pixivEl) {
					const pixivWrapperEl = document.createElement('a');
					pixivWrapperEl.target = '_blank';
					pixivWrapperEl.href = PixivUrl;

					const listEl = pixivEl.parentElement;
					if (listEl) {
						pixivEl.remove();
						listEl.appendChild(pixivWrapperEl);
						pixivWrapperEl.appendChild(pixivEl.cloneNode(true));
					}
				}
			}

			if (TwitterUrl !== undefined && TwitterUrl !== '') {
				const twitterEl = actionsEl.querySelector('.support-list-twitter');
				if (twitterEl) {
					const twitterWrapperEl = document.createElement('a');
					twitterWrapperEl.target = '_blank';
					twitterWrapperEl.href = TwitterUrl;

					const listEl = twitterEl.parentElement;
					if (listEl) {
						twitterEl.remove();
						listEl.appendChild(twitterWrapperEl);
						twitterWrapperEl.appendChild(twitterEl.cloneNode(true));
					}
				}
			}
		}
	}
};

try {
	await main();
} catch (error) {
	console.error(error);
}

export {};
