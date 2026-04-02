// ==UserScript==
// @name         twitter hide blocked users
// @namespace    https://www.sapphire.sh/
// @description  twitter hide blocked users
// @match        https://twitter.com/*
// @match        https://mobile.twitter.com/*
// @match        https://x.com/*
// @match        https://mobile.x.com/*
// @grant        none
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-hide-blocked-users.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-hide-blocked-users.user.js
// @version      1775137187354
// ==/UserScript==
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!***************************************************!*\
  !*** ./src/scripts/twitter-hide-blocked-users.ts ***!
  \***************************************************/
__webpack_require__.r(__webpack_exports__);
const blockedScreenNames = new Set();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extractBlockedScreenNames = (object) => {
    if (object === null || object === undefined || typeof object !== 'object') {
        return;
    }
    if (object.relationship_perspectives?.blocking === true) {
        const screenName = object.core.screen_name;
        if (typeof screenName === 'string' && screenName !== '') {
            blockedScreenNames.add(screenName.toLowerCase());
            console.log(`blocked user: @${screenName}`);
        }
    }
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            extractBlockedScreenNames(object[key]);
        }
    }
};
const hideTweet = () => {
    const tweetEls = Array.from(document.querySelectorAll('[data-testid="cellInnerDiv"]'));
    for (const tweetEl of tweetEls) {
        let shouldHideTweet = false;
        const linkEls = Array.from(tweetEl.querySelectorAll('a[role="link"]'));
        for (const linkEl of linkEls) {
            const screenName = linkEl.getAttribute('href')?.replace(/^\//, '').toLowerCase();
            if (screenName !== undefined && screenName !== '' && blockedScreenNames.has(screenName)) {
                shouldHideTweet = true;
                break;
            }
        }
        if (shouldHideTweet) {
            tweetEl.style.opacity = '0.3';
            tweetEl.style.filter = 'grayscale(100%)';
            tweetEl.style.pointerEvents = 'none';
            tweetEl.style.transition = 'opacity 0.3s ease';
        }
    }
};
const main = () => {
    const XHR = window.XMLHttpRequest;
    // @ts-expect-error XMLHttpRequest constructor override
    window.XMLHttpRequest = () => {
        const xhr = new XHR();
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (xhr.responseURL.includes('SearchTimeline')) {
                    try {
                        const data = JSON.parse(xhr.responseText);
                        extractBlockedScreenNames(data);
                    }
                    catch (error) {
                        console.error(error);
                    }
                }
            }
        }, false);
        return xhr;
    };
    const observer = new MutationObserver(hideTweet);
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });
};
void (async () => {
    try {
        main();
    }
    catch (error) {
        console.error(error);
    }
})();


/******/ })()
;