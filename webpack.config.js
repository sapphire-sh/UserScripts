const fs = require('fs');
const path = require('path');

const webpack = require('webpack');

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

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
		'downloadURL': `https://raw.githubusercontent.com/sapphiredev/UserScripts/master/dist/${name}.js`,
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
		'auxiliaryComment': '12312312',
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
				const name = info.chunk.id;
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
	'mode': env,
}
