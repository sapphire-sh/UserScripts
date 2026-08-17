import { promises as fs, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import webpack from 'webpack';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rootDir = path.resolve(__dirname);
const srcDir = path.resolve(rootDir, './src');
const scriptsDir = path.resolve(srcDir, './scripts');
const manifestsDir = path.resolve(srcDir, './manifests');

const getEntries = async () => {
	const filenames = await fs.readdir(scriptsDir);

	const entries = [];
	for (const filename of filenames) {
		if (!filename.endsWith('.ts') || filename.endsWith('.test.ts')) {
			continue;
		}
		const scriptName = filename.split('.ts')[0];
		entries.push([scriptName, path.resolve(scriptsDir, filename)]);
	}

	return Object.fromEntries(entries);
};

const getUserScriptHeader = (name, headers) => {
	headers = {
		...headers,
		namespace: 'https://www.sapphire.sh/',
		author: 'sapphire',
		downloadURL: `https://github.com/sapphire-sh/UserScripts/raw/release/dist/${name}.user.js`,
		updateURL: `https://github.com/sapphire-sh/UserScripts/raw/release/dist/${name}.user.js`,
		version: `${Date.now()}`,
	};

	const getHeaderRows = () => {
		const keys = Object.keys(headers);

		const rows = [];
		for (const key of keys) {
			let values = headers[key];
			if (typeof values === 'string') {
				values = [values];
			}
			rows.push(values.map((value) => `// @${key.padEnd(12, ' ')} ${value}`).join('\n'));
		}

		return rows;
	};

	const headerRows = getHeaderRows();

	return [`// ==UserScript==`, ...headerRows, `// ==/UserScript==`].join('\n');
};

const main = async () => {
	const entries = await getEntries();

	return {
		entry: entries,
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].user.js',
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: ['ts-loader'],
				},
			],
		},
		devtool: false,
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.json'],
		},
		plugins: [
			new webpack.BannerPlugin({
				banner: (info) => {
					const name = info.chunk.name;
					const file = path.resolve(manifestsDir, `${name}.json`);
					const manifest = JSON.parse(readFileSync(file, 'utf-8'));
					return getUserScriptHeader(name, manifest);
				},
				raw: true,
				entryOnly: true,
				// the default stage runs before minification, which strips the header
				// comment out of the bundle; prepend it once minification is done
				stage: webpack.Compilation.PROCESS_ASSETS_STAGE_REPORT,
			}),
			new webpack.ProgressPlugin(),
		],
		mode: 'production',
	};
};

export default main;
