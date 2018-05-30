// ==UserScript==
// @name         URL Sanitizer
// @namespace    https://www.sapphire.sh/
// @version      1.4
// @description  URL sanitizer
// @author       sapphire
// @match        http://www.toranoana.jp/*
// @match        https://www.toranoana.jp/*
// @match        https://www.melonbooks.co.jp/*
// @match        https://www.pixiv.net/*
// @match        https://twitter.com/*
// @downloadURL  https://raw.githubusercontent.com/sapphiredev/UserScripts/master/src/url-sanitizer.js
// @grant        none
// ==/UserScript==

function getSanitizedURL(key, match) {
    if(match === null) {
        return null;
    }

	if(key === 'twitter') {
		console.log(match);
		const screenName = match[1];
		const tweetID = match[2];
		return `https://twitter.com/${screenName}/status/${tweetID}`;
	}
	else {
		const baseURL = match[1];
		const originalQuery = match[2].split('&').map((e) => {
			const x = e.split('=');
			return {
				[x[0]]: x[1],
			};
		})
		.reduce((a, b) => {
			return Object.assign(a, b);
		});

		let query = '';
		switch(key) {
			case 'pixiv':
				query = `?${Object.keys(originalQuery).map((e) => {
					return `${e}=${originalQuery[e]}`;
				}).join('&')}`;
				break;
			case 'melonbooks':
				query = `?product_id=${originalQuery.product_id}`;
				break;
		}

		return `${baseURL}${query}`
	}
}

(function() {
	'use strict';

	const url = window.location.href;

	const regexs = {
		'pixiv': /^(https:\/\/www.pixiv.net\/member_illust.php)\?(.+)#?/,
		'toranoana': /^(https?:\/\/www.toranoana.jp\/mailorder\/article\/.+)\?(.+)#?/,
		'melonbooks': /^(https:\/\/www.melonbooks.co.jp\/detail\/detail.php)\?(.+)#?/,
        'twitter': /^https:\/\/twitter.com\/(.+)\/status\/(.+)\/(.+)\/1$/,
	};

	Object.keys(regexs).some((key) => {
		const match = window.location.href.match(regexs[key]);

		const url = getSanitizedURL(key, match);

		if(url !== null) {
			window.history.pushState(window.location.href, '', url);
			return true;
		}
		return false;
	});
})();
