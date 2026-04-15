const STATUS_PATTERN = /\/[^/]+\/status\/\d+/;

const isStatusPage = (): boolean => STATUS_PATTERN.test(window.location.pathname);

const stripEmoji = (text: string): string =>
	text
		.replace(/\p{Extended_Pictographic}/gu, '')
		.replace(/\u200D/g, '')
		.replace(/\uFE0F/g, '')
		.replace(/\uFE0E/g, '')
		.trim()
		.replace(/\s+/g, ' ');

const getDisplayNameFromSelection = (selection: Selection): string | null => {
	if (selection.rangeCount === 0) {
		return null;
	}

	const range = selection.getRangeAt(0);
	const containers = Array.from(document.querySelectorAll<HTMLElement>('div[data-testid="User-Name"]'));

	for (const container of containers) {
		const containerRange = document.createRange();
		containerRange.selectNodeContents(container);

		const noOverlap =
			range.compareBoundaryPoints(Range.END_TO_START, containerRange) >= 0 ||
			range.compareBoundaryPoints(Range.START_TO_END, containerRange) <= 0;

		if (noOverlap) {
			continue;
		}

		const displayNameSpan = container.querySelector('a[role="link"] span span');
		if (displayNameSpan === null) {
			continue;
		}

		return displayNameSpan.textContent;
	}

	return null;
};

document.addEventListener('copy', (event) => {
	if (!isStatusPage()) {
		return;
	}

	const selection = window.getSelection();
	if (selection === null) {
		return;
	}

	const displayName = getDisplayNameFromSelection(selection);
	if (displayName === null) {
		return;
	}

	const sanitized = stripEmoji(displayName);
	if (sanitized.length === 0) {
		return;
	}

	event.preventDefault();
	event.clipboardData?.setData('text/plain', sanitized);
});

export {};
