(() => {
	document.cookie.split(';').map((e) => {
		return e.trim().match(/^lfg=(.+)/);
	}).filter((e) => {
		return e !== null;
	}).forEach((e) => {
		document.cookie = `lfg=${e![1]};domain=.toranoana.jp;max-age=${300 * 24 * 60 * 60};path=/`;
	});
})();
