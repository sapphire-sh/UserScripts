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
// @version      1775137623301
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
/*!*********************************************!*\
  !*** ./src/scripts/pixiv-fanbox-actions.ts ***!
  \*********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "./src/helpers/index.ts");

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
                    void window.navigator.clipboard.writeText(`${id}_${title}`);
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
                const { prevLink } = links;
                const button = document.createElement('button');
                button.textContent = 'prev';
                button.onclick = () => {
                    div.remove();
                    location.href = prevLink;
                };
                div.appendChild(button);
            }
            if (links.nextLink !== null) {
                const { nextLink } = links;
                const button = document.createElement('button');
                button.textContent = 'next';
                button.onclick = () => {
                    div.remove();
                    location.href = nextLink;
                };
                div.appendChild(button);
            }
            break;
        }
    }
    return div;
};
const generateHandler = (images) => () => {
    console.log(images);
    for (const { href } of images) {
        open(href);
    }
};
const getArticle = async () => {
    await (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.waitForElement)('article');
    const x = document.querySelector('article');
    if (x === null) {
        throw new Error('article not found');
    }
    return x;
};
const getImages = (article) => {
    const e = article.querySelectorAll('article div:last-child a');
    return Array.from(e);
};
const attachA = async (id, username) => {
    const article = await getArticle();
    const buttons = generateButtons({ type: PageType.A, id, username });
    article.appendChild(buttons);
};
const attachB = async (id, title, links) => {
    const article = await getArticle();
    const images = getImages(article);
    const buttons = generateButtons({ type: PageType.B, id, title, links, images });
    article.appendChild(buttons);
};
const getLink = (userId, postId) => `https://www.pixiv.net/fanbox/creator/${userId}/post/${postId}`;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getLinks = (response) => {
    const { userId } = response.user;
    const prevId = response.prevPost?.id;
    const nextId = response.nextPost?.id;
    return {
        prevLink: prevId === undefined ? null : getLink(userId, prevId),
        nextLink: nextId === undefined ? null : getLink(userId, nextId),
    };
};
const main = async () => {
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
    if (articleId === null) {
        return;
    }
    if (window.location.href.match(/^https:\/\/www\.fanbox\.cc\/@/)) {
        const username = getUsername();
        if (username === null) {
            return;
        }
        return attachA(articleId, username);
    }
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
            if (xhr.responseURL.match(/post\.info/) === null) {
                return;
            }
            const response = JSON.parse(xhr.response).body;
            if (articleId !== response.id) {
                return;
            }
            const { id } = response;
            const { title } = response;
            const links = getLinks(response);
            void attachB(id, title, links);
        };
        xhr.addEventListener('readystatechange', handleReadyStateChange, false);
        return xhr;
    };
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