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
// @version      1771224219324
// ==/UserScript==
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/twitter-hide-blocked-users.ts":
/*!***************************************************!*\
  !*** ./src/scripts/twitter-hide-blocked-users.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const blockedScreenNames = new Set();
const extractBlockedScreenNames = (object) => {
    var _a;
    if (!object || typeof object !== 'object') {
        return;
    }
    if (((_a = object.relationship_perspectives) === null || _a === void 0 ? void 0 : _a.blocking) === true) {
        const screenName = object.core.screen_name;
        if (screenName) {
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
    var _a;
    const tweetEls = Array.from(document.querySelectorAll('[data-testid="cellInnerDiv"]'));
    for (const tweetEl of tweetEls) {
        let shouldHideTweet = false;
        const linkEls = Array.from(tweetEl.querySelectorAll('a[role="link"]'));
        for (const linkEl of linkEls) {
            const screenName = (_a = linkEl
                .getAttribute('href')) === null || _a === void 0 ? void 0 : _a.replace(/^\//, '').toLowerCase();
            if (screenName && blockedScreenNames.has(screenName)) {
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
    // @ts-ignore
    window.XMLHttpRequest = function () {
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
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        main();
    }
    catch (error) {
        console.error(error);
    }
}))();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/scripts/twitter-hide-blocked-users.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;