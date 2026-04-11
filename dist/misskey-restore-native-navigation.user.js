// ==UserScript==
// @name         misskey restore native navigation
// @description  restore browser default navigation behaviours (modifier click, history swipe) on misskey
// @match        https://misskey.io/*
// @grant        GM_addStyle
// @namespace    https://www.sapphire.sh/
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/misskey-restore-native-navigation.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/misskey-restore-native-navigation.user.js
// @version      1775880265184
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
/*!**********************************************************!*\
  !*** ./src/scripts/misskey-restore-native-navigation.ts ***!
  \**********************************************************/
__webpack_require__.r(__webpack_exports__);
const hasModifier = (event) => event.shiftKey || event.metaKey || event.ctrlKey;
const findAnchor = (target) => {
    if (!(target instanceof Element)) {
        return null;
    }
    return target.closest('a[href]');
};
const handleClick = (event) => {
    if (event.button !== 0) {
        return;
    }
    if (!hasModifier(event)) {
        return;
    }
    const anchor = findAnchor(event.target);
    if (!anchor) {
        return;
    }
    const { href } = anchor;
    if (!href) {
        return;
    }
    event.stopImmediatePropagation();
    event.preventDefault();
    window.open(href, '_blank');
};
const main = () => {
    window.addEventListener('click', handleClick, true);
};
void (() => {
    try {
        main();
    }
    catch (error) {
        console.error(error);
    }
})();
GM_addStyle(`
html, body, #misskey_app, ._pageContainer, ._pageScrollable, ._pageScrollableReversed {
	overscroll-behavior-x: auto !important;
}
`);


/******/ })()
;