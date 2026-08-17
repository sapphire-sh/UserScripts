import { waitForElement } from '@sapphire-sh/utils/browser';

const getTitle = (text: string): string => `${text} - ${document.title}`;

const getTableEl = async () => {
	const el = await waitForElement('.item-detail.__light table');
	if (el === null) {
		console.error('waitForElement: table not found');
	}
	return el;
};

const getFieldByLabel = (tableEl: Element, label: string): string | null => {
	const tableRowEls = Array.from(tableEl.querySelectorAll('tr'));

	for (const tableRowEl of tableRowEls) {
		if (tableRowEl.querySelector('th')?.textContent !== label) {
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

	const circleName = getFieldByLabel(tableEl, 'サークル名');
	const artistName = getFieldByLabel(tableEl, '作家名');

	const text = [artistName, circleName].filter((x) => x !== null && x !== '').join(' - ');

	document.title = getTitle(text);
};

try {
	await main();
} catch (error) {
	console.error(error);
}
