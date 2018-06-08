// ==UserScript==
// @name         Twitter original image replacer
// @namespace    https://www.sapphire.sh/
// @version      0.3
// @description  Twitter original image replacer
// @author       sapphire
// @match        https://twitter.com/*
// @downloadURL  https://raw.githubusercontent.com/sapphiredev/UserScripts/master/src/twitter-original-image-replacer.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const observer = new MutationObserver(() => {
        Array.from(document.querySelectorAll('img[src^="https://pbs.twimg.com/media/"]')).forEach((e) => {
            if(e.src.endsWith(':orig') === false) {
                e.src += ':orig';
            }
        });
    });

    const config = {
        'childList': true,
    };

    const list = document.querySelector('.stream-items');

    observer.observe(list, config);
})();
