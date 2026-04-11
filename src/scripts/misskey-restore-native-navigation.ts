const hasModifier = (event: MouseEvent): boolean => event.shiftKey || event.metaKey || event.ctrlKey;

const findAnchor = (target: EventTarget | null): HTMLAnchorElement | null => {
	if (!(target instanceof Element)) {
		return null;
	}
	return target.closest('a[href]');
};

const handleClick = (event: MouseEvent) => {
	if (event.button !== 0) {
		return;
	}
	if (!hasModifier(event)) {
		return;
	}

	const anchor = findAnchor(event.target);
	if (!anchor) {
		return;
	}

	const { href } = anchor;
	if (!href) {
		return;
	}

	event.stopImmediatePropagation();
	event.preventDefault();

	window.open(href, '_blank');
};

const main = () => {
	window.addEventListener('click', handleClick, true);
};

void (() => {
	try {
		main();
	} catch (error) {
		console.error(error);
	}
})();

export {};

GM_addStyle(`
html, body, #misskey_app, ._pageContainer, ._pageScrollable, ._pageScrollableReversed {
	overscroll-behavior-x: auto !important;
}
`);
