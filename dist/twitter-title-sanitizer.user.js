// ==UserScript==
// @name         twitter title sanitizer
// @description  remove the unread notification count prefix from the page title
// @match        https://twitter.com/*
// @match        https://mobile.twitter.com/*
// @match        https://x.com/*
// @match        https://mobile.x.com/*
// @grant        none
// @namespace    https://www.sapphire.sh/
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-title-sanitizer.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-title-sanitizer.user.js
// @version      1786196736170
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
/*!************************************************!*\
  !*** ./src/scripts/twitter-title-sanitizer.ts ***!
  \************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   stripNotificationCount: () => (/* binding */ stripNotificationCount)
/* harmony export */ });
const NOTIFICATION_COUNT_PATTERN = /^\(\d+\+?\)\s*/;
const stripNotificationCount = (title) => title.replace(NOTIFICATION_COUNT_PATTERN, '');
const sanitizeDocumentTitle = () => {
    const sanitized = stripNotificationCount(document.title);
    if (sanitized === document.title) {
        return;
    }
    document.title = sanitized;
};
if (typeof document !== 'undefined') {
    const observer = new MutationObserver(() => {
        sanitizeDocumentTitle();
    });
    observer.observe(document.head, {
        childList: true,
        subtree: true,
        characterData: true,
    });
    sanitizeDocumentTitle();
}

/******/ })()
;