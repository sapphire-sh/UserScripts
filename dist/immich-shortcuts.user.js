// ==UserScript==
// @name         immich shortcuts
// @description  keyboard shortcuts for immich
// @match        http://kisaki:2283/*
// @grant        GM_addStyle
// @namespace    https://www.sapphire.sh/
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/immich-shortcuts.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/immich-shortcuts.user.js
// @version      1762955372286
// ==/UserScript==
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/immich-shortcuts.ts":
/*!*****************************************!*\
  !*** ./src/scripts/immich-shortcuts.ts ***!
  \*****************************************/
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
const updateRating = (rating) => {
    const urls = ['/photos/', '/search/photos/'];
    for (const url of urls) {
        if (!window.location.pathname.startsWith(url)) {
            continue;
        }
        const assetId = window.location.pathname.replace(url, '');
        fetch(`/api/assets/${assetId}`, {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify({ rating }),
        });
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
            const rating = parseInt(event.code.replace('Digit', ''), 10);
            updateRating(rating);
            break;
        }
    }
};
const main = () => {
    document.addEventListener('keyup', handleKeyUp, false);
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
/******/ 	__webpack_modules__["./src/scripts/immich-shortcuts.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;