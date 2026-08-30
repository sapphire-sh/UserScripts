export const LOCATION_CHANGE_EVENT = 'locationchange';

export const patchHistory = (): void => {
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
