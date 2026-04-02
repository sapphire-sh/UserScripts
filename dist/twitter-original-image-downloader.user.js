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
// @version      1775129477637
// ==/UserScript==
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@sapphire-sh/utils/lib/esm/getEnumValue.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/esm/getEnumValue.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getEnumValue: () => (/* binding */ getEnumValue)
/* harmony export */ });
const getEnumValue = (value) => {
    const enumValues = Object.values(value);
    return (value) => (enumValues.includes(value) ? value : null);
};
//# sourceMappingURL=getEnumValue.js.map

/***/ }),

/***/ "./node_modules/@sapphire-sh/utils/lib/esm/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/esm/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LogLevel: () => (/* reexport safe */ _logger_js__WEBPACK_IMPORTED_MODULE_2__.LogLevel),
/* harmony export */   Queue: () => (/* reexport safe */ _queue_js__WEBPACK_IMPORTED_MODULE_4__.Queue),
/* harmony export */   getEnumValue: () => (/* reexport safe */ _getEnumValue_js__WEBPACK_IMPORTED_MODULE_0__.getEnumValue),
/* harmony export */   isNonNullable: () => (/* reexport safe */ _isNonNullable_js__WEBPACK_IMPORTED_MODULE_1__.isNonNullable),
/* harmony export */   logger: () => (/* reexport safe */ _logger_js__WEBPACK_IMPORTED_MODULE_2__.logger),
/* harmony export */   notifyMattermost: () => (/* reexport safe */ _notify_js__WEBPACK_IMPORTED_MODULE_3__.notifyMattermost),
/* harmony export */   notifySlack: () => (/* reexport safe */ _notify_js__WEBPACK_IMPORTED_MODULE_3__.notifySlack),
/* harmony export */   sleep: () => (/* reexport safe */ _sleep_js__WEBPACK_IMPORTED_MODULE_5__.sleep),
/* harmony export */   throttle: () => (/* reexport safe */ _throttle_js__WEBPACK_IMPORTED_MODULE_6__.throttle)
/* harmony export */ });
/* harmony import */ var _getEnumValue_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getEnumValue.js */ "./node_modules/@sapphire-sh/utils/lib/esm/getEnumValue.js");
/* harmony import */ var _isNonNullable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isNonNullable.js */ "./node_modules/@sapphire-sh/utils/lib/esm/isNonNullable.js");
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logger.js */ "./node_modules/@sapphire-sh/utils/lib/esm/logger.js");
/* harmony import */ var _notify_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notify.js */ "./node_modules/@sapphire-sh/utils/lib/esm/notify.js");
/* harmony import */ var _queue_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./queue.js */ "./node_modules/@sapphire-sh/utils/lib/esm/queue.js");
/* harmony import */ var _sleep_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sleep.js */ "./node_modules/@sapphire-sh/utils/lib/esm/sleep.js");
/* harmony import */ var _throttle_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./throttle.js */ "./node_modules/@sapphire-sh/utils/lib/esm/throttle.js");







//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@sapphire-sh/utils/lib/esm/isNonNullable.js":
/*!******************************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/esm/isNonNullable.js ***!
  \******************************************************************/
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

/***/ "./node_modules/@sapphire-sh/utils/lib/esm/logger.js":
/*!***********************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/esm/logger.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LogLevel: () => (/* binding */ LogLevel),
/* harmony export */   logger: () => (/* binding */ logger)
/* harmony export */ });
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 1] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["WARN"] = 3] = "WARN";
    LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
})(LogLevel || (LogLevel = {}));
const serializePayload = (payload) => {
    const json = JSON.stringify(payload instanceof Error ? { error: payload.message, name: payload.name, stack: payload.stack } : payload);
    return json.padStart(json.length + 1);
};
let currentLevel = LogLevel.INFO;
const log = (level, message, payload) => {
    if (level < currentLevel) {
        return;
    }
    const ts = new Date().toISOString();
    const prefix = `[${ts}] [${LogLevel[level].toUpperCase()}]`;
    const payloadStr = payload === undefined ? '' : serializePayload(payload);
    const output = `${prefix} ${message}${payloadStr}`;
    if (level === LogLevel.ERROR) {
        console.error(output);
    }
    else if (level === LogLevel.WARN) {
        console.warn(output);
    }
    else if (level === LogLevel.DEBUG) {
        console.debug(output);
    }
    else {
        console.log(output);
    }
};
const logger = {
    debug: (message, payload) => log(LogLevel.DEBUG, message, payload),
    info: (message, payload) => log(LogLevel.INFO, message, payload),
    warn: (message, payload) => log(LogLevel.WARN, message, payload),
    error: (message, payload) => log(LogLevel.ERROR, message, payload),
    setLevel: (level) => {
        if (typeof level === 'string') {
            const resolved = LogLevel[level.toUpperCase()];
            if (resolved === undefined) {
                console.warn(`[logger] Invalid log level: "${level}", keeping current level`);
                return;
            }
            currentLevel = resolved;
        }
        else {
            currentLevel = level;
        }
    },
};
//# sourceMappingURL=logger.js.map

