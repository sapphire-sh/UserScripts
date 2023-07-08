// ==UserScript==
// @name         url sanitizer
// @description  url sanitizer
// @match        http://www.toranoana.jp/*
// @match        https://www.toranoana.jp/*
// @match        https://www.melonbooks.co.jp/*
// @match        https://www.pixiv.net/*
// @match        https://twitter.com/*
// @match        https://mobile.twitter.com/*
// @match        https://*.fanbox.cc/*
// @grant        none
// @namespace    https://www.sapphire.sh/
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/url-sanitizer.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/url-sanitizer.user.js
// @version      1688854992738
// ==/UserScript==
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/url-sanitizer.ts":
/*!**************************************!*\
  !*** ./src/scripts/url-sanitizer.ts ***!
  \**************************************/
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
const stringifyQuery = (query) => {
    return Object.keys(query)
        .map((e) => `${e}=${query[e]}`)
        .join('&');
};
const processQuery = (key, text) => {
    switch (key) {
        case WebsiteKeys.PIXIV: {
            if (!text) {
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
            if (!text) {
                throw new Error('text not found');
            }
            const query = parseQuery(text);
            return `?product_id=${query.product_id}`;
        }
    }
};
const getSanitizedURL = (key, match) => {
    if (key === WebsiteKeys.TWITTER) {
        const screenName = match[1];
        const tweetID = match[2];
        return `https://twitter.com/${screenName}/status/${tweetID}`;
    }
    const baseURL = match[1];
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
        if (url === null) {
            continue;
        }
        window.history.pushState(window.location.href, '', url);
    }
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
/******/ 	__webpack_modules__["./src/scripts/url-sanitizer.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;