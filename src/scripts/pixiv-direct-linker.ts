(() => {
	const observer = new MutationObserver(() => {
		Array.from(document.querySelectorAll('a')).forEach((e) => {
			const url = e.href;

			const match = url.match(/jump.php\?(url=)?(.+)$/i);
			if(match !== null) {
				e.href = decodeURIComponent(match[2]);
			}
		});
	});

	observer.observe(document.body, {
		'childList': true,
		'subtree': true,
	});
})();
