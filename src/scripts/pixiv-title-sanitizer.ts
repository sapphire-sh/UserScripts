import { waitForElement } from '@sapphire-sh/utils';

const getTitle = async () => {
	const el = await waitForElement('figcaption h1');
	if (el === null) {
		console.error('waitForElement: figcaption h1 not found');
		return null;
	}
	return el.innerText;
};

const getAuthor = async () => {
	const el = await waitForElement('a[href^="/users/"] + div > a');
	if (el === null) {
		console.error('waitForElement: author link not found');
		return null;
	}
	return el.innerText;
};

const main = async () => {
	const title = await getTitle();
	const author = await getAuthor();
	if (title === null || author === null) {
		return;
	}

	document.title = `${author} - ${title}`;
};

try {
	await main();
} catch (error) {
	console.error(error);
}
