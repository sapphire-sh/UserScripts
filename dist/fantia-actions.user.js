// ==UserScript==
// @name         fantia actions
// @namespace    https://www.sapphire.sh/
// @description  add action buttons to fantia pages
// @match        https://fantia.jp/*
// @grant        none
// @run-at       document-end
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/fantia-actions.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/fantia-actions.user.js
// @version      1688487175487
// ==/UserScript==
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/fantia-actions.ts":
/*!***************************************!*\
  !*** ./src/scripts/fantia-actions.ts ***!
  \***************************************/
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
const generateButtons = (params) => {
    const div = document.createElement('div');
    div.setAttribute('style', 'position:fixed;left:100px;top:100px;');
    const { id, title } = params;
    const button = document.createElement('button');
    button.textContent = 'copy';
    button.onclick = () => {
        window.navigator.clipboard.writeText(`${id}_${title}`);
    };
    div.appendChild(button);
    return div;
};
const attach = (id, title) => __awaiter(void 0, void 0, void 0, function* () {
    const buttons = generateButtons({ id, title });
    document.documentElement.appendChild(buttons);
});
const main = () => {
    const XHR = window.XMLHttpRequest;
    // @ts-ignore
    window.XMLHttpRequest = function () {
        const xhr = new XHR();
        const handleReadyStateChange = () => {
            if (xhr.readyState !== 4) {
                return;
            }
            if (xhr.status !== 200) {
                return;
            }
            if (xhr.responseURL.match(/\/api\/v1\/posts\//) === null) {
                return;
            }
            const response = JSON.parse(xhr.response).post;
            const id = response.id;
            const title = response.title;
            attach(id, title);
        };
        xhr.addEventListener('readystatechange', handleReadyStateChange, false);
        return xhr;
    };
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
/******/ 	__webpack_modules__["./src/scripts/fantia-actions.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;