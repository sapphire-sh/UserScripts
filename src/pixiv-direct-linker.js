// ==UserScript==
// @name         pixiv direct linker
// @namespace    https://www.sapphire.sh/
// @version      1.2
// @description  convert pixiv links to direct links
// @author       sapphire
// @match        https://www.pixiv.net/*
// @downloadURL  https://raw.githubusercontent.com/sapphiredev/UserScripts/master/src/pixiv-direct-linker.js
// @grant        none
// ==/UserScript==

(() => {
	'use strict';

	const observer = new MutationObserver(() => {
		Array.from(document.querySelectorAll('a')).forEach((e) => {
			const url = e.href;

			const match = url.match(/jump.php\?(url=)?(.+)$/i);
			if(match !== null) {
				e.href = decodeURIComponent(match[2]);
			}
		});
	});

	observer.observe(document.body, {
		'childList': true,
		'subtree': true,
	});
})();
