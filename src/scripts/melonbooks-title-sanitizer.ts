import { sleep } from '@sapphire-sh/utils';

const getElement = async (selector: string) => {
	let e: HTMLElement | null = null;
	while (e === null) {
		e = document.querySelector(selector);
		await sleep(100);
	}
	return e;
};

const getTitle = (text: string): string => {
	return `${text} - ${document.title}`;
};

const getTableEl = async () => {
	return await getElement('.item-detail.__light table');
};

const getCircleName = (tableEl: Element): string | null => {
	const tableRowEls = Array.from(tableEl.querySelectorAll('tr'));

	for (const tableRowEl of tableRowEls) {
		if (tableRowEl.querySelector('th')?.textContent !== 'サークル名') {
			continue;
		}

		return tableRowEl.querySelector('a')?.textContent ?? null;
	}

	return null;
};

const getArtistName = (tableEl: Element): string | null => {
	const tableRowEls = Array.from(tableEl.querySelectorAll('tr'));

	for (const tableRowEl of tableRowEls) {
		if (tableRowEl.querySelector('th')?.textContent !== '作家名') {
			continue;
		}

		return tableRowEl.querySelector('a')?.textContent ?? null;
	}

	return null;
};

const main = async () => {
	const tableEl = await getTableEl();

	const circleName = getCircleName(tableEl);
	const artistName = getArtistName(tableEl);

	const text = [artistName, circleName].filter((x) => !!x).join(' - ');

	document.title = getTitle(text);
};

(async () => {
	try {
		await main();
	} catch (error) {
		console.error(error);
	}
})();
