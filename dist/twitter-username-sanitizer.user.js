// ==UserScript==
// @name         twitter username sanitizer
// @description  sanitize username when copying from tweet detail pages
// @match        https://twitter.com/*
// @match        https://mobile.twitter.com/*
// @match        https://x.com/*
// @match        https://mobile.x.com/*
// @grant        none
// @namespace    https://www.sapphire.sh/
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-username-sanitizer.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-username-sanitizer.user.js
// @version      1781884776926
// ==/UserScript==
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
  !*** ./src/scripts/twitter-username-sanitizer.ts ***!
  \***************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   normalizeAlphabets: () => (/* binding */ normalizeAlphabets),
/* harmony export */   sanitizeUsername: () => (/* binding */ sanitizeUsername),
/* harmony export */   stripEmoji: () => (/* binding */ stripEmoji),
/* harmony export */   stripNonBMP: () => (/* binding */ stripNonBMP),
/* harmony export */   stripSuffix: () => (/* binding */ stripSuffix)
/* harmony export */ });
const STATUS_PATTERN = /\/[^/]+\/status\/\d+/;
const isStatusPage = () => STATUS_PATTERN.test(window.location.pathname);
const stripEmoji = (text) => text
    .replace(/\p{Extended_Pictographic}/gu, '')
    .replace(/\u200D/g, '')
    .replace(/\uFE0F/g, '')
    .replace(/\uFE0E/g, '')
    .trim()
    .replace(/\s+/g, ' ');
const stripNonBMP = (text) => text.replace(/[\u{10000}-\u{10FFFF}]/gu, '').trim();
const normalizeAlphabets = (text) => text.normalize('NFKC');
const stripSuffix = (text) => text.replace(/[@＠/|(（・].*$/, '').trim();
const sanitizeUsername = (text) => stripSuffix(stripNonBMP(normalizeAlphabets(stripEmoji(text))));
const getDisplayNameSelectionText = (selection) => {
    if (selection.rangeCount === 0) {
        return null;
    }
    const range = selection.getRangeAt(0);
    const containers = Array.from(document.querySelectorAll('div[data-testid="User-Name"]'));
    for (const container of containers) {
        const displayNameSpan = container.querySelector('a[role="link"] span span');
        if (displayNameSpan === null) {
            continue;
        }
        const spanRange = document.createRange();
        spanRange.selectNodeContents(displayNameSpan);
        const noOverlap = range.compareBoundaryPoints(Range.END_TO_START, spanRange) >= 0 ||
            range.compareBoundaryPoints(Range.START_TO_END, spanRange) <= 0;
        if (noOverlap) {
            continue;
        }
        const intersection = document.createRange();
        if (range.compareBoundaryPoints(Range.START_TO_START, spanRange) >= 0) {
            intersection.setStart(range.startContainer, range.startOffset);
        }
        else {
            intersection.setStart(spanRange.startContainer, spanRange.startOffset);
        }
        if (range.compareBoundaryPoints(Range.END_TO_END, spanRange) <= 0) {
            intersection.setEnd(range.endContainer, range.endOffset);
        }
        else {
            intersection.setEnd(spanRange.endContainer, spanRange.endOffset);
        }
        return intersection.toString();
    }
    return null;
};
const handleCopy = (event) => {
    if (!isStatusPage()) {
        return;
    }
    const selection = window.getSelection();
    if (selection === null) {
        return;
    }
    const text = getDisplayNameSelectionText(selection);
    if (text === null) {
        return;
    }
    const sanitized = sanitizeUsername(text);
    if (sanitized.length === 0) {
        return;
    }
    event.preventDefault();
    event.clipboardData?.setData('text/plain', sanitized);
};
if (typeof document !== 'undefined') {
    document.addEventListener('copy', handleCopy);
}

/******/ })()
;