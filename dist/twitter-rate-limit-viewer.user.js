// ==UserScript==
// @name         twitter rate limit viewer
// @namespace    https://www.sapphire.sh/
// @description  display current rate limit status
// @match        https://twitter.com/*
// @match        https://mobile.twitter.com/*
// @match        https://x.com/*
// @match        https://mobile.x.com/*
// @grant        none
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-rate-limit-viewer.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-rate-limit-viewer.user.js
// @version      1786946227978
// ==/UserScript==
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@sapphire-sh/utils/lib/date.js"
/*!*****************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/date.js ***!
  \*****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

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

/***/ },

/***/ "./node_modules/@sapphire-sh/utils/lib/error.js"
/*!******************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/error.js ***!
  \******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   serializeError: () => (/* binding */ serializeError)
/* harmony export */ });
const serializeError = (error) => JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error)));
//# sourceMappingURL=error.js.map

/***/ },

/***/ "./node_modules/@sapphire-sh/utils/lib/getEnumValue.js"
/*!*************************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/getEnumValue.js ***!
  \*************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getEnumValue: () => (/* binding */ getEnumValue)
/* harmony export */ });
const getEnumValue = (value) => {
    const enumValues = Object.values(value);
    return (input) => enumValues.find((e) => e === input) ?? null;
};
//# sourceMappingURL=getEnumValue.js.map

/***/ },

/***/ "./node_modules/@sapphire-sh/utils/lib/http.js"
/*!*****************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/http.js ***!
  \*****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

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

/***/ },

/***/ "./node_modules/@sapphire-sh/utils/lib/index.js"
/*!******************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/index.js ***!
  \******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

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

/***/ },

/***/ "./node_modules/@sapphire-sh/utils/lib/isNonNullable.js"
/*!**************************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/isNonNullable.js ***!
  \**************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

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

/***/ },

/***/ "./node_modules/@sapphire-sh/utils/lib/logger.js"
/*!*******************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/logger.js ***!
  \*******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

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

/***/ },

/***/ "./node_modules/@sapphire-sh/utils/lib/notify.js"
/*!*******************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/notify.js ***!
  \*******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

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

/***/ },

/***/ "./node_modules/@sapphire-sh/utils/lib/queue.js"
/*!******************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/queue.js ***!
  \******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

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

/***/ },

/***/ "./node_modules/@sapphire-sh/utils/lib/sleep.js"
/*!******************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/sleep.js ***!
  \******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sleep: () => (/* binding */ sleep)
/* harmony export */ });
const sleep = async (ms, jitter = 0) => {
    const delay = ms + Math.random() * jitter;
    return new Promise((resolve) => globalThis.setTimeout(resolve, delay));
};
//# sourceMappingURL=sleep.js.map

/***/ },

/***/ "./node_modules/@sapphire-sh/utils/lib/string.js"
/*!*******************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/string.js ***!
  \*******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

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

/***/ },

/***/ "./node_modules/@sapphire-sh/utils/lib/throttle.js"
/*!*********************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/throttle.js ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

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

/***/ }

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
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
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
/*!**************************************************!*\
  !*** ./src/scripts/twitter-rate-limit-viewer.ts ***!
  \**************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sapphire_sh_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sapphire-sh/utils */ "./node_modules/@sapphire-sh/utils/lib/index.js");

