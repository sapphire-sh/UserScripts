import { interceptXHR } from '@sapphire-sh/utils/browser';
import { getArticleStatusAnchor } from '../lib/getArticleStatusAnchor';
import {
	BUTTON_WRAPPER_ATTR,
	INJECTED_ATTR,
	TWEET_ID_PATTERN,
	createButtonWrapper,
	createLinkButton,
} from '../lib/tweetButtons';

const VIDEO_INJECTED_ATTR = 'data-video-injected';

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
	const anchor = getArticleStatusAnchor(article);
	if (anchor === null) {
		return null;
	}
	const match = TWEET_ID_PATTERN.exec(anchor.href);
	return match ? match[1] : null;
};

const createVideoButton = (entry: VideoEntry) => {
	const button = document.createElement('button');
	button.textContent = entry.label;
	button.onclick = () => window.open(entry.url, '_blank');
	return button;
};

const injectButtonsForArticle = (article: HTMLElement) => {
	if (article.hasAttribute(VIDEO_INJECTED_ATTR)) {
		return;
	}

	const tweetId = getTweetIdFromArticle(article);
	if (tweetId === null) {
		return;
	}

	const videoEntries = videoUrlMap.get(tweetId);
	if (videoEntries === undefined || videoEntries.length === 0) {
		return;
	}

	const existing = article.querySelector(`[${BUTTON_WRAPPER_ATTR}]`);
	if (existing) {
		for (const entry of videoEntries) {
			existing.appendChild(createVideoButton(entry));
		}
	} else {
		const wrapper = createButtonWrapper();
		wrapper.setAttribute(BUTTON_WRAPPER_ATTR, '');
		wrapper.appendChild(createLinkButton());
		for (const entry of videoEntries) {
			wrapper.appendChild(createVideoButton(entry));
		}
		article.appendChild(wrapper);
		article.setAttribute(INJECTED_ATTR, '');
	}

	article.setAttribute(VIDEO_INJECTED_ATTR, '');
};

const injectButtonsWithin = (root: ParentNode) => {
	const articles = Array.from(root.querySelectorAll<HTMLElement>('article'));
	for (const article of articles) {
		injectButtonsForArticle(article);
	}
};

const getObservationTarget = (): Element =>
	document.querySelector('[data-testid="primaryColumn"]') ?? document.documentElement;

let rafPending = false;
let pendingMutations: MutationRecord[] = [];

const processMutations = () => {
	const batch = pendingMutations;
	pendingMutations = [];
	rafPending = false;

	for (const mutation of batch) {
		for (const node of Array.from(mutation.addedNodes)) {
			if (!(node instanceof HTMLElement)) {
				continue;
			}
			if (node.matches('article')) {
				injectButtonsForArticle(node);
			}
			injectButtonsWithin(node);
		}
	}
};

const handleMutations = (mutations: MutationRecord[]) => {
	pendingMutations.push(...mutations);
	if (!rafPending) {
		rafPending = true;
		requestAnimationFrame(processMutations);
	}
};

interceptXHR(/\/graphql\//, (xhr) => {
	try {
		const data: unknown = JSON.parse(xhr.responseText);
		extractVideoUrls(data);
		injectButtonsWithin(getObservationTarget());
	} catch {
		// ignore parse errors
	}
});

const observer = new MutationObserver(handleMutations);
observer.observe(getObservationTarget(), {
	childList: true,
	subtree: true,
});

export {};
