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
// @version      1776319006189
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
  !*** ./src/scripts/twitter-username-sanitizer.ts ***!
  \***************************************************/
__webpack_require__.r(__webpack_exports__);
const STATUS_PATTERN = /\/[^/]+\/status\/\d+/;
const isStatusPage = () => STATUS_PATTERN.test(window.location.pathname);
const stripEmoji = (text) => text
    .replace(/\p{Extended_Pictographic}/gu, '')
    .replace(/\u200D/g, '')
    .replace(/\uFE0F/g, '')
    .replace(/\uFE0E/g, '')
    .trim()
    .replace(/\s+/g, ' ');
const stripEventSuffix = (text) => text.replace(/[@＠].+$/, '').trim();
const getDisplayNameFromSelection = (selection) => {
    if (selection.rangeCount === 0) {
        return null;
    }
    const range = selection.getRangeAt(0);
    const containers = Array.from(document.querySelectorAll('div[data-testid="User-Name"]'));
    for (const container of containers) {
        const containerRange = document.createRange();
        containerRange.selectNodeContents(container);
        const noOverlap = range.compareBoundaryPoints(Range.END_TO_START, containerRange) >= 0 ||
            range.compareBoundaryPoints(Range.START_TO_END, containerRange) <= 0;
        if (noOverlap) {
            continue;
        }
        const displayNameSpan = container.querySelector('a[role="link"] span span');
        if (displayNameSpan === null) {
            continue;
        }
        return displayNameSpan.textContent;
    }
    return null;
};
document.addEventListener('copy', (event) => {
    if (!isStatusPage()) {
        return;
    }
    const selection = window.getSelection();
    if (selection === null) {
        return;
    }
    const displayName = getDisplayNameFromSelection(selection);
    if (displayName === null) {
        return;
    }
    const sanitized = stripEventSuffix(stripEmoji(displayName));
    if (sanitized.length === 0) {
        return;
    }
    event.preventDefault();
    event.clipboardData?.setData('text/plain', sanitized);
});


/******/ })()
;