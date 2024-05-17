// ==UserScript==
// @name         twitter original image downloader
// @description  twitter original image downloader
// @match        https://twitter.com/*
// @match        https://mobile.twitter.com/*
// @match        https://x.com/*
// @match        https://mobile.x.com/*
// @grant        none
// @namespace    https://www.sapphire.sh/
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-original-image-downloader.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-original-image-downloader.user.js
// @version      1715950093070
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
exports.waitForElements = exports.waitForElement = void 0;
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
const waitForElements = (selector, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { parent, timeout = 10000 } = options !== null && options !== void 0 ? options : {};
    const root = parent !== null && parent !== void 0 ? parent : document;
    let elapsedTime = 0;
    let intervalTime = 100;
    while (true) {
        if (elapsedTime >= timeout) {
            return null;
        }
        const selectors = Array.isArray(selector) ? selector : [selector];
        for (const selector of selectors) {
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
    }
});
exports.waitForElements = waitForElements;


/***/ }),

/***/ "./src/scripts/twitter-original-image-downloader.ts":
/*!**********************************************************!*\
  !*** ./src/scripts/twitter-original-image-downloader.ts ***!
  \**********************************************************/
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
const createDownloadButton = (images) => {
    const button = document.createElement('button');
    button.textContent = 'download';
    button.onclick = createHandler(images);
    return button;
};
const createLinkButton = () => {
    const button = document.createElement('button');
    button.textContent = 'link';
    button.onclick = () => {
        const linkEl = document.querySelector('link[rel="canonical"]');
        if (!linkEl) {
            return;
        }
        if (!(linkEl instanceof HTMLLinkElement)) {
            return;
        }
        const match = linkEl.href.match(/status\/(\d+)\/?/);
        if (!match) {
            return;
        }
        const tweetId = match[1];
        window.open(`http://acrux:9001/tweet/${tweetId}`, '_blank');
    };
    return button;
};
const getFormat = () => __awaiter(void 0, void 0, void 0, function* () {
    const el = yield (0, helpers_1.waitForElement)('[property="og:image"]');
    if (!el) {
        return;
    }
    if (!(el instanceof HTMLMetaElement)) {
        return;
    }
    const match = el.content.match(/\.(\w+):large$/);
    if (!match) {
        return;
    }
    return match[1];
});
const createHandler = (images) => {
    return () => __awaiter(void 0, void 0, void 0, function* () {
        for (const { src } of images) {
            // const url = src.replace(/name=\w+$/, 'name=orig');
            const url = src
                // .replace(/format=webp/, `format=${format}`)
                .replace(/name=\w+$/, 'name=orig');
            open(url);
        }
    });
};
const getArticles = () => __awaiter(void 0, void 0, void 0, function* () {
    const articles = yield (0, helpers_1.waitForElements)([
        'article',
        '[data-testid="error-detail"]',
    ]);
    return articles === null || articles === void 0 ? void 0 : articles.filter((article) => {
        const e = article.querySelector('article div[role="group"]');
        return e !== null;
    });
});
const getImages = (article) => __awaiter(void 0, void 0, void 0, function* () {
    const images = yield (0, helpers_1.waitForElements)('div[data-testid="tweetPhoto"] img', {
        parent: article,
    });
    // if (images.length === 4) {
    // 	const t = images[1];
    // 	images[1] = images[2];
    // 	images[2] = t;
    // }
    return images;
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const articles = yield getArticles();
    if (!articles || articles.length === 0) {
        const containerEl = document.querySelector('[data-testid="error-detail"]');
        if (!containerEl) {
            return;
        }
        const linkButton = createLinkButton();
        const buttonWrapperEl = document.createElement('div');
        Object.assign(buttonWrapperEl.style, {
            position: 'absolute',
            top: '8px',
            right: '64px',
        });
        buttonWrapperEl.appendChild(linkButton);
        containerEl.appendChild(buttonWrapperEl);
        return;
    }
    for (const article of articles) {
        const images = yield getImages(article);
        if (!images) {
            continue;
        }
        if (images.length === 0) {
            continue;
        }
        const downloadButton = createDownloadButton(images);
        const linkButton = createLinkButton();
        const buttonWrapperEl = document.createElement('div');
        Object.assign(buttonWrapperEl.style, {
            position: 'absolute',
            top: '8px',
            right: '64px',
        });
        buttonWrapperEl.appendChild(linkButton);
        buttonWrapperEl.appendChild(downloadButton);
        article.appendChild(buttonWrapperEl);
    }
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield main();
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/twitter-original-image-downloader.ts");
/******/ 	
/******/ })()
;