// excludes altKey: the browser's native alt-click action is a download rather than opening a new
// tab, so this only needs to catch the modifiers whose native action this script is restoring
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
