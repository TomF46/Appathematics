if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let o={};const c=e=>s(e,t),l={module:{uri:t},exports:o,require:c};i[t]=Promise.all(n.map((e=>l[e]||c(e)))).then((e=>(r(...e),o)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"404.html",revision:"b7610bfde7dfe7c3bce8f1d91ac27b2f"},{url:"assets/index-055b4e79.js",revision:null},{url:"assets/index-861bea53.css",revision:null},{url:"index.html",revision:"0ac5d0697ccaa0afe919d193c3bbdacc"},{url:"registerSW.js",revision:"8b59a954ba6a17e8c75ce35deba0678c"},{url:"manifest.webmanifest",revision:"08b6a4776b5b6ef6f2baa0cd15e3929f"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
