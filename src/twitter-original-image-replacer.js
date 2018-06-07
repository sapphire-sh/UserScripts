// ==UserScript==
// @name         Twitter original image replacer
// @namespace    https://www.sapphire.sh/
// @version      0.1
// @description  Twitter original image replacer
// @author       sapphire
// @match        https://twitter.com/*
// @downloadURL  https://raw.githubusercontent.com/sapphiredev/UserScripts/master/src/twitter-original-image-replacer.js
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	Array.from(document.querySelectorAll('img[src^="https://pbs.twimg.com/media/"')).forEach((e) => {
		e.src += ':orig';
	});
})();