const DISPLAY_ID = 'rate-limit-viewer';
const DISPLAY_POSITION_KEY = `${DISPLAY_ID}-position`;
const statusTable = {};
const handleStatus = (status) => {
    // console.log('status', status);
    statusTable[status.url] = status;
};
const FONT_FAMILY = '"TwitterChirp",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';
let dragging = false;
let offsetX = 0;
let offsetY = 0;
const attachDisplay = async () => {
    const el = document.createElement('div');
    el.id = DISPLAY_ID;
    const prevPosition = window.localStorage.getItem(DISPLAY_POSITION_KEY)?.split(',');
    Object.assign(el.style, {
        position: 'fixed',
        padding: '0 8px',
        top: prevPosition ? `${prevPosition[1]}px` : '60vh',
        left: prevPosition ? `${prevPosition[0]}px` : '70vw',
        fontFamily: FONT_FAMILY,
        fontSize: 'small',
        backgroundColor: '#ffffff',
        whiteSpace: 'nowrap',
        border: '1px solid #000000',
        borderRadius: '8px',
        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
        visibility: 'hidden',
    });
    el.addEventListener('mousedown', (event) => {
        const rect = el.getBoundingClientRect();
        offsetX = rect.left - event.clientX;
        offsetY = rect.top - event.clientY;
        dragging = true;
    });
    window.addEventListener('mousemove', (event) => {
        if (!dragging) {
            return;
        }
        if (!(event.target instanceof HTMLElement)) {
            return;
        }
        const x = event.clientX + offsetX;
        const y = event.clientY + offsetY;
        Object.assign(el.style, {
            top: `${y}px`,
            left: `${x}px`,
        });
    });
    window.addEventListener('mouseup', (event) => {
        if (!dragging) {
            return;
        }
        dragging = false;
        if (!(event.target instanceof HTMLElement)) {
            return;
        }
        const rect = el.getBoundingClientRect();
        const x = Math.max(0, Math.min(event.clientX + offsetX, window.innerWidth - rect.width));
        const y = Math.max(0, Math.min(event.clientY + offsetY, window.innerHeight - rect.height));
        Object.assign(el.style, {
            top: `${y}px`,
            left: `${x}px`,
        });
        window.localStorage.setItem(DISPLAY_POSITION_KEY, `${x},${y}`);
    });
    document.body.appendChild(el);
    return el;
};
const TIME_UNITS = [
    { amount: 60, name: 'seconds' },
    { amount: 60, name: 'minutes' },
    { amount: 24, name: 'hours' },
    { amount: 7, name: 'days' },
    { amount: 30 / 7, name: 'weeks' },
    { amount: 12, name: 'months' },
    { amount: Infinity, name: 'years' },
];
const RELATIVE_TIME_FORMATTER = new Intl.RelativeTimeFormat('en-US', { numeric: 'auto' });
const formatTime = (a, b) => {
    let diff = (a - b) / 1000;
    for (const unit of TIME_UNITS) {
        if (Math.abs(diff) < unit.amount) {
            return RELATIVE_TIME_FORMATTER.format(Math.round(diff), unit.name);
        }
        diff /= unit.amount;
    }
};
const getColor = (a, b) => {
    const ratio = a / b;
    if (ratio > 0.5) {
        return '#1f7f3f';
    }
    if (ratio > 0.3) {
        return '#ffbf00';
    }
    return '#ff3f3f';
};
const renderedHtml = new WeakMap();
const updateDisplay = (el) => {
    if (dragging) {
        return;
    }
    let htmlStr = '';
    const now = Date.now();
    const statuses = Object.values(statusTable).sort((a, b) => {
        const p = a.url.includes('/graphql/');
        const q = b.url.includes('/graphql/');
        return Number(q) - Number(p) || a.url.localeCompare(b.url);
    });
    for (const status of statuses) {
        const { url, rateLimitLimit, rateLimitRemaining, rateLimitReset, updatedAt } = status;
        const updatedTime = formatTime(updatedAt, now);
        const resetTime = formatTime(rateLimitReset * 1000, now);
        const reset = rateLimitReset * 1000 <= now;
        const color = getColor(rateLimitRemaining, rateLimitLimit);
        htmlStr += [
            `<div style="margin: 8px 0; ${reset ? 'opacity: 0.3;' : ''}">`,
            `<p style="margin: 0;"><span style="color: ${color};">[${rateLimitRemaining} / ${rateLimitLimit}]</span> ${url}</p>`,
            `<p style="margin: 0;">updated ${updatedTime}${reset ? '' : ` / reset ${resetTime}`}</p>`,
            '</div>',
        ].join('\n');
    }
    if (renderedHtml.get(el) === htmlStr) {
        return;
    }
    renderedHtml.set(el, htmlStr);
    el.innerHTML = htmlStr;
    if (htmlStr) {
        el.style.visibility = '';
    }
};
const REGEX_GRAPHQL_URL = /^\/i\/api\/graphql\/(.+?)\/(.+?)$/;
const main = async () => {
    const XHR = window.XMLHttpRequest;
    // @ts-expect-error XMLHttpRequest constructor override
    window.XMLHttpRequest = () => {
        const xhr = new XHR();
        const handleReadyStateChange = () => {
            if (xhr.readyState !== 4) {
                return;
            }
            if (!(xhr.responseURL.includes('twitter.com') || xhr.responseURL.includes('x.com'))) {
                return;
            }
            const getHeaderValue = (name) => {
                const value = xhr.getResponseHeader(name);
                if (value === null || value === '') {
                    return;
                }
                return Number.parseInt(value, 10);
            };
            const rateLimitLimit = getHeaderValue('x-rate-limit-limit');
            if (rateLimitLimit === undefined) {
                return;
            }
            const rateLimitRemaining = getHeaderValue('x-rate-limit-remaining');
            if (rateLimitRemaining === undefined) {
                return;
            }
            const rateLimitReset = getHeaderValue('x-rate-limit-reset');
            if (rateLimitReset === undefined) {
                return;
            }
            const getUrl = (value) => {
                const url = new URL(value);
                const match = url.pathname.match(REGEX_GRAPHQL_URL);
                if (!match) {
                    return url.pathname;
                }
                if (!match[1] || !match[2]) {
                    return url.pathname;
                }
                return `/i/api/graphql/${match[1].slice(0, 1)}…${match[1].slice(-1)}/${match[2]}`;
            };
            const url = getUrl(xhr.responseURL);
            handleStatus({
                url,
                rateLimitLimit,
                rateLimitRemaining,
                rateLimitReset,
                updatedAt: Date.now(),
            });
        };
        xhr.addEventListener('readystatechange', handleReadyStateChange, false);
        return xhr;
    };
    const getDisplay = async () => {
        const el = document.getElementById(DISPLAY_ID);
        if (el) {
            return el;
        }
        return attachDisplay();
    };
    for (;;) {
        const displayEl = await getDisplay();
        updateDisplay(displayEl);
        await (0,_sapphire_sh_utils__WEBPACK_IMPORTED_MODULE_0__.sleep)(1000);
    }
};
void (async () => {
    try {
        await main();
        console.info('please contact https://twitter.com/sapphire_dev for any questions and/or comments');
    }
    catch (error) {
        console.error(error);
    }
})();

})();

/******/ })()
;