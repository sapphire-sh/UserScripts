const main = () => {
	const observer = new MutationObserver(() => {
		const anchors = Array.from(document.querySelectorAll('a'));
		for (const anchor of anchors) {
			const { href } = anchor;
			const match = href.match(/jump.php\?(url=)?(.+)$/i);
			if (match !== null && match[2]) {
				anchor.href = decodeURIComponent(match[2]);
			}
		}
	});

	observer.observe(document.body, {
		childList: true,
		subtree: true,
	});
};

(async () => {
	try {
		main();
	} catch (error) {
		console.error(error);
	}
})();

export {};
