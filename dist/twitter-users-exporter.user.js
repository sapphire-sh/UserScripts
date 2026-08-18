// ==UserScript==
// @name         twitter users exporter
// @description  export twitter users
// @grant        none
// @match        https://twitter.com/*
// @match        https://mobile.twitter.com/*
// @match        https://x.com/*
// @match        https://mobile.x.com/*
// @namespace    https://www.sapphire.sh/
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-users-exporter.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-users-exporter.user.js
// @version      1787029191810
// ==/UserScript==
(()=>{"use strict";Error;const e=e=>null!=e;var n;!function(e){e[e.DEBUG=1]="DEBUG",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR"}(n||(n={})),n.INFO;const t=e=>"TimelineAddEntries"===e.type,r=e=>"TimelineTimelineItem"===e.entryType,s={},i="following_",l="followers_";var o;!function(e){e.FOLLOWERS="/Followers",e.FOLLOWING="/Following",e.LIST_MEMBERS="/ListMembers"}(o||(o={}));const a=()=>{const n=window.XMLHttpRequest;window.XMLHttpRequest=()=>{const a=new n;return a.addEventListener("readystatechange",(()=>{if(4!==a.readyState)return;if(200!==a.status)return;if(n=a.responseURL,!Object.values(o).some((e=>n.includes(e))))return;var n;const c=(e=>{const n=new URL(e),t=new URLSearchParams(n.search).get("variables");if(null===t||""===t)return null;const{listId:r,userId:s}=JSON.parse(t);return e.includes(o.FOLLOWING)?`${i}${s}`:e.includes(o.FOLLOWERS)?`${l}${s}`:r})(a.responseURL);null!==c&&""!==c?((n,{data:o})=>{if(!o)return;const a="user"in o?o.user.result?.timeline.timeline.instructions??[]:"list"in o?o.list.members_timeline.timeline.instructions:[],c=a.filter(t).flatMap((n=>n.entries.map((e=>e.content)).filter(r).map((e=>{const{user_results:n}=e.itemContent;if(!("result"in n))return null;const{result:t}=n;return"UserUnavailable"===t.__typename?null:{id:t.rest_id,name:t.legacy?.name??t.core?.name??"",screenName:t.legacy?.screen_name??t.core?.screen_name??"",profileImageUrl:t.legacy?.profile_image_url_https??t.avatar?.image_url??""}})).filter(e)));s[n]||(s[n]=[]),s[n].push(...c),a.some((e=>"TimelineTerminateTimeline"===e.type&&"Bottom"===e.direction))&&(e=>{const n=s[e];if(!n)return;n.sort(((e,n)=>e.id.length===n.id.length?e.id.localeCompare(n.id):e.id.length>n.id.length?1:-1));const t={id:e,length:n.length,users:n},r=`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(t,null,2))}\n`,o=document.createElement("a");o.href=r,o.download=(e=>{const n=Date.now();return[i,l].some((n=>e.startsWith(n)))?`${e}_${n}.json`:`${e}.json`})(e),o.click()})(n)})(c,JSON.parse(a.response)):console.log(`cannot find id: ${a.responseURL}`)}),!1),a}};try{a()}catch(e){console.error(e)}})();