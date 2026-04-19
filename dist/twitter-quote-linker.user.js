// ==UserScript==
// @name         twitter quote linker
// @description  always show view quotes link on tweet detail pages
// @match        https://twitter.com/*
// @match        https://mobile.twitter.com/*
// @match        https://x.com/*
// @match        https://mobile.x.com/*
// @grant        none
// @namespace    https://www.sapphire.sh/
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-quote-linker.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-quote-linker.user.js
// @version      1776618183995
// ==/UserScript==
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*********************************************!*\
  !*** ./src/scripts/twitter-quote-linker.ts ***!
  \*********************************************/

const PROCESSED_ATTR = 'data-view-quotes';
const STATUS_PATTERN = /\/([^/]+)\/status\/(\d+)/;
const getPageStatusPath = () => {
    const match = STATUS_PATTERN.exec(window.location.pathname);
    return match ? `/${match[1]}/status/${match[2]}` : null;
};
const getArticleStatusPath = (article) => {
    const timeEl = article.querySelector('a[href*="/status/"] time');
    if (timeEl === null) {
        return null;
    }
    const anchor = timeEl.closest('a');
    if (anchor === null) {
        return null;
    }
    const href = anchor.getAttribute('href');
    if (href === null) {
        return null;
    }
    const match = STATUS_PATTERN.exec(href);
    return match ? `/${match[1]}/status/${match[2]}` : null;
};
const createLinkWrapper = (statusPath) => {
    const linkWrapper = document.createElement('div');
    linkWrapper.className = 'css-175oi2r r-1awozwy r-18u37iz';
    const link = document.createElement('a');
    link.href = `${statusPath}/quotes`;
    link.target = '_blank';
    link.rel = 'noopener';
    link.dir = 'ltr';
    link.role = 'link';
    link.className = 'css-146c3p1 r-bcqeeo r-1ttztb7 r-qvutc0 r-37j5jr r-n6v787 r-1f529hi r-majxgm r-1loqt21';
    link.style.color = 'rgb(83, 100, 113)';
    const span = document.createElement('span');
    span.className = 'css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3';
    span.textContent = 'View quotes';
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.classList.add('r-4qtqp9', 'r-yyyyoo', 'r-dnmrzs', 'r-bnwqim', 'r-lrvibr', 'r-m6rgpd', 'r-qpl8lv', 'r-1xzupcd');
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M14.586 12L7.543 4.96l1.414-1.42L17.414 12l-8.457 8.46-1.414-1.42L14.586 12z');
    g.appendChild(path);
    svg.appendChild(g);
    link.appendChild(span);
    link.appendChild(svg);
    linkWrapper.appendChild(link);
    return linkWrapper;
};
const processArticle = (article) => {
    if (article.hasAttribute(PROCESSED_ATTR)) {
        return;
    }
    const pageStatusPath = getPageStatusPath();
    if (pageStatusPath === null) {
        return;
    }
    const articleStatusPath = getArticleStatusPath(article);
    if (articleStatusPath !== pageStatusPath) {
        return;
    }
    if (article.querySelector('a[href$="/quotes"]') !== null) {
        article.setAttribute(PROCESSED_ATTR, '');
        return;
    }
    const group = article.querySelector('div[role="group"]');
    if (group === null) {
        return;
    }
    const actionWrapper = group.parentElement?.parentElement;
    if (actionWrapper === undefined || actionWrapper === null) {
        return;
    }
    const groupParent = group.parentElement;
    const existingRow = groupParent?.nextElementSibling;
    if (existingRow instanceof HTMLElement) {
        existingRow.appendChild(createLinkWrapper(pageStatusPath));
    }
    else {
        const row = document.createElement('div');
        row.className = 'css-175oi2r r-1awozwy r-18u37iz r-1wtj0ep r-1a8r3js';
        const wrapper = createLinkWrapper(pageStatusPath);
        wrapper.style.marginLeft = 'auto';
        row.appendChild(wrapper);
        actionWrapper.appendChild(row);
    }
    article.setAttribute(PROCESSED_ATTR, '');
};
const scan = () => {
    const articles = Array.from(document.querySelectorAll('article[data-testid="tweet"]'));
    for (const article of articles) {
        processArticle(article);
    }
};
const observer = new MutationObserver(() => {
    scan();
});
observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
});
scan();

/******/ })()
;