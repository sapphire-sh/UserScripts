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
// @version      1777125248681
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

/***/ }),

/***/ "./src/scripts/twitter-original-image-downloader.ts":
/*!**********************************************************!*\
  !*** ./src/scripts/twitter-original-image-downloader.ts ***!
  \**********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sapphire_sh_utils_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sapphire-sh/utils/browser */ "./node_modules/@sapphire-sh/utils/lib/browser.js");

const TWEET_ID_PATTERN = /status\/(\d+)\/?/;
const IMAGE_FORMAT_PATTERN = /\.(\w+):large$/;
const INJECTED_ATTR = 'data-dl-injected';
const VIDEO_INJECTED_ATTR = 'data-video-injected';
const BUTTON_WRAPPER_ATTR = 'data-dl-buttons';
const videoUrlMap = new Map();
const RESOLUTION_PATTERN = /\/(\d+)x(\d+)\//;
const resolveResolution = (url, fallbackWidth, fallbackHeight) => {
    const match = RESOLUTION_PATTERN.exec(url);
    if (match !== null) {
        const w = Number(match[1]);
        const h = Number(match[2]);
        return { label: `${w}x${h}`, pixels: w * h };
    }
    if (fallbackWidth > 0 && fallbackHeight > 0) {
        return { label: `${fallbackWidth}x${fallbackHeight}`, pixels: fallbackWidth * fallbackHeight };
    }
    return { label: 'video', pixels: 0 };
};
const isRecord = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);
const extractVideoUrls = (obj) => {
    if (Array.isArray(obj)) {
        for (const item of obj) {
            extractVideoUrls(item);
        }
        return;
    }
    if (!isRecord(obj)) {
        return;
    }
    if (typeof obj.rest_id === 'string' &&
        isRecord(obj.legacy) &&
        isRecord(obj.legacy.extended_entities) &&
        Array.isArray(obj.legacy.extended_entities.media)) {
        for (const media of obj.legacy.extended_entities.media) {
            if (isRecord(media) &&
                (media.type === 'video' || media.type === 'animated_gif') &&
                isRecord(media.video_info) &&
                Array.isArray(media.video_info.variants)) {
                const mp4Variants = media.video_info.variants.filter((v) => isRecord(v) && v.content_type === 'video/mp4');
                let fallbackWidth = 0;
                let fallbackHeight = 0;
                if (isRecord(media.original_info) &&
                    typeof media.original_info.width === 'number' &&
                    typeof media.original_info.height === 'number') {
                    fallbackWidth = media.original_info.width;
                    fallbackHeight = media.original_info.height;
                }
                const entries = videoUrlMap.get(obj.rest_id) ?? [];
                for (const variant of mp4Variants) {
                    if (typeof variant.url !== 'string') {
                        continue;
                    }
                    if (entries.some((e) => e.url === variant.url)) {
                        continue;
                    }
                    const { label, pixels } = resolveResolution(variant.url, fallbackWidth, fallbackHeight);
                    entries.push({ url: variant.url, label, pixels });
                }
                entries.sort((a, b) => b.pixels - a.pixels);
                videoUrlMap.set(obj.rest_id, entries);
            }
        }
    }
    for (const value of Object.values(obj)) {
        extractVideoUrls(value);
    }
};
const getTweetIdFromArticle = (article) => {
    const timeEl = article.querySelector('a[href*="/status/"] time');
    if (!timeEl) {
        return null;
    }
    const anchor = timeEl.closest('a');
    if (!anchor) {
        return null;
    }
    const match = TWEET_ID_PATTERN.exec(anchor.href);
    return match ? match[1] : null;
};
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
        const match = new RegExp(TWEET_ID_PATTERN).exec(linkEl.href);
        if (!match) {
            return;
        }
        const [, tweetId] = match;
        window.open(`http://acrux:9001/tweet/${tweetId}`, '_blank');
    };
    return button;
};
const createVideoButton = (entry) => {
    const button = document.createElement('button');
    button.textContent = entry.label;
    button.onclick = () => window.open(entry.url, '_blank');
    return button;
};
const _getFormat = async () => {
    const el = await (0,_sapphire_sh_utils_browser__WEBPACK_IMPORTED_MODULE_0__.waitForElement)('[property="og:image"]');
    if (el === null) {
        console.error('waitForElement: og:image not found');
        return;
    }
    if (!(el instanceof HTMLMetaElement)) {
        return;
    }
    const match = new RegExp(IMAGE_FORMAT_PATTERN).exec(el.content);
    if (!match) {
        return;
    }
    return match[1];
};
const createHandler = (images) => async () => {
    for (const { src } of images) {
        const url = src.replace(/name=\w+$/, 'name=orig');
        open(url);
    }
};
const getArticles = async () => {
    const articles = await (0,_sapphire_sh_utils_browser__WEBPACK_IMPORTED_MODULE_0__.waitForElements)(['article', '[data-testid="error-detail"]']);
    return articles?.filter((article) => {
        const e = article.querySelector('article div[role="group"]');
        return e !== null;
    });
};
const getImages = async (article) => {
    const images = await (0,_sapphire_sh_utils_browser__WEBPACK_IMPORTED_MODULE_0__.waitForElements)('div[data-testid="tweetPhoto"] img', {
        parent: article,
    });
    return images;
};
const injectVideoButtons = () => {
    const articles = Array.from(document.querySelectorAll('article'));
    for (const article of articles) {
        if (article.hasAttribute(VIDEO_INJECTED_ATTR)) {
            continue;
        }
        const tweetId = getTweetIdFromArticle(article);
        if (tweetId === null) {
            continue;
        }
        const videoEntries = videoUrlMap.get(tweetId);
        if (videoEntries === undefined || videoEntries.length === 0) {
            continue;
        }
        const existing = article.querySelector(`[${BUTTON_WRAPPER_ATTR}]`);
        if (existing) {
            for (const entry of videoEntries) {
                existing.appendChild(createVideoButton(entry));
            }
        }
        else {
            const wrapper = document.createElement('div');
            wrapper.setAttribute(BUTTON_WRAPPER_ATTR, '');
            Object.assign(wrapper.style, {
                position: 'absolute',
                top: '8px',
                right: '64px',
            });
            wrapper.appendChild(createLinkButton());
            for (const entry of videoEntries) {
                wrapper.appendChild(createVideoButton(entry));
            }
            article.appendChild(wrapper);
            article.setAttribute(INJECTED_ATTR, '');
        }
        article.setAttribute(VIDEO_INJECTED_ATTR, '');
    }
};
(0,_sapphire_sh_utils_browser__WEBPACK_IMPORTED_MODULE_0__.interceptXHR)(/\/graphql\//, (xhr) => {
    try {
        const data = JSON.parse(xhr.responseText);
        extractVideoUrls(data);
        injectVideoButtons();
    }
    catch {
        // ignore parse errors
    }
});
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
        if (article.hasAttribute(INJECTED_ATTR)) {
            continue;
        }
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
        buttonWrapperEl.setAttribute(BUTTON_WRAPPER_ATTR, '');
        Object.assign(buttonWrapperEl.style, {
            position: 'absolute',
            top: '8px',
            right: '64px',
        });
        buttonWrapperEl.appendChild(linkButton);
        buttonWrapperEl.appendChild(downloadButton);
        const tweetId = getTweetIdFromArticle(article);
        const videoEntries = tweetId === null ? undefined : videoUrlMap.get(tweetId);
        if (videoEntries !== undefined && videoEntries.length > 0) {
            for (const entry of videoEntries) {
                buttonWrapperEl.appendChild(createVideoButton(entry));
            }
            article.setAttribute(VIDEO_INJECTED_ATTR, '');
        }
        article.appendChild(buttonWrapperEl);
        article.setAttribute(INJECTED_ATTR, '');
    }
};
const LOCATION_CHANGE_EVENT = 'locationchange';
const patchHistory = () => {
    const dispatch = () => window.dispatchEvent(new Event(LOCATION_CHANGE_EVENT));
    const originalPushState = history.pushState.bind(history);
    const originalReplaceState = history.replaceState.bind(history);
    history.pushState = (...args) => {
        originalPushState(...args);
        dispatch();
    };
    history.replaceState = (...args) => {
        originalReplaceState(...args);
        dispatch();
    };
    window.addEventListener('popstate', dispatch);
};
patchHistory();
try {
    await main();
}
catch (error) {
    console.error(error);
}
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        void main();
    }
});
window.addEventListener(LOCATION_CHANGE_EVENT, () => {
    void main();
});

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/twitter-original-image-downloader.ts");
/******/ 	
/******/ })()
;