import { beforeEach, describe, expect, it, vi } from 'vitest';
import { blockedScreenNames, extractBlockedScreenNames } from './twitter-hide-blocked-users';

vi.hoisted(() => {
	vi.stubGlobal('window', {});
	vi.stubGlobal('XMLHttpRequest', { prototype: {} });
});

const createUser = (screenName: string, blocking: boolean) => ({
	relationship_perspectives: { blocking },
	core: { screen_name: screenName },
});

describe('extractBlockedScreenNames', () => {
	beforeEach(() => {
		blockedScreenNames.clear();
	});

	it('collects a blocked user nested in a timeline in lowercase', () => {
		extractBlockedScreenNames({
			timeline: { entries: [createUser('Blocked', true), createUser('Followed', false)] },
		});

		expect([...blockedScreenNames]).toEqual(['blocked']);
	});

	it('skips a blocked user without a screen name', () => {
		extractBlockedScreenNames([createUser('', true), createUser('Other', true)]);

		expect([...blockedScreenNames]).toEqual(['other']);
	});
});
