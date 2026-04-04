import { waitForElement } from '../helpers';

const selector = `img[src^="https://pbs.twimg.com/media/"]`;

const replace = () => {
	const images = Array.from(document.querySelectorAll<HTMLImageElement>(selector));
	for (const image of images) {
		if (image.src.endsWith(':orig') === false) {
			image.src += ':orig';
		}
	}
};

const main = async () => {
	const els = await waitForElement('.stream-items');
	if (els === null) {
		console.error('waitForElement: .stream-items not found');
		return;
	}

	const observer = new MutationObserver(replace);
	observer.observe(els.item(0), {
		childList: true,
	});
};

void (async () => {
	try {
		await main();
	} catch (error) {
		console.error(error);
	}
})();
