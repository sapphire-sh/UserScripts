// ==UserScript==
// @name         twitter media content warning remover
// @namespace    https://www.sapphire.sh/
// @description  remove content warning from tweets
// @match        https://twitter.com/*
// @match        https://mobile.twitter.com/*
// @match        https://x.com/*
// @match        https://mobile.x.com/*
// @grant        none
// @run-at       document-end
// @license      MIT
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-media-warning-remover.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-media-warning-remover.user.js
// @version      1776015680651
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
/*!******************************************************!*\
  !*** ./src/scripts/twitter-media-warning-remover.ts ***!
  \******************************************************/
__webpack_require__.r(__webpack_exports__);
const main = () => {
    const observer = new MutationObserver(() => {
        const elements = Array.from(document.querySelectorAll('article div[role="button"].r-173mn98'));
        for (const element of elements) {
            element.click();
        }
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
};
try {
    main();
}
catch (error) {
    console.error(error);
}


/******/ })()
;