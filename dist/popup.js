(()=>{"use strict";({975:function(){var t,e=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))((function(o,l){function r(t){try{c(i.next(t))}catch(t){l(t)}}function u(t){try{c(i.throw(t))}catch(t){l(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,u)}c((i=i.apply(t,e||[])).next())}))};let n=0,i=0;function o(){return e(this,void 0,void 0,(function*(){const t=document.querySelectorAll(".multiplier");i=parseFloat(localStorage.getItem("numberAsText"));for(let e=0;e<t.length;e++){const n=t[e];i*=parseFloat(n.value)}document.getElementById("total").innerHTML=i.toFixed(2).toString()}))}function l(t,n){const i=document.getElementById("multiplier-fields"),l=document.createElement("p");l.setAttribute("class","title"),l.appendChild(document.createElement("br"));const u=document.getElementById("title");l.innerHTML=t||u.value,u.value="";const c=document.createElement("input");c.setAttribute("type","number"),c.setAttribute("class","multiplier"),c.value=n,null==c||c.addEventListener("input",(()=>e(this,void 0,void 0,(function*(){yield o(),r()}))));const d=document.createElement("button");d.setAttribute("class","removeButton"),null==d||d.addEventListener("click",(()=>{!function(t){e(this,void 0,void 0,(function*(){t.parentElement.parentElement.remove(),r(),yield o()}))}(d)})),d.innerHTML="X";const a=document.createElement("div");a.setAttribute("class","form-multiplicators"),a.appendChild(c),a.appendChild(d);const s=document.createElement("div");s.setAttribute("class","container"),s.appendChild(l),s.appendChild(a),i.appendChild(s),i.setAttribute("id","multiplier-fields"),r()}function r(){const t=document.querySelectorAll(".container"),e=[];t.forEach((t=>{const n=t.querySelector(".title").innerText,i=t.querySelector(".multiplier").value;e.push({title:n,inputValue:i})})),chrome.storage.sync.set({multipliers:e}).then()}null===(t=chrome.tabs)||void 0===t||t.query({active:!0,currentWindow:!0},(function(t){return e(this,void 0,void 0,(function*(){yield function(t){return e(this,void 0,void 0,(function*(){chrome.scripting.executeScript({target:{tabId:t[0].id},func:()=>{var t;return null===(t=window.getSelection())||void 0===t?void 0:t.toString()}},(function(t){return e(this,void 0,void 0,(function*(){n=yield function(t){return e(this,void 0,void 0,(function*(){return t=null==t?void 0:t.replace(/[^\d,.]/g,""),n=parseFloat(t),isNaN(n)||(document.getElementById("selected-number").innerHTML=n.toFixed(2).toString(),window.localStorage.setItem("numberAsText",t)),n}))}(null==t?void 0:t[0].result),yield o()}))}))}))}(t)}))})),document.addEventListener("DOMContentLoaded",(()=>e(void 0,void 0,void 0,(function*(){yield function(){return e(this,void 0,void 0,(function*(){localStorage.getItem("numberAsText")&&(n=parseFloat(localStorage.getItem("numberAsText")),document.getElementById("selected-number").innerHTML=n.toFixed(2).toString(),yield o())}))}(),yield function(){var t,n;return e(this,void 0,void 0,(function*(){null===(t=document.getElementById("add-multiplikator"))||void 0===t||t.addEventListener("click",(()=>{l()})),null===(n=document.getElementById("calculate-total"))||void 0===n||n.addEventListener("click",(()=>{o()}))}))}(),chrome.storage.sync.get(["multipliers"],(function(t){return e(this,void 0,void 0,(function*(){const e=t.multipliers;if(e)for(const t of e)l(t.title,t.inputValue),yield o()}))}))}))))}})[975]()})();