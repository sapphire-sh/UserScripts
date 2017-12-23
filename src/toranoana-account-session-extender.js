// ==UserScript==
// @name         Toranoana Account Session Extender
// @namespace    https://www.sapphire.sh/
// @version      1.0
// @description  Extends toranoana account session cookie expiration date
// @author       sapphire
// @match        http://www.toranoana.jp/*
// @downloadURL    https://raw.githubusercontent.com/sapphiredev/UserScripts/master/src/toranoana-account-session-extender.js
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	document.cookie.split(';')
	.map((e) => {
		return e.trim().match(/^lfg=(.+)/);
	})
	.filter((e) => {
		return e !== null;
	})
	.forEach((e) => {
		document.cookie = `lfg=${e[1]};domain=.toranoana.jp;max-age=${300 * 24 * 60 * 60};path=/`;
	});
})();
