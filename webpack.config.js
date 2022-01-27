const fs = require('fs');
const path = require('path');

const webpack = require('webpack');

const src = path.resolve(__dirname, './src');
const scripts = path.resolve(src, './scripts');
const manifests = path.resolve(src, './manifests');

const entries = fs.readdirSync(scripts).filter((e) => {
	return e.endsWith('.ts');
}).map((e) => {
	const filename = e.match(/^(.+)\.ts/)[1];
	return {
		[filename]: path.resolve(scripts, e),
	};
}).reduce((a, b) => {
	return {
		...a,
		...b,
	};
});

function getUserScriptHeader(name, headers) {
	headers = {
		'namespace': 'https://www.sapphire.sh/',
		'author': 'sapphire',
		'downloadURL': `https://raw.githubusercontent.com/sapphire-ko/UserScripts/release/dist/${name}.js`,
		'version': `${Date.now()}`,
		...headers,
	};

	return [
		`// ==UserScript==`,
		...Object.keys(headers).map((key) => {
			let values = headers[key];
			if(typeof values === 'string') {
				values = [
					values,
				];
			}
			return values.map((value) => {
				return `// @${key.padEnd(12, ' ')} ${value}`;
			}).join('\n');
		}),
		`// ==/UserScript==`,
	].join('\n');
}

module.exports = {
	'entry': entries,
	'output': {
		'path': path.resolve(__dirname, 'dist'),
		'filename': '[name].js',
	},
	'module': {
		'rules': [
			{
				'test': /\.tsx?$/,
				'use': [
					'ts-loader',
				],
			},
		],
	},
	'devtool': false,
	'resolve': {
		'extensions': [
			'.ts',
			'.tsx',
			'.js',
			'.json',
		],
	},
	'plugins': [
		new webpack.BannerPlugin({
			'banner': (info) => {
				const name = info.chunk.name;
				const file = path.resolve(manifests, `${name}.json`);
				const manifest = require(file);
				return getUserScriptHeader(name, manifest);
			},
			'raw': true,
			'entryOnly': true,
		}),
		new webpack.DefinePlugin({
			'__dev': process.env.NODE_ENV === 'development',
			'__test': process.env.NODE_ENV === 'test',
			'__version': Date.now(),
		}),
		new webpack.ProgressPlugin(),
	],
	'mode': 'development',
}
