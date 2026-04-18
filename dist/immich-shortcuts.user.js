// ==UserScript==
// @name         immich shortcuts
// @description  keyboard shortcuts for immich
// @match        http://kisaki:2283/*
// @grant        GM_addStyle
// @namespace    https://www.sapphire.sh/
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/immich-shortcuts.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/immich-shortcuts.user.js
// @version      1776509795941
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
/*!*****************************************!*\
  !*** ./src/scripts/immich-shortcuts.ts ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
const updateRating = async (rating) => {
    const urls = ['/photos/', '/search/photos/', '/tags/photos/', '/albums/'];
    for (const url of urls) {
        if (!window.location.pathname.startsWith(url)) {
            continue;
        }
        const assetId = window.location.pathname.replace(url, '');
        await fetch(`/api/assets/${assetId}`, {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify({ rating }),
            signal: AbortSignal.timeout(5000),
        });
        const containerEl = document.querySelector('[data-testid="star-container"]');
        if (!containerEl) {
            return;
        }
        const starSvgEls = containerEl.querySelectorAll('label svg');
        for (const [index, starSvgEl] of Array.from(starSvgEls).entries()) {
            const starPathEl = starSvgEl.querySelector('path');
            if (!starPathEl) {
                continue;
            }
            if (index < rating) {
                starSvgEl.setAttribute('stroke', 'currentcolor');
                starPathEl.setAttribute('fill', 'currentcolor');
            }
            else {
                starSvgEl.setAttribute('stroke', '#c1cce8');
                starPathEl.setAttribute('fill', 'transparent');
            }
        }
        return;
    }
};
const handleKeyUp = (event) => {
    console.log('event', event);
    switch (event.code) {
        case 'Digit1':
        case 'Digit2':
        case 'Digit3':
        case 'Digit4':
        case 'Digit5': {
            const rating = Number.parseInt(event.code.replace('Digit', ''), 10);
            void updateRating(rating);
            break;
        }
    }
};
const main = () => {
    document.addEventListener('keyup', handleKeyUp, false);
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