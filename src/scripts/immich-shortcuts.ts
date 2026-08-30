const RATING_URLS = ['/photos/', '/search/photos/', '/tags/photos/', '/albums/'];

const updateRating = (rating: number) => {
	const url = RATING_URLS.find((url) => window.location.pathname.startsWith(url));
	if (url === undefined) {
		return;
	}

	const containerEl = document.querySelector('[data-testid="star-container"]');
	if (!containerEl) {
		return;
	}

	const starLabelEls = containerEl.querySelectorAll<HTMLLabelElement>('[data-testid="star"]');
	if (rating > starLabelEls.length) {
		return;
	}
	starLabelEls[rating - 1].click();
};

const clickButtonByAriaLabel = (ariaLabel: string) => {
	const button = document.querySelector<HTMLButtonElement>(`button[aria-label="${ariaLabel}"]`);
	button?.click();
};

const handleKeyUp = (event: KeyboardEvent) => {
	console.log('event', event);

	switch (event.code) {
		case 'Digit1':
		case 'Digit2':
		case 'Digit3':
		case 'Digit4':
		case 'Digit5': {
			const rating = Number.parseInt(event.code.replace('Digit', ''), 10);
			updateRating(rating);
			return;
		}
	}

	switch (event.key) {
		case 'ㅁ': {
			clickButtonByAriaLabel('View previous asset');
			return;
		}
		case 'ㅇ': {
			clickButtonByAriaLabel('View next asset');
			return;
		}
		case 'ㄹ': {
			clickButtonByAriaLabel('Favorite');
			return;
		}
	}
};

const main = () => {
	document.addEventListener('keyup', handleKeyUp, false);
};

void (async () => {
	try {
		main();
	} catch (error) {
		console.error(error);
	}
})();

export {};
