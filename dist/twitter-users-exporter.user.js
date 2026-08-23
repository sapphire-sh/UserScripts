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
// @version      1787462294206
// ==/UserScript==
(()=>{"use strict";Error;const e=e=>null!=e;var t;!function(e){e[e.DEBUG=1]="DEBUG",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR"}(t||(t={})),t.INFO;const n=XMLHttpRequest.prototype.send,s=(e,t)=>{XMLHttpRequest.prototype.send=function(s){return this.addEventListener("load",(()=>{200===this.status&&("string"==typeof e?this.responseURL.includes(e):e.test(this.responseURL))&&t(this)})),n.call(this,s)}},r=e=>"TimelineAddEntries"===e.type,i=e=>"TimelineTimelineItem"===e.entryType,l={},o="following_",a="followers_";var c;!function(e){e.FOLLOWERS="/Followers",e.FOLLOWING="/Following",e.LIST_MEMBERS="/ListMembers"}(c||(c={}));const u=new RegExp(Object.values(c).join("|")),m=()=>{s(u,(t=>{const n=(e=>{const t=new URL(e),n=new URLSearchParams(t.search).get("variables");if(null===n||""===n)return null;const{listId:s,userId:r}=JSON.parse(n);return e.includes(c.FOLLOWING)?`${o}${r}`:e.includes(c.FOLLOWERS)?`${a}${r}`:s})(t.responseURL);null!==n&&""!==n?((t,{data:n})=>{if(!n)return;const s="user"in n?n.user.result?.timeline.timeline.instructions??[]:"list"in n?n.list.members_timeline.timeline.instructions:[],c=s.filter(r).flatMap((t=>t.entries.map((e=>e.content)).filter(i).map((e=>{const{user_results:t}=e.itemContent;if(!("result"in t))return null;const{result:n}=t;return"UserUnavailable"===n.__typename?null:{id:n.rest_id,name:n.legacy?.name??n.core?.name??"",screenName:n.legacy?.screen_name??n.core?.screen_name??"",profileImageUrl:n.legacy?.profile_image_url_https??n.avatar?.image_url??""}})).filter(e)));l[t]||(l[t]=[]),l[t].push(...c),s.some((e=>"TimelineTerminateTimeline"===e.type&&"Bottom"===e.direction))&&(e=>{const t=l[e];if(!t)return;t.sort(((e,t)=>e.id.length===t.id.length?e.id.localeCompare(t.id):e.id.length>t.id.length?1:-1));const n={id:e,length:t.length,users:t},s=`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(n,null,2))}\n`,r=document.createElement("a");r.href=s,r.download=(e=>{const t=Date.now();return[o,a].some((t=>e.startsWith(t)))?`${e}_${t}.json`:`${e}.json`})(e),r.click()})(t)})(n,JSON.parse(t.response)):console.log(`cannot find id: ${t.responseURL}`)}))};try{m()}catch(e){console.error(e)}})();