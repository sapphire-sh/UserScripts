import { sleep } from '@sapphire-sh/utils';

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
	document.addEventListener('load', replace);

	const observer = new MutationObserver(replace);

	let target: Element | null = null;
	do {
		await sleep(1000);

		target = document.querySelector('.stream-items');
	} while (target === null);

	const options: MutationObserverInit = {
		childList: true,
	};
	observer.observe(target, options);
};

(async () => {
	try {
		await main();
	} catch (error) {
		console.error(error);
	}
})();
