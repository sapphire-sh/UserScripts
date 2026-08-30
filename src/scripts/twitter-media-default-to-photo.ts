import { waitForElement } from '@sapphire-sh/utils/browser';
import { LOCATION_CHANGE_EVENT, patchHistory } from '../lib/history';

const MEDIA_PATH_PATTERN = /^\/\w{1,15}\/media\/?$/;
const FILTER_PARAM = 'filter';
const PHOTO_FILTER = 'photo';
const MEDIA_TAB_SELECTOR = 'a[role="tab"][href$="/media"]';
const MEDIA_VIEW_SELECTOR = 'a[role="tab"][aria-haspopup="menu"]';
const WAIT_TIMEOUT = 2048;

// set by a media tab click and consumed by the navigation it causes, so arriving at the media tab any
// other way — a typed address, a reload, a link from elsewhere — keeps the list x.com itself opens
let opening = false;

// includes altKey unlike misskey-restore-native-navigation's hasModifier: any modifier here means
// the user asked for a different native action (new tab, new window, or download), so the photo
// filter redirect below must stay out of the way regardless of which one it is
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

// only the media view renders the tab in its dropdown form, so waiting for that form is what tells the
// swap below that x.com has finished rendering the list it replaces
const openPhotoFilter = async () => {
	const view = await waitForElement(MEDIA_VIEW_SELECTOR, { timeout: WAIT_TIMEOUT });
	if (view === null) {
		return;
	}
	if (!isUnfilteredMediaPath()) {
		return;
	}

	const url = new URL(window.location.href);
	url.searchParams.set(FILTER_PARAM, PHOTO_FILTER);

	// the address alone moves nothing, so the change is announced with the event a back or forward
	// navigation would have produced and the page's own router is left to answer it
	history.pushState(null, '', `${url.pathname}${url.search}`);
	window.dispatchEvent(new PopStateEvent('popstate', { state: null }));
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
