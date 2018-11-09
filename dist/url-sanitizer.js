// ==UserScript==
// @namespace    https://www.sapphire.sh/
// @author       sapphire
// @downloadURL  https://raw.githubusercontent.com/sapphiredev/UserScripts/master/dist/url-sanitizer.js
// @version      1541791678651
// @name         url sanitizer
// @description  url sanitizer
// @match        http://www.toranoana.jp/*
// @match        https://www.toranoana.jp/*
// @match        https://www.melonbooks.co.jp/*
// @match        https://www.pixiv.net/*
// @match        https://twitter.com/*
// @grant        none
// ==UserScript==
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/url-sanitizer.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/url-sanitizer.ts":
/*!**************************************!*\
  !*** ./src/scripts/url-sanitizer.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isWebsiteKey(key) {
    if (key === 'pixiv') {
        return true;
    }
    if (key === 'twitter') {
        return true;
    }
    if (key === 'melonbooks') {
        return true;
    }
    if (key === 'toranoana') {
        return true;
    }
    return false;
}
function getSanitizedURL(key, match) {
    if (key === 'twitter') {
        const screenName = match[1];
        const tweetID = match[2];
        return `https://twitter.com/${screenName}/status/${tweetID}`;
    }
    const baseURL = match[1];
    const originalQuery = match[2].split('&').map((e) => {
        const x = e.split('=');
        return {
            [x[0]]: x[1],
        };
    }).reduce((a, b) => {
        return Object.assign(a, b);
    });
    let query = '';
    switch (key) {
        case 'pixiv':
            query = `?${Object.keys(originalQuery).map((e) => {
                return `${e}=${originalQuery[e]}`;
            }).join('&')}`;
            break;
        case 'melonbooks':
            query = `?product_id=${originalQuery.product_id}`;
            break;
    }
    return `${baseURL}${query}`;
}
const regularExpressions = {
    'pixiv': /^(https:\/\/www.pixiv.net\/member_illust.php)\?(.+)#?/,
    'toranoana': /^(https?:\/\/www.toranoana.jp\/mailorder\/article\/.+)\?(.+)#?/,
    'melonbooks': /^(https:\/\/www.melonbooks.co.jp\/detail\/detail.php)\?(.+)#?/,
    'twitter': /^https:\/\/twitter.com\/(.+)\/status\/(.+)\/(.+)\/1$/,
};
(() => {
    for (const key in regularExpressions) {
        if (isWebsiteKey(key)) {
            const regularExpression = regularExpressions[key];
            const match = window.location.href.match(regularExpression);
            if (match === null) {
                continue;
            }
            const url = getSanitizedURL(key, match);
            if (url === null) {
                continue;
            }
            window.history.pushState(window.location.href, '', url);
        }
    }
})();


/***/ })

/******/ });