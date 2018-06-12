// ==UserScript==
// @name         Twitter original image replacer
// @namespace    https://www.sapphire.sh/
// @version      0.4
// @description  Twitter original image replacer
// @author       sapphire
// @match        https://twitter.com/*
// @downloadURL  https://raw.githubusercontent.com/sapphiredev/UserScripts/master/src/twitter-original-image-replacer.js
// @grant        none
// ==/UserScript==

function replace() {
	Array.from(document.querySelectorAll('img[src^="https://pbs.twimg.com/media/"]')).forEach((e) => {
		if(e.src.endsWith(':orig') === false) {
			e.src += ':orig';
		}
	});
}

(function() {
	'use strict';

	document.onload = replace();

	const observer = new MutationObserver(replace);

    observer.observe(document.querySelector('.stream-items'), {
        'childList': true,
    });
})();
