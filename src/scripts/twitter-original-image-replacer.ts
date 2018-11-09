import {
	sleep,
} from '../helpers';

const selector = `img[src^="https://pbs.twimg.com/media/"]`;

function replace() {
	const images = document.querySelectorAll(selector) as NodeListOf<HTMLImageElement>;
	Array.from(images).forEach((e) => {
		if(e.src.endsWith(':orig') === false) {
			e.src += ':orig';
		}
	});
}

(async () => {
	document.addEventListener('load', replace);

	const observer = new MutationObserver(replace);

	let target: Element | null = null;
	do {
		await sleep(1000);

		target = document.querySelector('.stream-items');
	}
	while(target === null);

	const options: MutationObserverInit = {
		'childList': true,
	};
	observer.observe(target, options);
})();
