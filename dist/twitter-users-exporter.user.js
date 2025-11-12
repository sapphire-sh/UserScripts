// ==UserScript==
// @name         twitter users exporter
// @namespace    https://www.sapphire.sh/
// @description  export twitter users
// @match        https://twitter.com/*
// @match        https://mobile.twitter.com/*
// @match        https://x.com/*
// @match        https://mobile.x.com/*
// @grant        none
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-users-exporter.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-users-exporter.user.js
// @version      1762954827361
// ==/UserScript==
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@sapphire-sh/utils/lib/getEnumValue.js":
/*!*************************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/getEnumValue.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getEnumValue = void 0;
const getEnumValue = (value) => {
    const enumValues = Object.values(value);
    return (value) => (enumValues.includes(value) ? value : null);
};
exports.getEnumValue = getEnumValue;


/***/ }),

/***/ "./node_modules/@sapphire-sh/utils/lib/index.js":
/*!******************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.throttle = exports.sleep = exports.Queue = exports.isNonNullable = exports.getEnumValue = void 0;
var getEnumValue_1 = __webpack_require__(/*! ./getEnumValue */ "./node_modules/@sapphire-sh/utils/lib/getEnumValue.js");
Object.defineProperty(exports, "getEnumValue", ({ enumerable: true, get: function () { return getEnumValue_1.getEnumValue; } }));
var isNonNullable_1 = __webpack_require__(/*! ./isNonNullable */ "./node_modules/@sapphire-sh/utils/lib/isNonNullable.js");
Object.defineProperty(exports, "isNonNullable", ({ enumerable: true, get: function () { return isNonNullable_1.isNonNullable; } }));
var queue_1 = __webpack_require__(/*! ./queue */ "./node_modules/@sapphire-sh/utils/lib/queue.js");
Object.defineProperty(exports, "Queue", ({ enumerable: true, get: function () { return queue_1.Queue; } }));
var sleep_1 = __webpack_require__(/*! ./sleep */ "./node_modules/@sapphire-sh/utils/lib/sleep.js");
Object.defineProperty(exports, "sleep", ({ enumerable: true, get: function () { return sleep_1.sleep; } }));
var throttle_1 = __webpack_require__(/*! ./throttle */ "./node_modules/@sapphire-sh/utils/lib/throttle.js");
Object.defineProperty(exports, "throttle", ({ enumerable: true, get: function () { return throttle_1.throttle; } }));


/***/ }),

/***/ "./node_modules/@sapphire-sh/utils/lib/isNonNullable.js":
/*!**************************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/isNonNullable.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isNonNullable = void 0;
const isNonNullable = (value) => {
    if (value === null) {
        return false;
    }
    if (value === undefined) {
        return false;
    }
    return true;
};
exports.isNonNullable = isNonNullable;


/***/ }),

/***/ "./node_modules/@sapphire-sh/utils/lib/queue.js":
/*!******************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/queue.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Queue = void 0;
class QueueNode {
    constructor(value) {
        this.value = value;
        this._next = null;
    }
    get next() {
        return this._next;
    }
    setNext(newNode) {
        this._next = newNode;
    }
}
class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this._size = 0;
    }
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
        const value = this.head.value;
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
            if (!value) {
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
        var _a;
        return (_a = this.head) === null || _a === void 0 ? void 0 : _a.value;
    }
    has(value) {
        let node = this.head;
        while (node !== null) {
            if (typeof value === 'function') {
                if (value(node.value)) {
                    return true;
                }
            }
            else {
                if (node.value === value) {
                    return true;
                }
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
exports.Queue = Queue;


/***/ }),

/***/ "./node_modules/@sapphire-sh/utils/lib/sleep.js":
/*!******************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/sleep.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sleep = void 0;
const sleep = (ms) => {
    return new Promise((resolve) => globalThis.setTimeout(resolve, ms));
};
exports.sleep = sleep;


/***/ }),

/***/ "./node_modules/@sapphire-sh/utils/lib/throttle.js":
/*!*********************************************************!*\
  !*** ./node_modules/@sapphire-sh/utils/lib/throttle.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.throttle = void 0;
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
exports.throttle = throttle;


/***/ }),

/***/ "./src/helpers/index.ts":
/*!******************************!*\
  !*** ./src/helpers/index.ts ***!
  \******************************/
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

