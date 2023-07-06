// ==UserScript==
// @name         bluesky shortcuts
// @description  keyboard shortcuts for bluesky
// @match        https://bsky.app/*
// @grant        GM_addStyle
// @namespace    https://www.sapphire.sh/
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/bluesky-shortcuts.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/bluesky-shortcuts.user.js
// @version      1688676553661
// ==/UserScript==
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
/*!******************************************!*\
  !*** ./src/scripts/bluesky-shortcuts.ts ***!
  \******************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const keys = [
    'Slash',
    'Period',
    'Space',
    'Escape',
    'Comma',
    'KeyH',
    'KeyS',
    'KeyF',
    'KeyN',
    'KeyM',
    'KeyP',
    'KeyE',
];
const MODAL_ID = 'shortcuts-modal';
const getElement = (selector) => {
    const element = document.querySelector(selector);
    if (!element || !(element instanceof HTMLElement)) {
        return;
    }
    return element;
};
const handleClickSlash = (keys) => {
    if (keys.shiftKey) {
        const modalEl = getElement(`#${MODAL_ID}`);
        if (!modalEl) {
            return;
        }
        Object.assign(modalEl.style, {
            opacity: '1',
            pointerEvents: 'initial',
        });
    }
};
const handleClickPeriod = () => {
    const feedEl = getElement('[data-testid="followingFeedPage-feed-flatlist"]');
    feedEl === null || feedEl === void 0 ? void 0 : feedEl.scrollTo(0, 0);
    const newPostsButtonEl = getElement('[aria-label="Load new posts"]');
    newPostsButtonEl === null || newPostsButtonEl === void 0 ? void 0 : newPostsButtonEl.click();
    const notificationsEl = getElement('[data-testid="notifsFeed"]');
    notificationsEl === null || notificationsEl === void 0 ? void 0 : notificationsEl.scrollTo(0, 0);
    const newNotificationsButtonEl = getElement('[aria-label="Load new notifications"]');
    newNotificationsButtonEl === null || newNotificationsButtonEl === void 0 ? void 0 : newNotificationsButtonEl.click();
};
const handleClickSpace = (keys) => {
    const feedEl = getElement('[data-testid="followingFeedPage-feed-flatlist"]');
    feedEl === null || feedEl === void 0 ? void 0 : feedEl.scrollBy({
        top: (window.screen.height / 2) * (keys.shiftKey ? -1 : 1),
        behavior: 'smooth',
    });
    const notificationsEl = getElement('[data-testid="notifsFeed"]');
    notificationsEl === null || notificationsEl === void 0 ? void 0 : notificationsEl.scrollBy({
        top: (window.screen.height / 2) * (keys.shiftKey ? -1 : 1),
        behavior: 'smooth',
    });
};
const handleClickEscape = () => {
    const modalEl = getElement(`#${MODAL_ID}`);
    if (!modalEl) {
        return;
    }
    Object.assign(modalEl.style, {
        opacity: '0',
        pointerEvents: 'none',
    });
};
const handleClickComma = (keys) => {
    if (keys.metaKey) {
        const el = getElement('[aria-label="Settings"]');
        el === null || el === void 0 ? void 0 : el.click();
    }
};
const handleClickKeyH = (keys) => {
    if (keys.shiftKey) {
        const el = getElement('[aria-label="Home"]');
        el === null || el === void 0 ? void 0 : el.click();
    }
};
const handleClickKeyS = (keys) => {
    if (keys.shiftKey) {
        const el = getElement('[aria-label="Search"]');
        el === null || el === void 0 ? void 0 : el.click();
    }
};
const handleClickKeyF = (keys) => {
    if (keys.shiftKey) {
        const el = getElement('[aria-label="My Feeds"]');
        el === null || el === void 0 ? void 0 : el.click();
    }
};
const handleClickKeyN = (keys) => {
    if (keys.shiftKey) {
        const el = getElement('[aria-label="Notifications"]');
        el === null || el === void 0 ? void 0 : el.click();
    }
    if (!keys.shiftKey) {
        const el = getElement('[aria-label="Compose post"]');
        el === null || el === void 0 ? void 0 : el.click();
    }
};
const handleClickKeyM = (keys) => {
    if (keys.shiftKey) {
        const el = getElement('[aria-label="Moderation"]');
        el === null || el === void 0 ? void 0 : el.click();
    }
};
const handleClickKeyP = (keys) => {
    if (keys.shiftKey) {
        const el = getElement('[aria-label="Profile"]');
        el === null || el === void 0 ? void 0 : el.click();
    }
};
const handleClickKeyE = (keys) => {
    if (keys.shiftKey) {
        const el = getElement('[aria-label="Settings"]');
        el === null || el === void 0 ? void 0 : el.click();
    }
};
const handlerTable = {
    Slash: handleClickSlash,
    Period: handleClickPeriod,
    Space: handleClickSpace,
    Escape: handleClickEscape,
    Comma: handleClickComma,
    KeyH: handleClickKeyH,
    KeyS: handleClickKeyS,
    KeyF: handleClickKeyF,
    KeyN: handleClickKeyN,
    KeyM: handleClickKeyM,
    KeyP: handleClickKeyP,
    KeyE: handleClickKeyE,
};
const descriptionsList = [
    { label: 'Help', keys: ['Shift', '/'] },
    { label: 'Load new posts / notifications', keys: '.' },
    { label: 'Scroll down', keys: 'Space' },
    { label: 'Scroll up', keys: ['Shift', 'Space'] },
    { label: 'New post', keys: 'N' },
    { label: 'Go to Home', keys: ['Shift', 'H'] },
    { label: 'Go to Search', keys: ['Shift', 'S'] },
    { label: 'Go to My Feeds', keys: ['Shift', 'F'] },
    { label: 'Go to Notifications', keys: ['Shift', 'N'] },
    { label: 'Go to Moderation', keys: ['Shift', 'M'] },
    { label: 'Go to Profile', keys: ['Shift', 'P'] },
    { label: 'Go to Settings', keys: ['Shift', 'E'] },
];
const createModal = () => {
    const el = document.createElement('div');
    el.id = MODAL_ID;
    const backgroundEl = document.createElement('div');
    backgroundEl.classList.add('background');
    backgroundEl.onclick = () => {
        Object.assign(el.style, {
            opacity: '0',
            pointerEvents: 'none',
        });
    };
    el.appendChild(backgroundEl);
    const modalEl = document.createElement('div');
    modalEl.classList.add('modal');
    el.appendChild(modalEl);
    const titleEl = document.createElement('h2');
    titleEl.classList.add('title');
    titleEl.innerText = 'Keyboard Shortcuts';
    modalEl.appendChild(titleEl);
    const contentEl = document.createElement('div');
    contentEl.classList.add('content');
    for (const description of descriptionsList) {
        const descriptionEl = document.createElement('p');
        descriptionEl.classList.add('description');
        const labelEl = document.createElement('span');
        labelEl.innerText = description.label;
        descriptionEl.appendChild(labelEl);
        const keysEl = document.createElement('span');
        const keys = typeof description.keys === 'string'
            ? [description.keys]
            : description.keys;
        for (const key of keys) {
            const keyEl = document.createElement('span');
            keyEl.classList.add('key');
            const keyLabelEl = document.createElement('span');
            keyLabelEl.innerText = key;
            keyEl.appendChild(keyLabelEl);
            keysEl.appendChild(keyEl);
        }
        descriptionEl.appendChild(keysEl);
        contentEl.appendChild(descriptionEl);
    }
    modalEl.appendChild(contentEl);
    return el;
};
const main = () => {
    const modalEl = createModal();
    document.documentElement.appendChild(modalEl);
    const handleKeydown = (event) => {
        var _a;
        if (event.repeat) {
            return;
        }
        // console.log('event', event);
        if (!event.target || !(event.target instanceof HTMLElement)) {
            return;
        }
        if (event.target.tagName.match(/input|select|textarea/)) {
            return;
        }
        if (event.target.contentEditable === 'true') {
            return;
        }
        const key = keys.find((key) => key === event.code);
        if (!key) {
            return;
        }
        (_a = handlerTable[key]) === null || _a === void 0 ? void 0 : _a.call(handlerTable, {
            altKey: event.altKey,
            ctrlKey: event.ctrlKey,
            metaKey: event.metaKey,
            repeat: event.repeat,
            shiftKey: event.shiftKey,
        });
    };
    window.addEventListener('keydown', handleKeydown);
};
(() => {
    try {
        console.info(`please contact https://bsky.app/profile/sapphire.sh for any questions and/or comments.`);
        main();
    }
    catch (error) {
        console.error(error);
    }
})();
GM_addStyle(`
#${MODAL_ID} {
	position: absolute;
	inset: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 0;
	pointer-events: none;
	transition: opacity 0.1s ease-in-out;
}

#${MODAL_ID} .background {
	position: absolute;
	inset: 0;
	background-color: #000000;
	opacity: 0.1;
}

#${MODAL_ID} .modal {
	width: 320px;
	max-width: 80vw;
	max-height: 80vh;
	padding: 18px 24px;
	background-color: #ffffff;
	border-radius: 8px;
	box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
	z-index: 100;
}

#${MODAL_ID} .title {
	margin: 0;
}

#${MODAL_ID} .content {
	margin-top: 24px;
	display: grid;
	gap: 10px;
}

#${MODAL_ID} .description {
	margin: 0;
	display: flex;
	justify-content: space-between;
}

#${MODAL_ID} .key:not(:first-child):before {
	content: '+';
	margin: 0 4px;
}

#${MODAL_ID} .key > span {
	padding: 2px;
	display: inline-block;
	min-width: 16px;
	text-align: center;
	border-radius: 4px;
	background-color: #e0e0e0;
	box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}
`);

})();

/******/ })()
;