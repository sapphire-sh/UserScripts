// ==UserScript==
// @name         comike web catalog helper
// @namespace    https://www.sapphire.sh/
// @description  comike web catalog helper
// @match        https://webcatalog.circle.ms/*
// @grant        none
// @run-at       document-end
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/comike-web-catalog-helper.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/comike-web-catalog-helper.user.js
// @version      1691357303662
// ==/UserScript==
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@sapphire-sh/utils/lib/index.js":
/*!******************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/index.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./scripts */ "./node_modules/@sapphire-sh/utils/lib/scripts/index.js"), exports);


/***/ }),

/***/ "./node_modules/@sapphire-sh/utils/lib/scripts/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/scripts/index.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./sleep */ "./node_modules/@sapphire-sh/utils/lib/scripts/sleep.js"), exports);


/***/ }),

/***/ "./node_modules/@sapphire-sh/utils/lib/scripts/sleep.js":
/*!**************************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/scripts/sleep.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sleep = void 0;
const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
exports.sleep = sleep;


/***/ }),

/***/ "./src/helpers/index.ts":
/*!******************************!*\
  !*** ./src/helpers/index.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./isNotNullable */ "./src/helpers/isNotNullable.ts"), exports);
__exportStar(__webpack_require__(/*! ./waitForElement */ "./src/helpers/waitForElement.ts"), exports);


/***/ }),

/***/ "./src/helpers/isNotNullable.ts":
/*!**************************************!*\
  !*** ./src/helpers/isNotNullable.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isNotNullable = void 0;
const isNotNullable = (value) => value !== null;
exports.isNotNullable = isNotNullable;


/***/ }),

/***/ "./src/helpers/waitForElement.ts":
/*!***************************************!*\
  !*** ./src/helpers/waitForElement.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.waitForElements = exports.waitForElement_ = exports.waitForElement = void 0;
const utils_1 = __webpack_require__(/*! @sapphire-sh/utils */ "./node_modules/@sapphire-sh/utils/lib/index.js");
const isNotNullable_1 = __webpack_require__(/*! ./isNotNullable */ "./src/helpers/isNotNullable.ts");
const waitForElement = (selector) => __awaiter(void 0, void 0, void 0, function* () {
    while (true) {
        const e = document.querySelectorAll(selector);
        if (e.length > 0) {
            return e;
        }
        yield (0, utils_1.sleep)(100);
    }
});
exports.waitForElement = waitForElement;
const waitForElement_ = (selector, options) => __awaiter(void 0, void 0, void 0, function* () {
    const elements = yield (0, exports.waitForElements)(selector, options);
    if (!elements || !elements[0]) {
        return null;
    }
    return elements[0];
});
exports.waitForElement_ = waitForElement_;
const waitForElements = (selector, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { parent, timeout = 10000 } = options !== null && options !== void 0 ? options : {};
    const root = parent !== null && parent !== void 0 ? parent : document;
    let elapsedTime = 0;
    let intervalTime = 100;
    while (true) {
        if (elapsedTime >= timeout) {
            return null;
        }
        const elements = root.querySelectorAll(selector);
        if (elements.length > 0) {
            return Array.from(elements)
                .map((element) => {
                return element instanceof HTMLElement ? element : null;
            })
                .filter(isNotNullable_1.isNotNullable);
        }
        yield (0, utils_1.sleep)(intervalTime);
        elapsedTime += intervalTime;
    }
});
exports.waitForElements = waitForElements;


/***/ }),

/***/ "./src/scripts/comike-web-catalog-helper.ts":
/*!**************************************************!*\
  !*** ./src/scripts/comike-web-catalog-helper.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const helpers_1 = __webpack_require__(/*! ../helpers */ "./src/helpers/index.ts");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const dataEls = yield (0, helpers_1.waitForElement)('#TheModel');
    const dataEl = dataEls[0];
    if (!dataEl || !dataEl.textContent) {
        throw new Error('cannot find data');
    }
    const data = JSON.parse(dataEl.textContent);
    console.log('data', data);
    for (const circle of data.Circles) {
        console.log('circle', circle);
        const circleEls = yield (0, helpers_1.waitForElement)(`[id="${circle.Id}"]`);
        const circleEl = circleEls[0];
        if (!circleEl) {
            console.log(`cannot find circle: ${circle.Id}`);
            continue;
        }
        if (circle.Author) {
            const circleNameEl = circleEl.querySelector('.infotable-circlename');
            if (circleNameEl) {
                const artistNameEl = document.createElement('p');
                artistNameEl.textContent = circle.Author;
                circleNameEl.appendChild(artistNameEl);
            }
        }
        const getActionsEl = () => {
            if (!circleEl.parentElement) {
                return null;
            }
            const els = Array.from(circleEl.parentElement.children);
            const index = els.findIndex((x) => x === circleEl);
            return els.find((el, elementIndex) => {
                if (elementIndex <= index) {
                    return false;
                }
                return !!el.querySelector('.md-support');
            });
        };
        const actionsEl = getActionsEl();
        if (actionsEl) {
            if (circle.PixivUrl) {
                const pixivEl = actionsEl.querySelector('.support-list-pixiv');
                if (pixivEl) {
                    const pixivWrapperEl = document.createElement('a');
                    pixivWrapperEl.target = '_blank';
                    pixivWrapperEl.href = circle.PixivUrl;
                    const listEl = pixivEl.parentElement;
                    if (listEl) {
                        listEl.removeChild(pixivEl);
                        listEl.appendChild(pixivWrapperEl);
                        pixivWrapperEl.appendChild(pixivEl.cloneNode(true));
                    }
                }
            }
            if (circle.TwitterUrl) {
                const twitterEl = actionsEl.querySelector('.support-list-twitter');
                if (twitterEl) {
                    const twitterWrapperEl = document.createElement('a');
                    twitterWrapperEl.target = '_blank';
                    twitterWrapperEl.href = circle.TwitterUrl;
                    const listEl = twitterEl.parentElement;
                    if (listEl) {
                        listEl.removeChild(twitterEl);
                        listEl.appendChild(twitterWrapperEl);
                        twitterWrapperEl.appendChild(twitterEl.cloneNode(true));
                    }
                }
            }
        }
    }
});
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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/comike-web-catalog-helper.ts");
/******/ 	
/******/ })()
;