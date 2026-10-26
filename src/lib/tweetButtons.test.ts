import { describe, expect, it } from 'vitest';
import * as tweetButtons from './tweetButtons';

describe('tweetButtons', () => {
	it('exports the shared button helpers without a link button', () => {
		expect(Object.keys(tweetButtons).toSorted()).toEqual([
			'BUTTON_WRAPPER_ATTR',
			'INJECTED_ATTR',
			'TWEET_ID_PATTERN',
			'createButtonWrapper',
		]);
	});
});
