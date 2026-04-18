import { interceptXHR, waitForElement, waitForElements } from '@sapphire-sh/utils/browser';

const TWEET_ID_PATTERN = /status\/(\d+)\/?/;
const IMAGE_FORMAT_PATTERN = /\.(\w+):large$/;
const INJECTED_ATTR = 'data-dl-injected';
const VIDEO_INJECTED_ATTR = 'data-video-injected';
const BUTTON_WRAPPER_ATTR = 'data-dl-buttons';

interface VideoEntry {
	url: string;
	label: string;
	pixels: number;
}

const videoUrlMap = new Map<string, VideoEntry[]>();
const RESOLUTION_PATTERN = /\/(\d+)x(\d+)\//;

const resolveResolution = (
	url: string,
	fallbackWidth: number,
	fallbackHeight: number,
): { label: string; pixels: number } => {
	const match = RESOLUTION_PATTERN.exec(url);
	if (match !== null) {
		const w = Number(match[1]);
		const h = Number(match[2]);
		return { label: `${w}x${h}`, pixels: w * h };
	}
	if (fallbackWidth > 0 && fallbackHeight > 0) {
		return { label: `${fallbackWidth}x${fallbackHeight}`, pixels: fallbackWidth * fallbackHeight };
	}
	return { label: 'video', pixels: 0 };
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null && !Array.isArray(value);

const extractVideoUrls = (obj: unknown): void => {
	if (Array.isArray(obj)) {
		for (const item of obj) {
			extractVideoUrls(item);
		}
		return;
	}

	if (!isRecord(obj)) {
		return;
	}

	if (
		typeof obj.rest_id === 'string' &&
		isRecord(obj.legacy) &&
		isRecord(obj.legacy.extended_entities) &&
		Array.isArray(obj.legacy.extended_entities.media)
	) {
		for (const media of obj.legacy.extended_entities.media) {
			if (
				isRecord(media) &&
				(media.type === 'video' || media.type === 'animated_gif') &&
				isRecord(media.video_info) &&
				Array.isArray(media.video_info.variants)
			) {
				const mp4Variants = media.video_info.variants.filter(
					(v): v is Record<string, unknown> => isRecord(v) && v.content_type === 'video/mp4',
				);

				let fallbackWidth = 0;
				let fallbackHeight = 0;
				if (
					isRecord(media.original_info) &&
					typeof media.original_info.width === 'number' &&
					typeof media.original_info.height === 'number'
				) {
					fallbackWidth = media.original_info.width;
					fallbackHeight = media.original_info.height;
				}

				const entries = videoUrlMap.get(obj.rest_id) ?? [];
				for (const variant of mp4Variants) {
					if (typeof variant.url !== 'string') {
						continue;
					}
					if (entries.some((e) => e.url === variant.url)) {
						continue;
					}
					const { label, pixels } = resolveResolution(variant.url, fallbackWidth, fallbackHeight);
					entries.push({ url: variant.url, label, pixels });
				}
				entries.sort((a, b) => b.pixels - a.pixels);
				videoUrlMap.set(obj.rest_id, entries);
			}
		}
	}

	for (const value of Object.values(obj)) {
		extractVideoUrls(value);
	}
};

const getTweetIdFromArticle = (article: HTMLElement): string | null => {
	const timeEl = article.querySelector('a[href*="/status/"] time');
	if (!timeEl) {
		return null;
	}
	const anchor = timeEl.closest('a');
	if (!anchor) {
		return null;
	}
	const match = TWEET_ID_PATTERN.exec(anchor.href);
	return match ? match[1] : null;
};

const createDownloadButton = (images: HTMLImageElement[]) => {
	const button = document.createElement('button');
	button.textContent = 'download';
	button.onclick = createHandler(images);
	return button;
};

const createLinkButton = () => {
	const button = document.createElement('button');
	button.textContent = 'link';

	button.onclick = () => {
		const linkEl = document.querySelector('link[rel="canonical"]');
		if (!linkEl) {
			return;
		}
		if (!(linkEl instanceof HTMLLinkElement)) {
			return;
		}

		const match = new RegExp(TWEET_ID_PATTERN).exec(linkEl.href);
		if (!match) {
			return;
		}

		const [, tweetId] = match;
		window.open(`http://acrux:9001/tweet/${tweetId}`, '_blank');
	};

	return button;
};

const createVideoButton = (entry: VideoEntry) => {
	const button = document.createElement('button');
	button.textContent = entry.label;
	button.onclick = () => window.open(entry.url, '_blank');
	return button;
};

const _getFormat = async () => {
	const el = await waitForElement('[property="og:image"]');
	if (el === null) {
		console.error('waitForElement: og:image not found');
		return;
	}
	if (!(el instanceof HTMLMetaElement)) {
		return;
	}

	const match = new RegExp(IMAGE_FORMAT_PATTERN).exec(el.content);
	if (!match) {
		return;
	}

	return match[1];
};

const createHandler = (images: HTMLImageElement[]) => async () => {
	for (const { src } of images) {
		const url = src.replace(/name=\w+$/, 'name=orig');
		open(url);
	}
};

const getArticles = async () => {
	const articles = await waitForElements(['article', '[data-testid="error-detail"]']);
	return articles?.filter((article) => {
		const e = article.querySelector('article div[role="group"]');
		return e !== null;
	});
};

const getImages = async (article: HTMLElement) => {
	const images = await waitForElements<HTMLImageElement>('div[data-testid="tweetPhoto"] img', {
		parent: article,
	});
	return images;
};

const injectVideoButtons = () => {
	const articles = Array.from(document.querySelectorAll('article'));
	for (const article of articles) {
		if (article.hasAttribute(VIDEO_INJECTED_ATTR)) {
			continue;
		}

		const tweetId = getTweetIdFromArticle(article);
		if (tweetId === null) {
			continue;
		}

		const videoEntries = videoUrlMap.get(tweetId);
		if (videoEntries === undefined || videoEntries.length === 0) {
			continue;
		}

		const existing = article.querySelector(`[${BUTTON_WRAPPER_ATTR}]`);
		if (existing) {
			for (const entry of videoEntries) {
				existing.appendChild(createVideoButton(entry));
			}
		} else {
			const wrapper = document.createElement('div');
			wrapper.setAttribute(BUTTON_WRAPPER_ATTR, '');
			Object.assign(wrapper.style, {
				position: 'absolute',
				top: '8px',
				right: '64px',
			});
			wrapper.appendChild(createLinkButton());
			for (const entry of videoEntries) {
				wrapper.appendChild(createVideoButton(entry));
			}
			article.appendChild(wrapper);
			article.setAttribute(INJECTED_ATTR, '');
		}

		article.setAttribute(VIDEO_INJECTED_ATTR, '');
	}
};

interceptXHR(/\/graphql\//, (xhr) => {
	try {
		const data: unknown = JSON.parse(xhr.responseText);
		extractVideoUrls(data);
		injectVideoButtons();
	} catch {
		// ignore parse errors
	}
});

