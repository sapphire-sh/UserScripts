import { sleep } from '../helpers';

const getElement = async (selector: string) => {
	let e: HTMLElement | null = null;
	while (e === null) {
		e = document.querySelector(selector);
		await sleep(100);
	}
	return e;
};

const getTitle = async () => {
	const e = await getElement('figcaption h1');
	return e.innerText;
};

const getAuthor = async () => {
	const e = await getElement('a[href^="/users/"] + div > a');
	return e.innerText;
};

const main = async () => {
	const title = await getTitle();
	const author = await getAuthor();

	document.title = `${author} - ${title}`;
};

(async () => {
	try {
		await main();
	} catch (error) {
		console.error(error);
	}
})();
