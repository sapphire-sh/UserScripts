const updateRating = async (rating: number) => {
	const urls = ['/photos/', '/search/photos/', '/tags/photos/', '/albums/'];

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
			signal: AbortSignal.timeout(5000),
		});

		const containerEl = document.querySelector('[data-testid="star-container"]');
		if (!containerEl) {
			return;
		}

		const starSvgEls = containerEl.querySelectorAll('label svg');
		for (const [index, starSvgEl] of Array.from(starSvgEls).entries()) {
			const starPathEl = starSvgEl.querySelector('path');
			if (!starPathEl) {
				continue;
			}

			if (index < rating) {
				starSvgEl.setAttribute('stroke', 'currentcolor');
				starPathEl.setAttribute('fill', 'currentcolor');
			} else {
				starSvgEl.setAttribute('stroke', '#c1cce8');
				starPathEl.setAttribute('fill', 'transparent');
			}
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
			const rating = Number.parseInt(event.code.replace('Digit', ''), 10);
			void updateRating(rating);
			break;
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
