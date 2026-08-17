const MEDIA_PATH_PATTERN = /^\/\w{1,15}\/media\/?$/;
const FILTER_PARAM = 'filter';
const PHOTO_FILTER = 'photo';
const LOCATION_CHANGE_EVENT = 'locationchange';

// null for anything that is not an unfiltered media tab URL, so the caller leaves it alone
const withPhotoFilter = (href: string): string | null => {
	const url = new URL(href, window.location.origin);
	if (!MEDIA_PATH_PATTERN.test(url.pathname)) {
		return null;
	}
	if (url.searchParams.has(FILTER_PARAM)) {
		return null;
	}

	url.searchParams.set(FILTER_PARAM, PHOTO_FILTER);
	return `${url.pathname}${url.search}`;
};

// covers a typed address and a reload, where no tab link was ever clicked
const redirect = () => {
	const target = withPhotoFilter(window.location.href);
	if (target === null) {
		return;
	}

	window.location.replace(target);
};

// keeps the tab link itself pointing at the photo list, so an in-app click needs no reload
const rewriteLinks = () => {
	const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href*="/media"]'));
	for (const anchor of anchors) {
		const href = anchor.getAttribute('href');
		if (href === null) {
			continue;
		}

		const target = withPhotoFilter(href);
		if (target === null) {
			continue;
		}

		anchor.setAttribute('href', target);
	}
};

const main = () => {
	redirect();
	rewriteLinks();
};

const patchHistory = () => {
	const dispatch = () => window.dispatchEvent(new Event(LOCATION_CHANGE_EVENT));

	const originalPushState = history.pushState.bind(history);
	const originalReplaceState = history.replaceState.bind(history);

	history.pushState = (...args) => {
		originalPushState(...args);
		dispatch();
	};
	history.replaceState = (...args) => {
		originalReplaceState(...args);
		dispatch();
	};
	window.addEventListener('popstate', dispatch);
};

try {
	patchHistory();

	const observer = new MutationObserver(() => {
		rewriteLinks();
	});
	observer.observe(document.documentElement, {
		childList: true,
		subtree: true,
	});

	window.addEventListener(LOCATION_CHANGE_EVENT, () => {
		main();
	});

	main();
} catch (error) {
	console.error(error);
}

export {};