/***/ }),

/***/ "./node_modules/@sapphire-sh/utils/lib/esm/notify.js":
/*!***********************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/esm/notify.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   notifyMattermost: () => (/* binding */ notifyMattermost),
/* harmony export */   notifySlack: () => (/* binding */ notifySlack)
/* harmony export */ });
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logger.js */ "./node_modules/@sapphire-sh/utils/lib/esm/logger.js");

const notifySlack = async (url, text) => {
    _logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.debug('[notifySlack] posting to webhook', { textLength: text.length });
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    });
    _logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.debug('[notifySlack] response received', { status: resp.status });
    if (!resp.ok) {
        throw new Error(`Slack webhook failed: HTTP ${resp.status}`);
    }
};
const notifyMattermost = async (baseUrl, token, channelId, message) => {
    _logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.debug('[notifyMattermost] posting to channel', { channelId, messageLength: message.length });
    const resp = await fetch(`${baseUrl}/api/v4/posts`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ channel_id: channelId, message }),
    });
    _logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.debug('[notifyMattermost] response received', { status: resp.status });
    if (!resp.ok) {
        throw new Error(`Mattermost post failed: HTTP ${resp.status}`);
    }
};
//# sourceMappingURL=notify.js.map

/***/ }),

/***/ "./node_modules/@sapphire-sh/utils/lib/esm/queue.js":
/*!**********************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/esm/queue.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Queue: () => (/* binding */ Queue)
/* harmony export */ });
class QueueNode {
    value;
    _next = null;
    constructor(value) {
        this.value = value;
    }
    get next() {
        return this._next;
    }
    setNext(newNode) {
        this._next = newNode;
    }
}
class Queue {
    head = null;
    tail = null;
    _size = 0;
    enqueue(value) {
        const newNode = new QueueNode(value);
        if (this.isEmpty() || !this.tail) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            this.tail.setNext(newNode);
            this.tail = newNode;
        }
        this._size += 1;
    }
    dequeue() {
        if (this.isEmpty() || !this.head) {
            return;
        }
        const { value } = this.head;
        this.head = this.head.next;
        this._size -= 1;
        if (this.isEmpty()) {
            this.tail = null;
        }
        return value;
    }
    dequeueMultiple(count) {
        const array = [];
        for (let i = 0; i < count; ++i) {
            const value = this.dequeue();
            if (value === undefined) {
                break;
            }
            array.push(value);
        }
        return array;
    }
    get size() {
        return this._size;
    }
    isEmpty() {
        return this._size === 0;
    }
    peek() {
        return this.head?.value;
    }
    has(value) {
        let node = this.head;
        while (node !== null) {
            if (node.value === value) {
                return true;
            }
            node = node.next;
        }
        return false;
    }
    some(predicate) {
        let node = this.head;
        while (node !== null) {
            if (predicate(node.value)) {
                return true;
            }
            node = node.next;
        }
        return false;
    }
    toArray() {
        let node = this.head;
        if (!node) {
            return [];
        }
        const array = [];
        while (node) {
            array.push(node.value);
            node = node.next;
        }
        return array;
    }
}
//# sourceMappingURL=queue.js.map

/***/ }),

/***/ "./node_modules/@sapphire-sh/utils/lib/esm/sleep.js":
/*!**********************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/esm/sleep.js ***!
  \**********************************************************/
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

/***/ "./node_modules/@sapphire-sh/utils/lib/esm/throttle.js":
/*!*************************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/esm/throttle.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   throttle: () => (/* binding */ throttle)
/* harmony export */ });
const throttle = (fn, interval) => {
    let timestamp = 0;
    return (...args) => {
        const now = Date.now();
        if (now - timestamp < interval) {
            return;
        }
        timestamp = now;
        return fn(...args);
    };
};
//# sourceMappingURL=throttle.js.map

/***/ }),

