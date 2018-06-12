// ==UserScript==
// @name         pixiv Direct Linker
// @namespace    https://www.sapphire.sh/
// @version      1.1
// @description  Changes pixiv links to link destination directly
// @author       sapphire
// @match        https://www.pixiv.net/*
// @downloadURL  https://raw.githubusercontent.com/sapphiredev/UserScripts/master/src/pixiv-direct-linker.js
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

    const observer = new MutationObserver(() => {
        Array.from(document.querySelectorAll('a')).forEach((e) => {
            const url = e.href;

            const match = url.match(/jump.php\?(.+)$/i);
            if(match !== null) {
                e.href = decodeURIComponent(match[1]);
            }
        });
    });

    observer.observe(document.body, {
        'childList': true,
        'subtree': true,
    });
})();
