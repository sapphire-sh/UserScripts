// ==UserScript==
// @name         pixiv title sanitizer
// @namespace    https://www.sapphire.sh/
// @description  pixiv title sanitizer
// @match        https://www.pixiv.net/*
// @grant        none
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/pixiv-title-sanitizer.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/pixiv-title-sanitizer.user.js
// @version      1775414673863
// ==/UserScript==
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/* harmony export */   LogLevel: () => (/* reexport safe */ _logger_js__WEBPACK_IMPORTED_MODULE_6__.LogLevel),
/* harmony export */   Queue: () => (/* reexport safe */ _queue_js__WEBPACK_IMPORTED_MODULE_8__.Queue),
/* harmony export */   escapeHtml: () => (/* reexport safe */ _string_js__WEBPACK_IMPORTED_MODULE_10__.escapeHtml),
/* harmony export */   fetchWithRetry: () => (/* reexport safe */ _http_js__WEBPACK_IMPORTED_MODULE_3__.fetchWithRetry),
/* harmony export */   formatDuration: () => (/* reexport safe */ _date_js__WEBPACK_IMPORTED_MODULE_0__.formatDuration),
/* harmony export */   getEnumValue: () => (/* reexport safe */ _getEnumValue_js__WEBPACK_IMPORTED_MODULE_2__.getEnumValue),
/* harmony export */   interceptXHR: () => (/* reexport safe */ _interceptXHR_js__WEBPACK_IMPORTED_MODULE_4__.interceptXHR),
/* harmony export */   isNonNullable: () => (/* reexport safe */ _isNonNullable_js__WEBPACK_IMPORTED_MODULE_5__.isNonNullable),
/* harmony export */   logger: () => (/* reexport safe */ _logger_js__WEBPACK_IMPORTED_MODULE_6__.logger),
/* harmony export */   notifyMattermost: () => (/* reexport safe */ _notify_js__WEBPACK_IMPORTED_MODULE_7__.notifyMattermost),
/* harmony export */   notifySlack: () => (/* reexport safe */ _notify_js__WEBPACK_IMPORTED_MODULE_7__.notifySlack),
/* harmony export */   serializeError: () => (/* reexport safe */ _error_js__WEBPACK_IMPORTED_MODULE_1__.serializeError),
/* harmony export */   sleep: () => (/* reexport safe */ _sleep_js__WEBPACK_IMPORTED_MODULE_9__.sleep),
/* harmony export */   throttle: () => (/* reexport safe */ _throttle_js__WEBPACK_IMPORTED_MODULE_11__.throttle),
/* harmony export */   toLocalISOString: () => (/* reexport safe */ _date_js__WEBPACK_IMPORTED_MODULE_0__.toLocalISOString),
/* harmony export */   waitForElement: () => (/* reexport safe */ _waitForElement_js__WEBPACK_IMPORTED_MODULE_12__.waitForElement),
/* harmony export */   waitForElements: () => (/* reexport safe */ _waitForElement_js__WEBPACK_IMPORTED_MODULE_12__.waitForElements)
/* harmony export */ });
/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./date.js */ "./node_modules/@sapphire-sh/utils/lib/date.js");
/* harmony import */ var _error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error.js */ "./node_modules/@sapphire-sh/utils/lib/error.js");
/* harmony import */ var _getEnumValue_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getEnumValue.js */ "./node_modules/@sapphire-sh/utils/lib/getEnumValue.js");
/* harmony import */ var _http_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./http.js */ "./node_modules/@sapphire-sh/utils/lib/http.js");
/* harmony import */ var _interceptXHR_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./interceptXHR.js */ "./node_modules/@sapphire-sh/utils/lib/interceptXHR.js");
/* harmony import */ var _isNonNullable_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./isNonNullable.js */ "./node_modules/@sapphire-sh/utils/lib/isNonNullable.js");
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./logger.js */ "./node_modules/@sapphire-sh/utils/lib/logger.js");
/* harmony import */ var _notify_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./notify.js */ "./node_modules/@sapphire-sh/utils/lib/notify.js");
/* harmony import */ var _queue_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./queue.js */ "./node_modules/@sapphire-sh/utils/lib/queue.js");
/* harmony import */ var _sleep_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./sleep.js */ "./node_modules/@sapphire-sh/utils/lib/sleep.js");
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./string.js */ "./node_modules/@sapphire-sh/utils/lib/string.js");
/* harmony import */ var _throttle_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./throttle.js */ "./node_modules/@sapphire-sh/utils/lib/throttle.js");
/* harmony import */ var _waitForElement_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./waitForElement.js */ "./node_modules/@sapphire-sh/utils/lib/waitForElement.js");













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

/***/ }),

/***/ "./src/scripts/pixiv-title-sanitizer.ts":
/*!**********************************************!*\
  !*** ./src/scripts/pixiv-title-sanitizer.ts ***!
  \**********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sapphire_sh_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sapphire-sh/utils */ "./node_modules/@sapphire-sh/utils/lib/index.js");

const getTitle = async () => {
    const el = await (0,_sapphire_sh_utils__WEBPACK_IMPORTED_MODULE_0__.waitForElement)('figcaption h1');
    if (el === null) {
        console.error('waitForElement: figcaption h1 not found');
        return null;
    }
    return el.innerText;
};
const getAuthor = async () => {
    const el = await (0,_sapphire_sh_utils__WEBPACK_IMPORTED_MODULE_0__.waitForElement)('a[href^="/users/"] + div > a');
    if (el === null) {
        console.error('waitForElement: author link not found');
        return null;
    }
    return el.innerText;
};
const main = async () => {
    const title = await getTitle();
    const author = await getAuthor();
    if (title === null || author === null) {
        return;
    }
    document.title = `${author} - ${title}`;
};
try {
    await main();
}
catch (error) {
    console.error(error);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

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
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/pixiv-title-sanitizer.ts");
/******/ 	
/******/ })()
;