/***/ "./src/helpers/index.ts":
/*!******************************!*\
  !*** ./src/helpers/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isNotNullable: () => (/* reexport safe */ _isNotNullable__WEBPACK_IMPORTED_MODULE_0__.isNotNullable),
/* harmony export */   waitForElement: () => (/* reexport safe */ _waitForElement__WEBPACK_IMPORTED_MODULE_1__.waitForElement),
/* harmony export */   waitForElements: () => (/* reexport safe */ _waitForElement__WEBPACK_IMPORTED_MODULE_1__.waitForElements)
/* harmony export */ });
/* harmony import */ var _isNotNullable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isNotNullable */ "./src/helpers/isNotNullable.ts");
/* harmony import */ var _waitForElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./waitForElement */ "./src/helpers/waitForElement.ts");




/***/ }),

/***/ "./src/helpers/isNotNullable.ts":
/*!**************************************!*\
  !*** ./src/helpers/isNotNullable.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isNotNullable: () => (/* binding */ isNotNullable)
/* harmony export */ });
const isNotNullable = (value) => value !== null;


/***/ }),

/***/ "./src/helpers/waitForElement.ts":
/*!***************************************!*\
  !*** ./src/helpers/waitForElement.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   waitForElement: () => (/* binding */ waitForElement),
/* harmony export */   waitForElements: () => (/* binding */ waitForElements)
/* harmony export */ });
/* harmony import */ var _sapphire_sh_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sapphire-sh/utils */ "./node_modules/@sapphire-sh/utils/lib/esm/index.js");
/* harmony import */ var _isNotNullable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isNotNullable */ "./src/helpers/isNotNullable.ts");


const waitForElement = async (selector) => {
    for (;;) {
        const e = document.querySelectorAll(selector);
        if (e.length > 0) {
            return e;
        }
        await (0,_sapphire_sh_utils__WEBPACK_IMPORTED_MODULE_0__.sleep)(100);
    }
};
const waitForElements = async (selector, options) => {
    const { parent, timeout = 10000 } = options ?? {};
    const root = parent ?? document;
    let elapsedTime = 0;
    const intervalTime = 100;
    for (;;) {
        if (elapsedTime >= timeout) {
            return null;
        }
        const selectors = Array.isArray(selector) ? selector : [selector];
        for (const selector of selectors) {
            const elements = root.querySelectorAll(selector);
            if (elements.length > 0) {
                // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                return Array.from(elements)
                    .map((element) => (element instanceof HTMLElement ? element : null))
                    .filter(_isNotNullable__WEBPACK_IMPORTED_MODULE_1__.isNotNullable);
            }
            await (0,_sapphire_sh_utils__WEBPACK_IMPORTED_MODULE_0__.sleep)(intervalTime);
            elapsedTime += intervalTime;
        }
    }
};


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
/*!**********************************************************!*\
  !*** ./src/scripts/twitter-original-image-downloader.ts ***!
  \**********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "./src/helpers/index.ts");

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
        const [, tweetId] = match;
        window.open(`http://acrux:9001/tweet/${tweetId}`, '_blank');
    };
    return button;
};
const _getFormat = async () => {
    const el = await (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.waitForElement)('[property="og:image"]');
    const [firstEl] = Array.from(el);
    if (!(firstEl instanceof HTMLMetaElement)) {
        return;
    }
    const match = firstEl.content.match(/\.(\w+):large$/);
    if (!match) {
        return;
    }
    return match[1];
};
const createHandler = (images) => async () => {
    for (const { src } of images) {
        // const url = src.replace(/name=\w+$/, 'name=orig');
        const url = src
            // .replace(/format=webp/, `format=${format}`)
            .replace(/name=\w+$/, 'name=orig');
        open(url);
    }
};
const getArticles = async () => {
    const articles = await (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.waitForElements)(['article', '[data-testid="error-detail"]']);
    return articles?.filter((article) => {
        const e = article.querySelector('article div[role="group"]');
        return e !== null;
    });
};
const getImages = async (article) => {
    const images = await (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.waitForElements)('div[data-testid="tweetPhoto"] img', {
        parent: article,
    });
    // if (images.length === 4) {
    // 	const t = images[1];
    // 	images[1] = images[2];
    // 	images[2] = t;
    // }
    return images;
};
const main = async () => {
    const articles = await getArticles();
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
        const images = await getImages(article);
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
};
void (async () => {
    try {
        await main();
    }
    catch (error) {
        console.error(error);
    }
})();

})();

/******/ })()
;