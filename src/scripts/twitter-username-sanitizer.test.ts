import { describe, expect, it } from 'vitest';
import {
	normalizeAlphabets,
	sanitizeUsername,
	stripEmoji,
	stripNonBMP,
	stripSuffix,
} from './twitter-username-sanitizer';

// Zero-width characters are invisible as string literals, so construct them from code points.
const ZWJ = String.fromCodePoint(0x200d);
const VS16 = String.fromCodePoint(0xfe0f);
const VS15 = String.fromCodePoint(0xfe0e);

describe('stripEmoji', () => {
	it('removes pictographic emoji', () => {
		expect(stripEmoji('Name😀')).toBe('Name');
	});

	it('removes zero-width joiner and variation selectors', () => {
		expect(stripEmoji(`A${ZWJ}B${VS16}C${VS15}`)).toBe('ABC');
	});

	it('trims and collapses internal whitespace', () => {
		expect(stripEmoji('  hello   world  ')).toBe('hello world');
	});

	it('leaves plain text unchanged', () => {
		expect(stripEmoji('username')).toBe('username');
	});
});

describe('normalizeAlphabets', () => {
	it('folds fullwidth Latin letters to ASCII', () => {
		expect(normalizeAlphabets('Ｎａｍｅ')).toBe('Name');
	});

	it('folds Mathematical Bold letters to ASCII', () => {
		expect(normalizeAlphabets('𝐍𝐚𝐦𝐞')).toBe('Name');
	});

	it('composes half-width katakana with dakuten into the precomposed form', () => {
		// half-width 'ｶ' + half-width dakuten 'ﾞ' -> precomposed 'ガ'
		expect(normalizeAlphabets('ｶﾞ')).toBe('ガ');
	});

	it('preserves a precomposed dakuten character', () => {
		expect(normalizeAlphabets('が')).toBe('が');
	});
});

describe('stripNonBMP', () => {
	it('removes non-BMP decorative characters', () => {
		// musical G clef (U+1D11E): non-BMP, not pictographic, NFKC-stable
		expect(stripNonBMP('Name𝄞')).toBe('Name');
	});

	it('removes Mathematical Bold letters when not normalized first', () => {
		expect(stripNonBMP('𝐍𝐚𝐦𝐞')).toBe('');
	});

	it('leaves BMP text unchanged', () => {
		expect(stripNonBMP('username')).toBe('username');
	});
});

describe('stripSuffix', () => {
	it.each(['@', '＠', '/', '|', '(', '（', '・'])('cuts the suffix at %s', (separator) => {
		expect(stripSuffix(`Name${separator}handle`)).toBe('Name');
	});

	it('leaves text without a separator unchanged', () => {
		expect(stripSuffix('Name')).toBe('Name');
	});
});

describe('sanitizeUsername', () => {
	it('normalizes styled letters before stripping non-BMP so the name survives', () => {
		// Mathematical Bold letters are non-BMP; stripNonBMP running first would
		// delete every letter and yield an empty string.
		expect(sanitizeUsername('𝐍𝐚𝐦𝐞')).toBe('Name');
	});

	it('strips emoji, normalizes, drops non-BMP decoration, and cuts the suffix', () => {
		// fullwidth 'Ｎａｍｅ' + emoji + non-BMP G clef + handle suffix
		expect(sanitizeUsername('Ｎａｍｅ😀𝄞@handle')).toBe('Name');
	});

	it('preserves dakuten while folding styled letters', () => {
		// Mathematical Bold '𝐍𝐚' + precomposed 'が'
		expect(sanitizeUsername('𝐍𝐚が')).toBe('Naが');
	});
});
