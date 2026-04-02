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
/*!***************************************!*\
  !*** ./src/scripts/fantia-actions.ts ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
const generateButtons = (params) => {
    const div = document.createElement('div');
    div.setAttribute('style', 'position:fixed;left:100px;top:100px;');
    const { id, title } = params;
    const button = document.createElement('button');
    button.textContent = 'copy';
    button.onclick = () => {
        void window.navigator.clipboard.writeText(`${id}_${title}`);
    };
    div.appendChild(button);
    return div;
};
const attach = async (id, title) => {
    const buttons = generateButtons({ id, title });
    document.documentElement.appendChild(buttons);
};
const main = () => {
    const XHR = window.XMLHttpRequest;
    // @ts-expect-error XMLHttpRequest constructor override
    window.XMLHttpRequest = () => {
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
            const { id } = response;
            const { title } = response;
            void attach(id, title);
        };
        xhr.addEventListener('readystatechange', handleReadyStateChange, false);
        return xhr;
    };
    window.fetch = new Proxy(window.fetch, {
        apply: async (target, that, args) => {
            const promise = target.apply(that, args);
            void (async () => {
                const res = await promise;
                if (res.url.match(/\/api\/v1\/posts\/\d+$/) === null) {
                    return;
                }
                const { post: { id, title }, } = await res.clone().json();
                void attach(id, title);
            })();
            return promise;
        },
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