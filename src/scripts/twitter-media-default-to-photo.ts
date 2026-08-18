import { waitForElement } from '@sapphire-sh/utils/browser';

const MEDIA_PATH_PATTERN = /^\/\w{1,15}\/media\/?$/;
const FILTER_PARAM = 'filter';
const PHOTO_FILTER = 'photo';
const PHOTO_LABEL = 'Photos';
const LOCATION_CHANGE_EVENT = 'locationchange';
const MEDIA_TAB_SELECTOR = 'a[role="tab"][href$="/media"]';
const MENU_TAB_SELECTOR = 'a[role="tab"][aria-haspopup="menu"]';
const MENU_SELECTOR = '[role="menu"]';
const MENU_ITEM_SELECTOR = '[role="menuitem"], a';
const WAIT_TIMEOUT = 2048;

// set by a media tab click and consumed by the navigation it causes, so arriving at the media tab any
// other way — a typed address, a reload, a link from elsewhere — keeps the list x.com itself opens
let opening = false;

const hasModifier = (event: MouseEvent): boolean => event.shiftKey || event.metaKey || event.ctrlKey || event.altKey;

const handleClick = (event: MouseEvent) => {
	if (event.button !== 0) {
		return;
	}
	if (hasModifier(event)) {
		return;
	}

	const { target } = event;
	if (!(target instanceof Element)) {
		return;
	}
	if (target.closest(MEDIA_TAB_SELECTOR) === null) {
		return;
	}

	opening = true;
};

const isUnfilteredMediaPath = (): boolean => {
	const url = new URL(window.location.href);
	if (!MEDIA_PATH_PATTERN.test(url.pathname)) {
		return false;
	}

	return !url.searchParams.has(FILTER_PARAM);
};

// the menu is rendered only once opened, so the photo entry is matched by the URL it carries and by
// its own text rather than by a class the page generates
const findPhotoItem = (menu: HTMLElement): HTMLElement | null => {
	const items = Array.from(menu.querySelectorAll<HTMLElement>(MENU_ITEM_SELECTOR));
	for (const item of items) {
		if (item.getAttribute('href')?.includes(`${FILTER_PARAM}=${PHOTO_FILTER}`) === true) {
			return item;
		}
		if (item.textContent.trim() === PHOTO_LABEL) {
			return item;
		}
	}

	return null;
};

// every step goes through the page's own controls, so the photo list arrives by the same in-app
// navigation a click would have produced and nothing reloads
const openPhotoFilter = async () => {
	const tab = await waitForElement<HTMLAnchorElement>(MENU_TAB_SELECTOR, { timeout: WAIT_TIMEOUT });
	if (tab === null) {
		return;
	}
	tab.click();

	const menu = await waitForElement<HTMLElement>(MENU_SELECTOR, { timeout: WAIT_TIMEOUT });
	if (menu === null) {
		return;
	}

	const item = findPhotoItem(menu);
	if (item === null) {
		return;
	}

	item.click();
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

	window.addEventListener('click', handleClick, true);

	window.addEventListener(LOCATION_CHANGE_EVENT, () => {
		if (!opening) {
			return;
		}
		opening = false;

		if (!isUnfilteredMediaPath()) {
			return;
		}

		void openPhotoFilter();
	});
} catch (error) {
	console.error(error);
}

export {};
