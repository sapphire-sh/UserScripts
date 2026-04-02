// ==UserScript==
// @name         url sanitizer
// @description  url sanitizer
// @match        http://www.toranoana.jp/*
// @match        https://www.toranoana.jp/*
// @match        https://www.melonbooks.co.jp/*
// @match        https://www.pixiv.net/*
// @match        https://twitter.com/*
// @match        https://mobile.twitter.com/*
// @match        https://x.com/*
// @match        https://mobile.x.com/*
// @match        https://*.fanbox.cc/*
// @grant        none
// @namespace    https://www.sapphire.sh/
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/url-sanitizer.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/url-sanitizer.user.js
// @version      1775129477637
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
/*!**************************************!*\
  !*** ./src/scripts/url-sanitizer.ts ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
var WebsiteKeys;
(function (WebsiteKeys) {
    WebsiteKeys["TWITTER"] = "twitter";
    WebsiteKeys["PIXIV"] = "pixiv";
    WebsiteKeys["PIXIV_FANBOX"] = "pixiv_fanbox";
    WebsiteKeys["MELONBOOKS"] = "melonbooks";
    WebsiteKeys["TORANOANA"] = "toranoana";
})(WebsiteKeys || (WebsiteKeys = {}));
const parseQuery = (text) => {
    const entries = text.split('&').map((e) => e.split('='));
    return Object.fromEntries(entries);
};
const stringifyQuery = (query) => Object.keys(query)
    .map((e) => `${e}=${query[e]}`)
    .join('&');
const processQuery = (key, text) => {
    switch (key) {
        case WebsiteKeys.PIXIV: {
            if (text === undefined || text === '') {
                throw new Error('text not found');
            }
            const query = parseQuery(text);
            return `?${stringifyQuery(query)}`;
        }
        case WebsiteKeys.PIXIV_FANBOX:
        case WebsiteKeys.TORANOANA: {
            return '';
        }
        case WebsiteKeys.MELONBOOKS: {
            if (text === undefined || text === '') {
                throw new Error('text not found');
            }
            const query = parseQuery(text);
            return `?product_id=${query.product_id}`;
        }
    }
};
const getSanitizedURL = (key, match) => {
    if (key === WebsiteKeys.TWITTER) {
        const [, screenName, tweetID] = match;
        return `https://twitter.com/${screenName}/status/${tweetID}`;
    }
    const [, baseURL] = match;
    const query = processQuery(key, match[2]);
    return `${baseURL}${query}`;
};
const regularExpressions = {
    [WebsiteKeys.TWITTER]: /^https:\/\/(?:.+\.)?twitter.com\/(.+)\/status\/(\d+)/,
    [WebsiteKeys.PIXIV]: /^(https:\/\/www.pixiv.net\/member_illust.php)\?(.+)#?/,
    [WebsiteKeys.PIXIV_FANBOX]: /^(https:\/\/.+.fanbox.cc\/posts\/\d+)\?(.+)/,
    [WebsiteKeys.TORANOANA]: /^(https?:\/\/www.toranoana.jp\/mailorder\/article\/.+)\?(.+)#?/,
    [WebsiteKeys.MELONBOOKS]: /^(https:\/\/www.melonbooks.co.jp\/detail\/detail.php)\?(.+)#?/,
};
const main = () => {
    const keys = Object.values(WebsiteKeys);
    for (const key of keys) {
        const regularExpression = regularExpressions[key];
        const match = window.location.href.match(regularExpression);
        if (match === null) {
            continue;
        }
        const url = getSanitizedURL(key, match);
        window.history.pushState(window.location.href, '', url);
    }
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