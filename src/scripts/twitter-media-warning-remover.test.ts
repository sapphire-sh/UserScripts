import { describe, expect, it } from 'vitest';
import { isContentWarningButton } from './twitter-media-warning-remover';

describe('isContentWarningButton', () => {
	it('matches the show button beside a content warning', () => {
		expect(isContentWarningButton('Show', 'Content warning: The following may contain sensitive materialShow')).toBe(
			true,
		);
	});

	it('rejects another button beside a content warning', () => {
		expect(
			isContentWarningButton(
				'Show translation',
				'Content warning: The following may contain sensitive materialShow translation',
			),
		).toBe(false);
	});

	it('rejects a show button outside a content warning', () => {
		expect(isContentWarningButton('Show', 'Show')).toBe(false);
	});
});