const main = async () => {
	const articles = await getArticles();
	if (!articles || articles.length === 0) {
		const containerEl = document.querySelector('[data-testid="error-detail"]');
		if (!containerEl) {
			return;
		}

		const linkButton = createLinkButton();

		const buttonWrapperEl = document.createElement('div');
		Object.assign(buttonWrapperEl.style, {
			position: 'absolute',
			top: '8px',
			right: '64px',
		});

		buttonWrapperEl.appendChild(linkButton);

		containerEl.appendChild(buttonWrapperEl);

		return;
	}

	for (const article of articles) {
		if (article.hasAttribute(INJECTED_ATTR)) {
			continue;
		}

		const images = await getImages(article);
		if (!images) {
			continue;
		}
		if (images.length === 0) {
			continue;
		}

		const downloadButton = createDownloadButton(images);
		const linkButton = createLinkButton();

		const buttonWrapperEl = document.createElement('div');
		buttonWrapperEl.setAttribute(BUTTON_WRAPPER_ATTR, '');
		Object.assign(buttonWrapperEl.style, {
			position: 'absolute',
			top: '8px',
			right: '64px',
		});

		buttonWrapperEl.appendChild(linkButton);
		buttonWrapperEl.appendChild(downloadButton);

		const tweetId = getTweetIdFromArticle(article);
		const videoEntries = tweetId === null ? undefined : videoUrlMap.get(tweetId);
		if (videoEntries !== undefined && videoEntries.length > 0) {
			for (const entry of videoEntries) {
				buttonWrapperEl.appendChild(createVideoButton(entry));
			}
			article.setAttribute(VIDEO_INJECTED_ATTR, '');
		}

		article.appendChild(buttonWrapperEl);
		article.setAttribute(INJECTED_ATTR, '');
	}
};

const LOCATION_CHANGE_EVENT = 'locationchange';

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

patchHistory();

try {
	await main();
} catch (error) {
	console.error(error);
}

document.addEventListener('visibilitychange', () => {
	if (document.visibilityState === 'visible') {
		void main();
	}
});

window.addEventListener(LOCATION_CHANGE_EVENT, () => {
	void main();
});
