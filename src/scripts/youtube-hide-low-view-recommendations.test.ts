import { describe, expect, it } from 'vitest';
import { parseViewCount } from './youtube-hide-low-view-recommendations';

describe('parseViewCount', () => {
	it('parses a plain view count', () => {
		expect(parseViewCount('19 views')).toBe(19);
	});

	it('parses a view count with thousands separators', () => {
		expect(parseViewCount('312,312 views')).toBe(312312);
	});

	it('parses a decimal thousand view count', () => {
		expect(parseViewCount('1.9 thousand views')).toBe(1900);
	});

	it('parses a decimal million view count', () => {
		expect(parseViewCount('2.8 million views')).toBe(2800000);
	});

	it('returns null for a live viewer count', () => {
		expect(parseViewCount('151 watching')).toBeNull();
	});

	it('returns null for a premiere waiting count', () => {
		expect(parseViewCount('17 waiting')).toBeNull();
	});

	it('returns null for an upload age label', () => {
		expect(parseViewCount('1 day ago')).toBeNull();
	});
});
