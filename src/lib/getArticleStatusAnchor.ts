// the anchor wrapping a tweet's timestamp is the one link in an article that always points at its own
// status URL, so it is the shared target for any per-article status-URL extraction
export const getArticleStatusAnchor = (article: HTMLElement): HTMLAnchorElement | null => {
	const timeEl = article.querySelector('a[href*="/status/"] time');
	if (timeEl === null) {
		return null;
	}

	return timeEl.closest('a');
};
