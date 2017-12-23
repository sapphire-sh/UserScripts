// ==UserScript==
// @name         Toranoana Age Verification Skipper
// @namespace    https://www.sapphire.sh/
// @version      1.0
// @description  Skips age verification page of toranoana
// @author       sapphire
// @match        http://www.toranoana.jp/*
// @updateURL    https://raw.githubusercontent.com/sapphiredev/UserScripts/master/src/toranoana-age-verification-skipper.js
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	if(document.title === '【とらのあなWebSite】年齢認証') {
		window.GoNext(0);
	}
})();
