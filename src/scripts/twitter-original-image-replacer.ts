import { waitForElement } from '@sapphire-sh/utils/browser';

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
	const target = await waitForElement('.stream-items');
	if (target === null) {
		console.error('waitForElement: .stream-items not found');
		return;
	}

	const observer = new MutationObserver(replace);
	observer.observe(target, {
		childList: true,
	});
};

try {
	await main();
} catch (error) {
	console.error(error);
}
