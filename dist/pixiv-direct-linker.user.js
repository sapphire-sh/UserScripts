// ==UserScript==
// @name         pixiv direct linker
// @namespace    https://www.sapphire.sh/
// @description  convert pixiv links to direct links
// @match        https://www.pixiv.net/*
// @grant        none
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/pixiv-direct-linker.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/pixiv-direct-linker.user.js
// @version      1762955839444
// ==/UserScript==
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/pixiv-direct-linker.ts":
/*!********************************************!*\
  !*** ./src/scripts/pixiv-direct-linker.ts ***!
  \********************************************/
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
const main = () => {
    const observer = new MutationObserver(() => {
        const anchors = Array.from(document.querySelectorAll('a'));
        for (const anchor of anchors) {
            const { href } = anchor;
            const match = href.match(/jump.php\?(url=)?(.+)$/i);
            if (match !== null && match[2]) {
                anchor.href = decodeURIComponent(match[2]);
            }
        }
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
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
/******/ 	__webpack_modules__["./src/scripts/pixiv-direct-linker.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;