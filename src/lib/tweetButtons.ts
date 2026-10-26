export const TWEET_ID_PATTERN = /status\/(\d+)\/?/;
export const INJECTED_ATTR = 'data-dl-injected';
export const BUTTON_WRAPPER_ATTR = 'data-dl-buttons';

export const createButtonWrapper = () => {
	const wrapper = document.createElement('div');
	Object.assign(wrapper.style, {
		position: 'absolute',
		top: '8px',
		right: '64px',
	});
	return wrapper;
};
