// ==UserScript==
// @name         pixiv fanbox actions
// @namespace    https://www.sapphire.sh/
// @description  add action buttons to pixiv fanbox pages
// @match        https://www.pixiv.net/*
// @match        https://*.fanbox.cc/*
// @grant        none
// @run-at       document-end
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/pixiv-fanbox-actions.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/pixiv-fanbox-actions.user.js
// @version      1688685445087
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
__exportStar(__webpack_require__(/*! ./waitForElement */ "./src/helpers/waitForElement.ts"), exports);


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
exports.waitForElement = void 0;
const utils_1 = __webpack_require__(/*! @sapphire-sh/utils */ "./node_modules/@sapphire-sh/utils/lib/index.js");
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


/***/ }),

/***/ "./src/scripts/pixiv-fanbox-actions.ts":
/*!*********************************************!*\
  !*** ./src/scripts/pixiv-fanbox-actions.ts ***!
  \*********************************************/
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
var PageType;
(function (PageType) {
    PageType[PageType["A"] = 0] = "A";
    PageType[PageType["B"] = 1] = "B";
})(PageType || (PageType = {}));
const generateButtons = (params) => {
    const div = document.createElement('div');
    div.setAttribute('style', 'position:fixed;left:100px;top:100px;');
    switch (params.type) {
        case PageType.A: {
            const { id, username } = params;
            {
                const button = document.createElement('button');
                button.textContent = 'sanitize';
                button.onclick = () => {
                    window.location.href = `https://${username}.fanbox.cc/posts/${id}`;
                };
                div.appendChild(button);
            }
            break;
        }
        case PageType.B: {
            const { id, title, links, images } = params;
            {
                const button = document.createElement('button');
                button.textContent = 'copy';
                button.onclick = () => {
                    window.navigator.clipboard.writeText(`${id}_${title}`);
                };
                div.appendChild(button);
            }
            {
                const button = document.createElement('button');
                button.textContent = `open (${images.length})`;
                button.onclick = generateHandler(images);
                div.appendChild(button);
            }
            if (links.prevLink !== null) {
                const button = document.createElement('button');
                button.textContent = 'prev';
                button.onclick = () => {
                    div.remove();
                    location.href = links.prevLink;
                };
                div.appendChild(button);
            }
            if (links.nextLink !== null) {
                const button = document.createElement('button');
                button.textContent = 'next';
                button.onclick = () => {
                    div.remove();
                    location.href = links.nextLink;
                };
                div.appendChild(button);
            }
            break;
        }
    }
    return div;
};
const generateHandler = (images) => {
    return () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(images);
        for (const { href } of images) {
            open(href);
        }
    });
};
const getArticle = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, helpers_1.waitForElement)('article');
    const x = document.querySelector('article');
    if (x === null) {
        throw new Error('article not found');
    }
    return x;
});
const getImages = (article) => {
    const e = article.querySelectorAll('article div:last-child a');
    return Array.from(e);
};
const attachA = (id, username) => __awaiter(void 0, void 0, void 0, function* () {
    const article = yield getArticle();
    const buttons = generateButtons({ type: PageType.A, id, username });
    article.appendChild(buttons);
});
const attachB = (id, title, links) => __awaiter(void 0, void 0, void 0, function* () {
    const article = yield getArticle();
    const images = getImages(article);
    const buttons = generateButtons({ type: PageType.B, id, title, links, images });
    article.appendChild(buttons);
});
const getLink = (userId, postId) => {
    return `https://www.pixiv.net/fanbox/creator/${userId}/post/${postId}`;
};
const getLinks = (response) => {
    var _a, _b;
    const userId = response.user.userId;
    const prevId = (_a = response.prevPost) === null || _a === void 0 ? void 0 : _a.id;
    const nextId = (_b = response.nextPost) === null || _b === void 0 ? void 0 : _b.id;
    return {
        prevLink: prevId !== undefined ? getLink(userId, prevId) : null,
        nextLink: nextId !== undefined ? getLink(userId, nextId) : null,
    };
};
const main = () => {
    const getArticleId = () => {
        const match = window.location.pathname.match(/\/posts\/(\d+)/);
        if (!match) {
            return null;
        }
        return match[1];
    };
    const getUsername = () => {
        const match = window.location.pathname.match(/\/@(.+?)\//);
        if (!match) {
            return null;
        }
        return match[1];
    };
    const articleId = getArticleId();
    if (!articleId) {
        return;
    }
    if (window.location.href.match(/^https:\/\/www\.fanbox\.cc\/\@/)) {
        const username = getUsername();
        if (!username) {
            return;
        }
        return attachA(articleId, username);
    }
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
            if (xhr.responseURL.match(/post\.info/) === null) {
                return;
            }
            const response = JSON.parse(xhr.response).body;
            if (articleId !== response.id) {
                return;
            }
            const id = response.id;
            const title = response.title;
            const links = getLinks(response);
            attachB(id, title, links);
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/pixiv-fanbox-actions.ts");
/******/ 	
/******/ })()
;