const updateRating = async (rating: number) => {
	const urls = ['/photos/', '/search/photos/'];

	for (const url of urls) {
		if (!window.location.pathname.startsWith(url)) {
			continue;
		}

		const assetId = window.location.pathname.replace(url, '');

		await fetch(`/api/assets/${assetId}`, {
			method: 'PUT',
			headers: {
				accept: 'application/json',
				'content-type': 'application/json',
			},
			body: JSON.stringify({ rating }),
		});

		const containerEl = document.querySelector(
			'[data-testid="star-container"]'
		);
		if (!containerEl) {
			return;
		}

		const starSvgEls = containerEl.querySelectorAll('label svg');
		for (let index = 0; index < starSvgEls.length; ++index) {
			if (index >= rating) {
				continue;
			}

			const starSvgEl = starSvgEls[index];
			if (!starSvgEl) {
				continue;
			}

			starSvgEl.setAttribute('stroke', 'currentcolor');

			const starPathEl = starSvgEl.querySelector('path');
			if (!starPathEl) {
				continue;
			}

			starPathEl.setAttribute('fill', 'currentcolor');
		}

		return;
	}
};

const handleKeyUp = (event: KeyboardEvent) => {
	console.log('event', event);

	switch (event.code) {
		case 'Digit1':
		case 'Digit2':
		case 'Digit3':
		case 'Digit4':
		case 'Digit5': {
			const rating = parseInt(event.code.replace('Digit', ''), 10);
			updateRating(rating);
			break;
		}
	}
};

const main = () => {
	document.addEventListener('keyup', handleKeyUp, false);
};

(async () => {
	try {
		main();
	} catch (error) {
		console.error(error);
	}
})();

export {};
