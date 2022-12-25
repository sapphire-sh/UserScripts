import { waitForElement } from '../helpers';

const main = async () => {
	const dataEls = await waitForElement('#TheModel');
	const dataEl = dataEls[0];
	if (!dataEl || !dataEl.textContent) {
		throw new Error('cannot find data');
	}

	const data = JSON.parse(dataEl.textContent);

	console.log('data', data);

	for (const circle of data.Circles) {
		console.log('circle', circle);
		const circleEls = await waitForElement(`[id="${circle.Id}"]`);
		const circleEl = circleEls[0];
		if (!circleEl) {
			console.log(`cannot find circle: ${circle.Id}`);
			continue;
		}

		if (circle.Author) {
			const circleNameEl = circleEl.querySelector('.infotable-circlename');
			if (circleNameEl) {
				const artistNameEl = document.createElement('p');
				artistNameEl.textContent = circle.Author;

				circleNameEl.appendChild(artistNameEl);
			}
		}

		const getActionsEl = () => {
			if (!circleEl.parentElement) {
				return null;
			}

			const els = Array.from(circleEl.parentElement.children);
			const index = els.findIndex((x) => x === circleEl);
			return els[index + 2];
		};
		const actionsEl = getActionsEl();

		if (actionsEl) {
			if (circle.PixivUrl) {
				const pixivEl = actionsEl.querySelector('.support-list-pixiv');
				if (pixivEl) {
					const pixivWrapperEl = document.createElement('a');
					pixivWrapperEl.target = '_blank';
					pixivWrapperEl.href = circle.PixivUrl;

					const listEl = pixivEl.parentElement;
					if (listEl) {
						listEl.removeChild(pixivEl);
						listEl.appendChild(pixivWrapperEl);
						pixivWrapperEl.appendChild(pixivEl.cloneNode(true));
					}
				}
			}

			if (circle.TwitterUrl) {
				const twitterEl = actionsEl.querySelector('.support-list-twitter');
				if (twitterEl) {
					const twitterWrapperEl = document.createElement('a');
					twitterWrapperEl.target = '_blank';
					twitterWrapperEl.href = circle.TwitterUrl;

					const listEl = twitterEl.parentElement;
					if (listEl) {
						listEl.removeChild(twitterEl);
						listEl.appendChild(twitterWrapperEl);
						twitterWrapperEl.appendChild(twitterEl.cloneNode(true));
					}
				}
			}
		}
	}
};

(async () => {
	try {
		main();
	} catch (error) {
		console.error(error);
	}
})();

export {};
