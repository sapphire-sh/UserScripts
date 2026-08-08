import { describe, expect, it } from 'vitest';
import { stripNotificationCount } from './twitter-title-sanitizer';

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
