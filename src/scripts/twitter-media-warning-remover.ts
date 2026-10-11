const BUTTON_TEXT = 'Show';
const WARNING_TEXT = 'Content warning';

export const isContentWarningButton = (buttonText: string, containerText: string): boolean =>
	buttonText === BUTTON_TEXT && containerText.includes(WARNING_TEXT);

const revealIfContentWarning = (buttonEl: HTMLButtonElement) => {
	if (buttonEl.closest('article') === null) {
		return;
	}

	if (isContentWarningButton(buttonEl.textContent, buttonEl.parentElement?.textContent ?? '')) {
		buttonEl.click();
	}
};

let rafPending = false;
let pendingNodes: Node[] = [];

const processPendingNodes = () => {
	const batch = pendingNodes;
	pendingNodes = [];
	rafPending = false;

	const buttonEls = new Set<HTMLButtonElement>();
	for (const node of batch) {
		if (node instanceof HTMLButtonElement) {
			buttonEls.add(node);
			continue;
		}

		if (!(node instanceof HTMLElement)) {
			continue;
		}

		for (const buttonEl of Array.from(node.querySelectorAll('button'))) {
			buttonEls.add(buttonEl);
		}
	}

	for (const buttonEl of buttonEls) {
		revealIfContentWarning(buttonEl);
	}
};

const enqueueNodes = (nodes: Node[]) => {
	pendingNodes.push(...nodes);
	if (!rafPending) {
		rafPending = true;
		requestAnimationFrame(processPendingNodes);
	}
};

const main = () => {
	enqueueNodes([document.body]);

	const observer = new MutationObserver((mutations) => {
		enqueueNodes(mutations.flatMap((mutation) => Array.from(mutation.addedNodes)));
	});
	observer.observe(document.body, {
		childList: true,
		subtree: true,
	});
};

if (typeof document !== 'undefined') {
	try {
		main();
	} catch (error) {
		console.error(error);
	}
}
