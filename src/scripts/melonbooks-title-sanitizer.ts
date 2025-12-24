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

const main = async () => {
	const tableEl = await getTableEl();

	const circleNameEl = tableEl.querySelector('tr:nth-child(1) a');
	const artistNameEl = tableEl.querySelector('tr:nth-child(2) a');

	const circleName = circleNameEl?.textContent;
	const artistName = artistNameEl?.textContent;

	const text = `${artistName} - ${circleName}`;

	document.title = getTitle(text);
};

(async () => {
	try {
		await main();
	} catch (error) {
		console.error(error);
	}
})();
