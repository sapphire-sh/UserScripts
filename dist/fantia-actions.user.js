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
// @version      1776618183993
// ==/UserScript==
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@sapphire-sh/utils/lib/browser.js":
/*!********************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/browser.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   interceptXHR: () => (/* reexport safe */ _interceptXHR_js__WEBPACK_IMPORTED_MODULE_0__.interceptXHR),
/* harmony export */   waitForElement: () => (/* reexport safe */ _waitForElement_js__WEBPACK_IMPORTED_MODULE_1__.waitForElement),
/* harmony export */   waitForElements: () => (/* reexport safe */ _waitForElement_js__WEBPACK_IMPORTED_MODULE_1__.waitForElements)
/* harmony export */ });
/* harmony import */ var _interceptXHR_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interceptXHR.js */ "./node_modules/@sapphire-sh/utils/lib/interceptXHR.js");
/* harmony import */ var _waitForElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./waitForElement.js */ "./node_modules/@sapphire-sh/utils/lib/waitForElement.js");


//# sourceMappingURL=browser.js.map

/***/ }),

/***/ "./node_modules/@sapphire-sh/utils/lib/interceptXHR.js":
/*!*************************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/interceptXHR.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   interceptXHR: () => (/* binding */ interceptXHR)
/* harmony export */ });
const originalSend = XMLHttpRequest.prototype.send;
const interceptXHR = (pattern, handler) => {
    XMLHttpRequest.prototype.send = function (body) {
        this.addEventListener('load', () => {
            if (this.status !== 200) {
                return;
            }
            const matches = typeof pattern === 'string'
                ? this.responseURL.includes(pattern)
                : pattern.test(this.responseURL);
            if (!matches) {
                return;
            }
            handler(this);
        });
        return originalSend.call(this, body);
    };
};
//# sourceMappingURL=interceptXHR.js.map

/***/ }),

/***/ "./node_modules/@sapphire-sh/utils/lib/isNonNullable.js":
/*!**************************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/isNonNullable.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isNonNullable: () => (/* binding */ isNonNullable)
/* harmony export */ });
const isNonNullable = (value) => {
    if (value === null) {
        return false;
    }
    if (value === undefined) {
        return false;
    }
    return true;
};
//# sourceMappingURL=isNonNullable.js.map

/***/ }),

/***/ "./node_modules/@sapphire-sh/utils/lib/sleep.js":
/*!******************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/sleep.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sleep: () => (/* binding */ sleep)
/* harmony export */ });
const sleep = async (ms, jitter = 0) => {
    const delay = ms + Math.random() * jitter;
    return new Promise((resolve) => globalThis.setTimeout(resolve, delay));
};
//# sourceMappingURL=sleep.js.map

/***/ }),

/***/ "./node_modules/@sapphire-sh/utils/lib/waitForElement.js":
/*!***************************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/waitForElement.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   waitForElement: () => (/* binding */ waitForElement),
/* harmony export */   waitForElements: () => (/* binding */ waitForElements)
/* harmony export */ });
/* harmony import */ var _isNonNullable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isNonNullable.js */ "./node_modules/@sapphire-sh/utils/lib/isNonNullable.js");
/* harmony import */ var _sleep_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sleep.js */ "./node_modules/@sapphire-sh/utils/lib/sleep.js");


const poll = async (handler, options) => {
    const { timeout = 10000, jitter = 0 } = options ?? {};
    let elapsedTime = 0;
    const intervalTime = 100;
    for (;;) {
        const result = handler();
        if (result !== null) {
            return result;
        }
        if (elapsedTime >= timeout) {
            return null;
        }
        await (0,_sleep_js__WEBPACK_IMPORTED_MODULE_1__.sleep)(intervalTime, jitter);
        elapsedTime += intervalTime;
    }
};
const waitForElement = async (selector, options) => {
    const root = options?.parent ?? document;
    return poll(() => root.querySelector(selector), options);
};
const waitForElements = async (selector, options) => {
    const root = options?.parent ?? document;
    const selectors = Array.isArray(selector) ? selector : [selector];
    return poll(() => {
        for (const selector of selectors) {
            const elements = root.querySelectorAll(selector);
            if (elements.length > 0) {
                return Array.from(elements).filter(_isNonNullable_js__WEBPACK_IMPORTED_MODULE_0__.isNonNullable);
            }
        }
        return null;
    }, options);
};
//# sourceMappingURL=waitForElement.js.map

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***************************************!*\
  !*** ./src/scripts/fantia-actions.ts ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sapphire_sh_utils_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sapphire-sh/utils/browser */ "./node_modules/@sapphire-sh/utils/lib/browser.js");

const POST_API_PATTERN = /\/api\/v1\/posts\/\d+$/;
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
    (0,_sapphire_sh_utils_browser__WEBPACK_IMPORTED_MODULE_0__.interceptXHR)(/\/api\/v1\/posts\//, (xhr) => {
        const response = JSON.parse(xhr.response).post;
        const { id } = response;
        const { title } = response;
        void attach(id, title);
    });
    window.fetch = new Proxy(window.fetch, {
        apply: async (target, that, args) => {
            const promise = target.apply(that, args);
            void (async () => {
                const res = await promise;
                if (!POST_API_PATTERN.test(res.url)) {
                    return;
                }
                const { post: { id, title }, } = await res.clone().json();
                void attach(id, title);
            })();
            return promise;
        },
    });
};
try {
    main();
}
catch (error) {
    console.error(error);
}

})();

/******/ })()
;