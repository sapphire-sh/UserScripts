import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getEntries, getMatches, getUserScriptHeader } from './webpack.config.js';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

describe('getMatches', () => {
	it('concatenates the hosts of each site in the given order', () => {
		expect(getMatches(['youtube', 'comike'])).toEqual([
			'https://www.youtube.com/*',
			'https://webcatalog.circle.ms/*',
			'https://classic-webcatalog.circle.ms/*',
		]);
	});

	it('throws for a site without hosts', () => {
		expect(() => getMatches(['bluesky', 'unknown'])).toThrow('unknown site: unknown');
	});
});

describe('getEntries', () => {
	it('maps every manifest name to its script path and skips test files', async () => {
		const manifestFilenames = await readdir(path.resolve(rootDir, 'src/manifests'));
		const expected = Object.fromEntries(
			manifestFilenames.map((filename) => {
				const name = path.basename(filename, '.json');
				return [name, path.resolve(rootDir, 'src/scripts', `${name}.ts`)];
			}),
		);

		expect(await getEntries()).toEqual(expected);
	});
});

describe('getUserScriptHeader', () => {
	const manifest = {
		name: 'example',
		description: 'example description',
		sites: ['bluesky', 'youtube'],
		grant: 'GM_addStyle',
	};

	const getExpectedHeader = (version) => {
		return [
			'// ==UserScript==',
			'// @name         example',
			'// @description  example description',
			'// @grant        GM_addStyle',
			'// @match        https://bsky.app/*',
			'// @match        https://www.youtube.com/*',
			'// @namespace    https://www.sapphire.sh/',
			'// @author       sapphire',
			'// @downloadURL  https://github.com/sapphire-sh/UserScripts/releases/download/userscript-latest/example.user.js',
			'// @updateURL    https://github.com/sapphire-sh/UserScripts/releases/download/userscript-latest/example.user.js',
			`// @version      ${version}`,
			'// ==/UserScript==',
		].join('\n');
	};

	beforeEach(() => {
		vi.useFakeTimers({ toFake: ['Date'] });
		vi.setSystemTime(1790000000123);
	});

	afterEach(() => {
		vi.useRealTimers();
		vi.unstubAllEnvs();
	});

	it('uses USERSCRIPT_VERSION as the version when it is set', () => {
		vi.stubEnv('USERSCRIPT_VERSION', '1790000000000');

		expect(getUserScriptHeader('example', manifest)).toBe(getExpectedHeader('1790000000000'));
	});

	it('uses the current time as the version when USERSCRIPT_VERSION is unset', () => {
		vi.stubEnv('USERSCRIPT_VERSION', undefined);

		expect(getUserScriptHeader('example', manifest)).toBe(getExpectedHeader('1790000000123'));
	});

	it('uses the current time as the version when USERSCRIPT_VERSION is empty', () => {
		vi.stubEnv('USERSCRIPT_VERSION', '');

		expect(getUserScriptHeader('example', manifest)).toBe(getExpectedHeader('1790000000123'));
	});
});