/***/ "./src/scripts/twitter-users-exporter.ts":
/*!***********************************************!*\
  !*** ./src/scripts/twitter-users-exporter.ts ***!
  \***********************************************/
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
const isTimelineAddEntriesInstruction = (instruction) => {
    return instruction.type === 'TimelineAddEntries';
};
const isTimelineTimelineItem = (entry) => {
    return entry.entryType === 'TimelineTimelineItem';
};
const userTable = {};
const handlePayload = (id, { data }) => {
    if (!data) {
        return;
    }
    const getInstructions = () => {
        var _a, _b, _c;
        if ('user' in data) {
            return (_b = (_a = data.user.result) === null || _a === void 0 ? void 0 : _a.timeline.timeline.instructions) !== null && _b !== void 0 ? _b : [];
        }
        if ('list' in data) {
            return (_c = data.list.members_timeline.timeline.instructions) !== null && _c !== void 0 ? _c : [];
        }
        return [];
    };
    const instructions = getInstructions();
    const users = instructions
        .filter(isTimelineAddEntriesInstruction)
        .flatMap((instruction) => instruction.entries
        .map((entry) => entry.content)
        .filter(isTimelineTimelineItem)
        .map((entry) => {
        if (!('result' in entry.itemContent.user_results)) {
            return null;
        }
        return entry.itemContent.user_results.result;
    })
        .filter(helpers_1.isNotNullable)
        .map((result) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        if (result.__typename === 'UserUnavailable') {
            return null;
        }
        return {
            id: result.rest_id,
            name: (_d = (_b = (_a = result.legacy) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : (_c = result.core) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : '',
            screenName: (_h = (_f = (_e = result.legacy) === null || _e === void 0 ? void 0 : _e.screen_name) !== null && _f !== void 0 ? _f : (_g = result.core) === null || _g === void 0 ? void 0 : _g.screen_name) !== null && _h !== void 0 ? _h : '',
            profileImageUrl: (_m = (_k = (_j = result.legacy) === null || _j === void 0 ? void 0 : _j.profile_image_url_https) !== null && _k !== void 0 ? _k : (_l = result.avatar) === null || _l === void 0 ? void 0 : _l.image_url) !== null && _m !== void 0 ? _m : '',
        };
    })
        .filter(helpers_1.isNotNullable));
    if (!userTable[id]) {
        userTable[id] = [];
    }
    userTable[id].push(...users);
    if (instructions.find((instruction) => instruction.type === 'TimelineTerminateTimeline' &&
        instruction.direction === 'Bottom')) {
        exportUsers(id);
    }
};
const getFilename = (id) => {
    const now = Date.now();
    const tokens = ['following_', 'followers_'];
    if (tokens.some((token) => id.startsWith(token))) {
        return `${id}_${now}.json`;
    }
    return `${id}.json`;
};
const exportUsers = (id) => {
    const users = userTable[id];
    if (!users) {
        return;
    }
    users.sort((a, b) => {
        if (a.id.length === b.id.length) {
            return a.id.localeCompare(b.id);
        }
        return a.id.length > b.id.length ? 1 : -1;
    });
    const data = {
        id,
        length: users.length,
        users,
    };
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}\n`;
    const el = document.createElement('a');
    el.href = dataStr;
    el.download = getFilename(id);
    el.click();
};
var ResponseType;
(function (ResponseType) {
    ResponseType["FOLLOWERS"] = "/Followers";
    ResponseType["FOLLOWING"] = "/Following";
    ResponseType["LIST_MEMBERS"] = "/ListMembers";
})(ResponseType || (ResponseType = {}));
const shouldExport = (responseUrl) => {
    for (const responseType of Object.values(ResponseType)) {
        if (responseUrl.includes(responseType)) {
            return true;
        }
    }
    return false;
};
const getId = (responseUrl) => {
    const url = new URL(responseUrl);
    const search = new URLSearchParams(url.search);
    const variables = search.get('variables');
    if (!variables) {
        return null;
    }
    const { listId, userId } = JSON.parse(variables);
    if (responseUrl.includes('/Following')) {
        return `following_${userId}`;
    }
    if (responseUrl.includes('/Followers')) {
        return `followers_${userId}`;
    }
    return listId;
};
const main = () => {
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
            if (!shouldExport(xhr.responseURL)) {
                return;
            }
            const id = getId(xhr.responseURL);
            if (!id) {
                console.log(`cannot find id: ${xhr.responseURL}`);
                return;
            }
            const response = JSON.parse(xhr.response);
            handlePayload(id, response);
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/twitter-users-exporter.ts");
/******/ 	
/******/ })()
;