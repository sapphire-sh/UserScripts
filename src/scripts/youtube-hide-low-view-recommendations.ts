const MIN_VIEW_COUNT = 100;

const VIEW_COUNT_PATTERN = /^([\d.,]+)(?: (thousand|million))? views$/;

const UNIT_MULTIPLIERS = new Map([
	['thousand', 1_000],
	['million', 1_000_000],
]);

const LOCKUP_SELECTOR = 'yt-lockup-view-model';
const METADATA_TEXT_SELECTOR = '.ytContentMetadataViewModelMetadataText[aria-label]';
const GRID_ITEM_SELECTOR = 'ytd-rich-item-renderer';

export const parseViewCount = (label: string): number | null => {
	const match = VIEW_COUNT_PATTERN.exec(label);
	if (match === null) {
		return null;
	}

	const [, amount, unit] = match;
	return Math.round(Number(amount.replace(/,/g, '')) * (UNIT_MULTIPLIERS.get(unit) ?? 1));
};

const getViewCount = (lockupEl: Element): number | null => {
	for (const textEl of Array.from(lockupEl.querySelectorAll(METADATA_TEXT_SELECTOR))) {
		const viewCount = parseViewCount(textEl.getAttribute('aria-label') ?? '');
		if (viewCount !== null) {
			return viewCount;
		}
	}

	return null;
};

const hideLockupIfLowView = (lockupEl: HTMLElement) => {
	const viewCount = getViewCount(lockupEl);
	if (viewCount === null || viewCount >= MIN_VIEW_COUNT) {
		return;
	}

	const targetEl = lockupEl.closest<HTMLElement>(GRID_ITEM_SELECTOR) ?? lockupEl;
	targetEl.style.setProperty('display', 'none', 'important');
};

let rafPending = false;
let pendingNodes: Node[] = [];

const processPendingNodes = () => {
	const batch = pendingNodes;
	pendingNodes = [];
	rafPending = false;

	if (location.pathname !== '/watch') {
		return;
	}

	const lockupEls = new Set<HTMLElement>();
	for (const node of batch) {
		if (!(node instanceof HTMLElement)) {
			continue;
		}

		const ancestorLockupEl = node.closest<HTMLElement>(LOCKUP_SELECTOR);
		if (ancestorLockupEl !== null) {
			lockupEls.add(ancestorLockupEl);
			continue;
		}

		for (const lockupEl of Array.from(node.querySelectorAll<HTMLElement>(LOCKUP_SELECTOR))) {
			lockupEls.add(lockupEl);
		}
	}

	for (const lockupEl of lockupEls) {
		hideLockupIfLowView(lockupEl);
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
	enqueueNodes([document.documentElement]);

	const observer = new MutationObserver((mutations) => {
		enqueueNodes(mutations.flatMap((mutation) => Array.from(mutation.addedNodes)));
	});
	observer.observe(document.documentElement, {
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
