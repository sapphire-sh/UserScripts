import { waitForElement } from '@sapphire-sh/utils/browser';

const getTitle = (text: string): string => `${text} - ${document.title}`;

const getTableEl = async () => {
	const el = await waitForElement('.item-detail.__light table');
	if (el === null) {
		console.error('waitForElement: table not found');
	}
	return el;
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
	if (tableEl === null) {
		return;
	}

	const circleName = getCircleName(tableEl);
	const artistName = getArtistName(tableEl);

	const text = [artistName, circleName].filter((x) => x !== null && x !== '').join(' - ');

	document.title = getTitle(text);
};

try {
	await main();
} catch (error) {
	console.error(error);
}
