// ==UserScript==
// @name         twitter users exporter
// @namespace    https://www.sapphire.sh/
// @description  export twitter users
// @match        https://twitter.com/*
// @match        https://mobile.twitter.com/*
// @grant        none
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-users-exporter.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-users-exporter.user.js
// @version      1709479447180
// ==/UserScript==
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/twitter-users-exporter.ts":
/*!***********************************************!*\
  !*** ./src/scripts/twitter-users-exporter.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports) {


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
        .map((entry) => ({
        id: entry.itemContent.user_results.result.rest_id,
        name: entry.itemContent.user_results.result.legacy.name,
        screenName: entry.itemContent.user_results.result.legacy.screen_name,
        profileImageUrl: entry.itemContent.user_results.result.legacy
            .profile_image_url_https,
    })));
    if (!userTable[id]) {
        userTable[id] = [];
    }
    userTable[id].push(...users);
    if (instructions.find((instruction) => instruction.type === 'TimelineTerminateTimeline' &&
        instruction.direction === 'Bottom')) {
        exportUsers(id);
    }
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
    el.download = `${id}.json`;
    el.click();
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
            const tokens = ['/Following', '/ListMembers'];
            if (tokens.every((token) => !xhr.responseURL.includes(token))) {
                return;
            }
            const getId = () => {
                if (xhr.responseURL.includes('/Following')) {
                    return 'following';
                }
                const url = new URL(xhr.responseURL);
                const search = new URLSearchParams(url.search);
                const variables = search.get('variables');
                if (!variables) {
                    return;
                }
                return JSON.parse(variables).listId;
            };
            const id = getId();
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/scripts/twitter-users-exporter.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;