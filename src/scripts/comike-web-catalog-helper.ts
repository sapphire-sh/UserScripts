import { waitForElement } from '@sapphire-sh/utils';

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
			if (PixivUrl !== undefined && PixivUrl !== '') {
				const pixivEl = actionsEl.querySelector('.support-list-pixiv');
				if (pixivEl !== null) {
					const pixivWrapperEl = document.createElement('a');
					pixivWrapperEl.target = '_blank';
					pixivWrapperEl.href = PixivUrl;

					const listEl = pixivEl.parentElement;
					if (listEl !== null) {
						pixivEl.remove();
						listEl.appendChild(pixivWrapperEl);
						pixivWrapperEl.appendChild(pixivEl.cloneNode(true));
					}
				}
			}

			if (TwitterUrl !== undefined && TwitterUrl !== '') {
				const twitterEl = actionsEl.querySelector('.support-list-twitter');
				if (twitterEl !== null) {
					const twitterWrapperEl = document.createElement('a');
					twitterWrapperEl.target = '_blank';
					twitterWrapperEl.href = TwitterUrl;

					const listEl = twitterEl.parentElement;
					if (listEl !== null) {
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
