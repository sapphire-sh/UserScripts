import { beforeEach, describe, expect, it, vi } from 'vitest';
import { extractVideoUrls, videoUrlMap } from './twitter-video-downloader';

vi.hoisted(() => {
	vi.stubGlobal('window', {});
	vi.stubGlobal('XMLHttpRequest', { prototype: {} });
});

const createTweet = (restId: string, media: unknown[]) => ({
	rest_id: restId,
	legacy: { extended_entities: { media } },
});

const VIDEO_MEDIA = {
	type: 'video',
	video_info: {
		variants: [
			{ content_type: 'video/mp4', url: 'https://video.twimg.com/vid/480x270/a.mp4' },
			{ content_type: 'application/x-mpegURL', url: 'https://video.twimg.com/vid/a.m3u8' },
			{ content_type: 'video/mp4', url: 'https://video.twimg.com/vid/1280x720/b.mp4' },
		],
	},
};

describe('extractVideoUrls', () => {
	beforeEach(() => {
		videoUrlMap.clear();
	});

	it('collects mp4 variants sorted by resolution', () => {
		extractVideoUrls(createTweet('1', [VIDEO_MEDIA]));

		expect(videoUrlMap.get('1')).toEqual([
			{ url: 'https://video.twimg.com/vid/1280x720/b.mp4', label: '1280x720', pixels: 921600 },
			{ url: 'https://video.twimg.com/vid/480x270/a.mp4', label: '480x270', pixels: 129600 },
		]);
	});

	it('labels an animated gif by its original size', () => {
		extractVideoUrls(
			createTweet('1', [
				{
					type: 'animated_gif',
					original_info: { width: 320, height: 240 },
					video_info: {
						variants: [{ content_type: 'video/mp4', url: 'https://video.twimg.com/tweet_video/c.mp4' }],
					},
				},
			]),
		);

		expect(videoUrlMap.get('1')).toEqual([
			{ url: 'https://video.twimg.com/tweet_video/c.mp4', label: '320x240', pixels: 76800 },
		]);
	});

	it('finds tweets nested inside a response and skips a photo', () => {
		extractVideoUrls({
			data: { entries: [createTweet('1', [VIDEO_MEDIA]), createTweet('2', [{ type: 'photo' }])] },
		});

		expect([...videoUrlMap.keys()]).toEqual(['1']);
	});
});
