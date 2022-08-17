const main = () => {
	const observer = new MutationObserver(() => {
		const elements = Array.from<HTMLElement>(document.querySelectorAll('article div[role="button"].r-173mn98'));
		for (const element of elements) {
			element.click();
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
