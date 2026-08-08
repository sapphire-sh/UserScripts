const NOTIFICATION_COUNT_PATTERN = /^\(\d+\+?\)\s*/;

export const stripNotificationCount = (title: string): string => title.replace(NOTIFICATION_COUNT_PATTERN, '');

const sanitizeDocumentTitle = (): void => {
	const sanitized = stripNotificationCount(document.title);
	if (sanitized === document.title) {
		return;
	}

	document.title = sanitized;
};

if (typeof document !== 'undefined') {
	const observer = new MutationObserver(() => {
		sanitizeDocumentTitle();
	});

	observer.observe(document.head, {
		childList: true,
		subtree: true,
		characterData: true,
	});

	sanitizeDocumentTitle();
}
