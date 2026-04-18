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

const stripSuffix = (text: string): string => text.replace(/[@＠/|].+$/, '').trim();

const getDisplayNameSelectionText = (selection: Selection): string | null => {
	if (selection.rangeCount === 0) {
		return null;
	}

	const range = selection.getRangeAt(0);
	const containers = Array.from(document.querySelectorAll<HTMLElement>('div[data-testid="User-Name"]'));

	for (const container of containers) {
		const displayNameSpan = container.querySelector('a[role="link"] span span');
		if (displayNameSpan === null) {
			continue;
		}

		const spanRange = document.createRange();
		spanRange.selectNodeContents(displayNameSpan);

		const noOverlap =
			range.compareBoundaryPoints(Range.END_TO_START, spanRange) >= 0 ||
			range.compareBoundaryPoints(Range.START_TO_END, spanRange) <= 0;

		if (noOverlap) {
			continue;
		}

		const intersection = document.createRange();
		if (range.compareBoundaryPoints(Range.START_TO_START, spanRange) >= 0) {
			intersection.setStart(range.startContainer, range.startOffset);
		} else {
			intersection.setStart(spanRange.startContainer, spanRange.startOffset);
		}
		if (range.compareBoundaryPoints(Range.END_TO_END, spanRange) <= 0) {
			intersection.setEnd(range.endContainer, range.endOffset);
		} else {
			intersection.setEnd(spanRange.endContainer, spanRange.endOffset);
		}

		return intersection.toString();
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

	const text = getDisplayNameSelectionText(selection);
	if (text === null) {
		return;
	}

	const sanitized = stripSuffix(stripEmoji(text));
	if (sanitized.length === 0) {
		return;
	}

	event.preventDefault();
	event.clipboardData?.setData('text/plain', sanitized);
});

export {};
