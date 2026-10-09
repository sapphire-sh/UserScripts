import { describe, expect, it, vi } from 'vitest';
import { formatNoteTitlePrefix, getInstanceName, getNoteId, stripNotificationCount } from './title-rewriter';

vi.hoisted(() => {
	vi.stubGlobal('window', {});
	vi.stubGlobal('XMLHttpRequest', { prototype: {} });
});

describe('stripNotificationCount', () => {
	it('removes a single digit count prefix', () => {
		expect(stripNotificationCount('(1) Display Name on X: "post body" / X')).toBe('Display Name on X: "post body" / X');
	});

	it('removes a multi digit count prefix', () => {
		expect(stripNotificationCount('(42) Home / X')).toBe('Home / X');
	});

	it('removes a count prefix ending with a plus sign', () => {
		expect(stripNotificationCount('(20+) Home / X')).toBe('Home / X');
	});

	it('leaves a title without a count prefix unchanged', () => {
		expect(stripNotificationCount('Display Name on X: "post body" / X')).toBe('Display Name on X: "post body" / X');
	});

	it('keeps a parenthesized number that is not at the start', () => {
		expect(stripNotificationCount('Display Name on X: "(1) post body" / X')).toBe(
			'Display Name on X: "(1) post body" / X',
		);
	});

	it('keeps a leading parenthesis that does not wrap a number', () => {
		expect(stripNotificationCount('(draft) Display Name / X')).toBe('(draft) Display Name / X');
	});
});

describe('formatNoteTitlePrefix', () => {
	it('uses the display name', () => {
		expect(formatNoteTitlePrefix({ user: { name: 'Display Name', username: 'user' }, text: 'note body' })).toBe(
			'Display Name: "note body"',
		);
	});

	it('falls back to the username when the display name is null', () => {
		expect(formatNoteTitlePrefix({ user: { name: null, username: 'user' }, text: 'note body' })).toBe(
			'user: "note body"',
		);
	});

	it('uses an empty body when the text is null', () => {
		expect(formatNoteTitlePrefix({ user: { name: 'Display Name', username: 'user' }, text: null })).toBe(
			'Display Name: ""',
		);
	});

	it('replaces each line break with a single space', () => {
		expect(
			formatNoteTitlePrefix({
				user: { name: 'Display Name', username: 'user' },
				text: 'first line\nsecond line\r\nthird line\rfourth line',
			}),
		).toBe('Display Name: "first line second line third line fourth line"');
	});

	it('keeps a body of exactly 64 code points', () => {
		expect(formatNoteTitlePrefix({ user: { name: 'Display Name', username: 'user' }, text: '😀'.repeat(64) })).toBe(
			`Display Name: "${'😀'.repeat(64)}"`,
		);
	});

	it('truncates a body of 65 code points to 64 followed by an ellipsis', () => {
		expect(formatNoteTitlePrefix({ user: { name: 'Display Name', username: 'user' }, text: '😀'.repeat(65) })).toBe(
			`Display Name: "${'😀'.repeat(64)}…"`,
		);
	});
});

describe('getInstanceName', () => {
	it('returns the part after the separator', () => {
		expect(getInstanceName('ノート | Misskey.io')).toBe('Misskey.io');
	});

	it('returns the part after the last separator', () => {
		expect(getInstanceName('Display Name: "a | b" | Misskey.io')).toBe('Misskey.io');
	});

	it('returns null for a title without a separator', () => {
		expect(getInstanceName('Misskey.io')).toBeNull();
	});
});

describe('getNoteId', () => {
	it('returns the id of a note path', () => {
		expect(getNoteId('/notes/abc123')).toBe('abc123');
	});

	it('returns the id of a note path with a tab segment', () => {
		expect(getNoteId('/notes/abc123/reactions')).toBe('abc123');
	});

	it('returns null for a path that is not a note', () => {
		expect(getNoteId('/@user')).toBeNull();
	});
});
