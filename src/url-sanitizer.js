// ==UserScript==
// @name         URL Sanitizer
// @namespace    https://www.sapphire.sh/
// @version      1.0
// @description  URL sanitizer
// @author       sapphire
// @match        http://www.toranoana.jp/*
// @match        https://www.melonbooks.co.jp/*
// @match        https://www.pixiv.net/*
// @updateURL    https://raw.githubusercontent.com/sapphiredev/UserScripts/master/src/url-sanitizer.js
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	const url = window.location.href;

	const regexs = {
		'pixiv': /^(https:\/\/www.pixiv.net\/member_illust.php)\?(.+)#/,
		'toranoana': /^(http:\/\/www.toranoana.jp\/mailorder\/article\/.+)\?(.+)#/,
		'melonbooks': /^(https:\/\/www.melonbooks.co.jp\/detail\/detail.php)\?(.+)#/,
	};

	Object.keys(regexs).forEach((key) => {
		const match = window.location.href.match(regexs[key]);

		if(match !== null) {
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
				query = `?mode=${originalQuery.mode}&illust_id=${originalQuery.illust_id}`;
				break;
			case 'melonbooks':
				query = `?product_id=${originalQuery.product_id}`;
				break;
			}

			window.history.pushState(window.location.href, '', `${baseURL}${query}`);
		}
	});
})();
