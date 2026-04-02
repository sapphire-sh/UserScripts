// ==UserScript==
// @name         pixiv direct linker
// @namespace    https://www.sapphire.sh/
// @description  convert pixiv links to direct links
// @match        https://www.pixiv.net/*
// @grant        none
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/pixiv-direct-linker.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/pixiv-direct-linker.user.js
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
/*!********************************************!*\
  !*** ./src/scripts/pixiv-direct-linker.ts ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
const main = () => {
    const observer = new MutationObserver(() => {
        const anchors = Array.from(document.querySelectorAll('a'));
        for (const anchor of anchors) {
            const { href } = anchor;
            const match = href.match(/jump.php\?(url=)?(.+)$/i);
            if (match?.[2] !== undefined && match[2] !== '') {
                anchor.href = decodeURIComponent(match[2]);
            }
        }
    });
    observer.observe(document.body, {
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