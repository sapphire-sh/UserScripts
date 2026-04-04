const replaceLink = (anchor: HTMLAnchorElement) => {
	const match = anchor.href.match(/jump.php\?(url=)?(.+)$/i);
	if (match?.[2] !== undefined && match[2] !== '') {
		anchor.href = decodeURIComponent(match[2]);
	}
};

const main = () => {
	const observer = new MutationObserver((mutations) => {
		for (const mutation of Array.from(mutations)) {
			for (const node of Array.from(mutation.addedNodes)) {
				if (!(node instanceof HTMLElement)) {
					continue;
				}
				if (node instanceof HTMLAnchorElement) {
					replaceLink(node);
				} else {
					for (const anchor of Array.from(node.querySelectorAll('a'))) {
						replaceLink(anchor);
					}
				}
			}
		}
	});

	observer.observe(document.body, {
		childList: true,
		subtree: true,
	});
};

void (async () => {
	try {
		main();
	} catch (error) {
		console.error(error);
	}
})();

export {};
