import { waitForElement } from '../helpers';

const getTitle = async () => {
	const els = await waitForElement('figcaption h1');
	if (els === null) {
		console.error('waitForElement: figcaption h1 not found');
		return null;
	}
	const e = els.item(0);
	return e instanceof HTMLElement ? e.innerText : null;
};

const getAuthor = async () => {
	const els = await waitForElement('a[href^="/users/"] + div > a');
	if (els === null) {
		console.error('waitForElement: author link not found');
		return null;
	}
	const e = els.item(0);
	return e instanceof HTMLElement ? e.innerText : null;
};

const main = async () => {
	const title = await getTitle();
	const author = await getAuthor();
	if (title === null || author === null) {
		return;
	}

	document.title = `${author} - ${title}`;
};

void (async () => {
	try {
		await main();
	} catch (error) {
		console.error(error);
	}
})();
