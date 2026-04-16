// ==UserScript==
// @name         twitter icon replacer
// @namespace    https://www.sapphire.sh/
// @description  replace the current x icon to the old twitter icon
// @match        https://twitter.com/*
// @match        https://mobile.twitter.com/*
// @match        https://x.com/*
// @match        https://mobile.x.com/*
// @grant        GM_addStyle
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-icon-replacer.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-icon-replacer.user.js
// @version      1776319529423
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

/***/ "./node_modules/@sapphire-sh/utils/lib/date.js":
/*!*****************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/date.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatDuration: () => (/* binding */ formatDuration),
/* harmony export */   toLocalISOString: () => (/* binding */ toLocalISOString)
/* harmony export */ });
const toLocalISOString = (date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const hours = `${date.getHours()}`.padStart(2, '0');
    const minutes = `${date.getMinutes()}`.padStart(2, '0');
    const seconds = `${date.getSeconds()}`.padStart(2, '0');
    const ms = `${date.getMilliseconds()}`.padStart(3, '0');
    const offset = date.getTimezoneOffset();
    const sign = offset <= 0 ? '+' : '-';
    const offsetHours = `${Math.floor(Math.abs(offset) / 60)}`.padStart(2, '0');
    const offsetMinutes = `${Math.abs(offset) % 60}`.padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${ms}${sign}${offsetHours}:${offsetMinutes}`;
};
const formatDuration = (ms) => {
    const totalSeconds = Math.ceil(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const parts = [];
    if (hours > 0) {
        parts.push(`${hours}h`);
    }
    if (minutes > 0) {
        parts.push(`${minutes}m`);
    }
    if (seconds > 0 || parts.length === 0) {
        parts.push(`${seconds}s`);
    }
    return parts.join(' ');
};
//# sourceMappingURL=date.js.map

/***/ }),

/***/ "./node_modules/@sapphire-sh/utils/lib/error.js":
/*!******************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/error.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   serializeError: () => (/* binding */ serializeError)
/* harmony export */ });
const serializeError = (error) => JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error)));
//# sourceMappingURL=error.js.map

/***/ }),

/***/ "./node_modules/@sapphire-sh/utils/lib/getEnumValue.js":
/*!*************************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/getEnumValue.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getEnumValue: () => (/* binding */ getEnumValue)
/* harmony export */ });
const getEnumValue = (value) => {
    const enumValues = Object.values(value);
    return (input) => enumValues.find((e) => e === input) ?? null;
};
//# sourceMappingURL=getEnumValue.js.map

/***/ }),

/***/ "./node_modules/@sapphire-sh/utils/lib/http.js":
/*!*****************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/http.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HttpError: () => (/* binding */ HttpError),
/* harmony export */   fetchWithRetry: () => (/* binding */ fetchWithRetry)
/* harmony export */ });
/* harmony import */ var _sleep_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sleep.js */ "./node_modules/@sapphire-sh/utils/lib/sleep.js");

class HttpError extends Error {
    status;
    constructor(status, statusText) {
        super(`HTTP ${status} ${statusText}`);
        this.status = status;
    }
}
const fetchWithRetry = async (url, init, retryOptions) => {
    const { maxRetries = 3, baseDelayMs = 1000, jitterMs = 500, timeoutMs = 30000 } = retryOptions ?? {};
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        const resp = await fetch(url, {
            signal: AbortSignal.timeout(timeoutMs),
            ...init,
        });
        if (resp.ok) {
            return resp;
        }
        const error = new HttpError(resp.status, resp.statusText);
        const isTransient = resp.status === 429 || resp.status >= 500;
        if (!isTransient || attempt === maxRetries) {
            throw error;
        }
        const retryAfterHeader = resp.headers.get('retry-after');
        const delay = retryAfterHeader !== null && retryAfterHeader !== ''
            ? Number.parseInt(retryAfterHeader, 10) * 1000
            : baseDelayMs * 2 ** attempt;
        await (0,_sleep_js__WEBPACK_IMPORTED_MODULE_0__.sleep)(delay, jitterMs);
    }
    throw new Error('unreachable');
};
//# sourceMappingURL=http.js.map

/***/ }),

/***/ "./node_modules/@sapphire-sh/utils/lib/index.js":
/*!******************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HttpError: () => (/* reexport safe */ _http_js__WEBPACK_IMPORTED_MODULE_3__.HttpError),
/* harmony export */   LogLevel: () => (/* reexport safe */ _logger_js__WEBPACK_IMPORTED_MODULE_5__.LogLevel),
/* harmony export */   Queue: () => (/* reexport safe */ _queue_js__WEBPACK_IMPORTED_MODULE_7__.Queue),
/* harmony export */   escapeHtml: () => (/* reexport safe */ _string_js__WEBPACK_IMPORTED_MODULE_9__.escapeHtml),
/* harmony export */   fetchWithRetry: () => (/* reexport safe */ _http_js__WEBPACK_IMPORTED_MODULE_3__.fetchWithRetry),
/* harmony export */   formatDuration: () => (/* reexport safe */ _date_js__WEBPACK_IMPORTED_MODULE_0__.formatDuration),
/* harmony export */   getEnumValue: () => (/* reexport safe */ _getEnumValue_js__WEBPACK_IMPORTED_MODULE_2__.getEnumValue),
/* harmony export */   isNonNullable: () => (/* reexport safe */ _isNonNullable_js__WEBPACK_IMPORTED_MODULE_4__.isNonNullable),
/* harmony export */   logger: () => (/* reexport safe */ _logger_js__WEBPACK_IMPORTED_MODULE_5__.logger),
/* harmony export */   notifyMattermost: () => (/* reexport safe */ _notify_js__WEBPACK_IMPORTED_MODULE_6__.notifyMattermost),
/* harmony export */   notifySlack: () => (/* reexport safe */ _notify_js__WEBPACK_IMPORTED_MODULE_6__.notifySlack),
/* harmony export */   serializeError: () => (/* reexport safe */ _error_js__WEBPACK_IMPORTED_MODULE_1__.serializeError),
/* harmony export */   sleep: () => (/* reexport safe */ _sleep_js__WEBPACK_IMPORTED_MODULE_8__.sleep),
/* harmony export */   throttle: () => (/* reexport safe */ _throttle_js__WEBPACK_IMPORTED_MODULE_10__.throttle),
/* harmony export */   toLocalISOString: () => (/* reexport safe */ _date_js__WEBPACK_IMPORTED_MODULE_0__.toLocalISOString)
/* harmony export */ });
/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./date.js */ "./node_modules/@sapphire-sh/utils/lib/date.js");
/* harmony import */ var _error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error.js */ "./node_modules/@sapphire-sh/utils/lib/error.js");
/* harmony import */ var _getEnumValue_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getEnumValue.js */ "./node_modules/@sapphire-sh/utils/lib/getEnumValue.js");
/* harmony import */ var _http_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./http.js */ "./node_modules/@sapphire-sh/utils/lib/http.js");
/* harmony import */ var _isNonNullable_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./isNonNullable.js */ "./node_modules/@sapphire-sh/utils/lib/isNonNullable.js");
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./logger.js */ "./node_modules/@sapphire-sh/utils/lib/logger.js");
/* harmony import */ var _notify_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./notify.js */ "./node_modules/@sapphire-sh/utils/lib/notify.js");
/* harmony import */ var _queue_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./queue.js */ "./node_modules/@sapphire-sh/utils/lib/queue.js");
/* harmony import */ var _sleep_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./sleep.js */ "./node_modules/@sapphire-sh/utils/lib/sleep.js");
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./string.js */ "./node_modules/@sapphire-sh/utils/lib/string.js");
/* harmony import */ var _throttle_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./throttle.js */ "./node_modules/@sapphire-sh/utils/lib/throttle.js");











//# sourceMappingURL=index.js.map

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

/***/ "./node_modules/@sapphire-sh/utils/lib/logger.js":
/*!*******************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/logger.js ***!
  \*******************************************************/
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
            const levelMap = {
                DEBUG: LogLevel.DEBUG,
                INFO: LogLevel.INFO,
                WARN: LogLevel.WARN,
                ERROR: LogLevel.ERROR,
            };
            const resolved = levelMap[level.toUpperCase()];
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

/***/ "./node_modules/@sapphire-sh/utils/lib/notify.js":
/*!*******************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/notify.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   notifyMattermost: () => (/* binding */ notifyMattermost),
/* harmony export */   notifySlack: () => (/* binding */ notifySlack)
/* harmony export */ });
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logger.js */ "./node_modules/@sapphire-sh/utils/lib/logger.js");

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

/***/ "./node_modules/@sapphire-sh/utils/lib/queue.js":
/*!******************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/queue.js ***!
  \******************************************************/
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

/***/ "./node_modules/@sapphire-sh/utils/lib/string.js":
/*!*******************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/string.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   escapeHtml: () => (/* binding */ escapeHtml)
/* harmony export */ });
const escapeMap = {
    '"': '&quot;',
    "'": '&apos;',
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
};
const escapeHtml = (value) => value.replaceAll(/["'<>&]/g, (match) => escapeMap[match] ?? match);
//# sourceMappingURL=string.js.map

/***/ }),

/***/ "./node_modules/@sapphire-sh/utils/lib/throttle.js":
/*!*********************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/throttle.js ***!
  \*********************************************************/
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
/*!**********************************************!*\
  !*** ./src/scripts/twitter-icon-replacer.ts ***!
  \**********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sapphire_sh_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sapphire-sh/utils */ "./node_modules/@sapphire-sh/utils/lib/index.js");
/* harmony import */ var _sapphire_sh_utils_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sapphire-sh/utils/browser */ "./node_modules/@sapphire-sh/utils/lib/browser.js");


const ICON_A = 'data:image/png;base64,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';
const ICON_B = 'data:image/vnd.microsoft.icon;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJkSURBVHgB7VZBbtpQEH3zIW0WVYuXVaH4Bs0NSk4AOUFhEarskhMknIDsqkKlcIT0BNAT1D1B3ZJK3dmVuirwp/MhVmzAxiagKBJv9+ePZ97M/JkxsMMODwzChlD84FWQp3MxeCDHAhiumB+MJrr1+8Ryw3p/9+H4DctfIPCq49Xlw8Kv99YlMuB19885gy/i7llziwGfFFWJyR02XzSCuwiBUse7BlFVaz5LS8KQVkRXaXRJsqImfDjKSZBNyzEyFWFKVJ4KFbWLElUao6KbSk8i9TXgTPaorxTskPwOxa7/9baGt4zg8oQbNyfWYJlRU0/KUx9ZwNwYNq1ecFRzl18QpW0bB0Ks//KjV1uwlbuLJA3GxEdh5wb5yGEPl3qMd2xecYQHKnlFlVLX95kxYCFKGg5IlU2a0uLpCM68LEJA+sJ/Dm6Jy3aMjQIRakRUm+UuvfOp/X34iQSejeFo0Hdx4optG5uFH/R+GHNvANcm3VtwLs+Lvy2TRwhIOnrYHhysIuDKcCDwGbYAjglOzQt+HssElF6dvoNNOZeuCSbfSgIGMjILMo4/ExZf7TqghNLmlwm1gpSC2tmaLAZMvWGz0Iu7XpqBm2NrQNN5cD+Y5ZOTdZyok3RZMusZOJUN+QZrQFb0oQkG6xIIYHe8A03Unx/Ryd6jS2ctAsbxmFRVynGKlM5na5ePVkUe0p+h9MmraS2zXqYgmSWjOPtElHbLTVB3Q79gqQlMScxqXpeav0UWiGMmXKSNOpZAAPvKs/U/1MRoxRxl+5WD+psUy2D5IdmRVoWjnqDnLlkyO+zwaPAf1zXwZL751PUAAAAASUVORK5CYII=';
const ICON_C = '<g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g>';
const TITLE_REGEX = / \/ X$/;
const updateTitle = async (timeout = 10000) => {
    let elapsedTime = 0;
    const intervalTime = 100;
    for (;;) {
        if (elapsedTime >= timeout) {
            return;
        }
        if (!TITLE_REGEX.test(document.title)) {
            await (0,_sapphire_sh_utils__WEBPACK_IMPORTED_MODULE_0__.sleep)(intervalTime);
            elapsedTime += intervalTime;
            continue;
        }
        document.title = document.title.replace(TITLE_REGEX, ' / Twitter');
    }
};
const main = async () => {
    void updateTitle();
    {
        const firstEl = await (0,_sapphire_sh_utils_browser__WEBPACK_IMPORTED_MODULE_1__.waitForElement)('[href="/home"][role="link"]:not([data-testid="AppTabBar_Home_Link"])');
        if (firstEl === null) {
            console.error('waitForElement: home icon not found');
            return;
        }
        if (firstEl instanceof HTMLElement) {
            const svgEl = firstEl.getElementsByTagName('svg');
            const firstSvg = svgEl.item(0);
            if (firstSvg) {
                firstSvg.innerHTML = ICON_C;
                if (!isDarkMode()) {
                    firstSvg.style.color = 'rgb(29, 155, 240)';
                }
                firstEl.style.opacity = '1';
            }
        }
    }
    {
        const firstEl = await (0,_sapphire_sh_utils_browser__WEBPACK_IMPORTED_MODULE_1__.waitForElement)('[rel="apple-touch-icon"]');
        if (firstEl === null) {
            console.error('waitForElement: apple-touch-icon not found');
            return;
        }
        if (firstEl instanceof HTMLLinkElement) {
            firstEl.href = ICON_A;
        }
    }
    {
        const firstEl = await (0,_sapphire_sh_utils_browser__WEBPACK_IMPORTED_MODULE_1__.waitForElement)('[rel="shortcut icon"]');
        if (firstEl === null) {
            console.error('waitForElement: shortcut icon not found');
            return;
        }
        if (firstEl instanceof HTMLLinkElement) {
            firstEl.href = ICON_B;
        }
    }
};
const isDarkMode = () => !['#FFFFFF', 'rgb(255, 255, 255)'].includes(document.body.style.backgroundColor);
try {
    void main();
    document.addEventListener('load', () => {
        void main();
    });
    const observer = new MutationObserver(() => {
        void main();
    });
    const target = document.body;
    const options = {
        attributes: true,
        attributeFilter: ['style'],
    };
    observer.observe(target, options);
}
catch (error) {
    console.error(error);
}
GM_addStyle(`
[href="/home"][role="link"]:not([data-testid="AppTabBar_Home_Link"]) {
	opacity: 0;
}
`);

})();

/******/ })()
;