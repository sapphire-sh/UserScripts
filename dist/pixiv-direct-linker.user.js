// ==UserScript==
// @name         pixiv direct linker
// @namespace    https://www.sapphire.sh/
// @description  convert pixiv links to direct links
// @match        https://www.pixiv.net/*
// @grant        none
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/pixiv-direct-linker.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/pixiv-direct-linker.user.js
// @version      1775304204074
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
const JUMP_URL_PATTERN = /jump.php\?(url=)?(.+)$/i;
const replaceLink = (anchor) => {
    const match = anchor.href.match(JUMP_URL_PATTERN);
    if (match?.[2] !== undefined && match[2] !== '') {
        anchor.href = decodeURIComponent(match[2]);
    }
};
const main = () => {
    const observer = new MutationObserver((mutations) => {
        for (const mutation of Array.from(mutations)) {
            for (const node of Array.from(mutation.addedNodes)) {
                if (!(node instanceof HTMLElement)) {
                    continue;
                }
                if (node instanceof HTMLAnchorElement) {
                    replaceLink(node);
                }
                else {
                    for (const anchor of Array.from(node.querySelectorAll('a'))) {
                        replaceLink(anchor);
                    }
                }
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