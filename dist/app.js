!function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=0)}([function(e,t,n){n(1),e.exports=n(3)},function(e,t,n){for(var a=n(2),r=document.querySelector("#app"),o=a.makeCalendar(),d=new Date,c=d.getFullYear(),u=d.getMonth()+1,i=u;i<12+u;i++){for(var l=new Date(c,i,0),s=a.makeMonth(l),m=1;m<l.getDate()+1;m++){var f=new Date(l.getFullYear(),l.getMonth(),m);1==m&&s.childNodes[2].appendChild(a.makeOffset(f.getDay()));var p=a.makeDay(f);s.childNodes[2].appendChild(p)}o.appendChild(s)}r.appendChild(o),a.getToday(d)},function(e,t){var n={makeCalendar:function(){var e=document.createElement("div");return e.classList.add("calendar"),e},makeMonth:function(e){var t=document.createElement("div");t.classList.add("month");var a=document.createElement("div");a.classList.add("month-name"),a.textContent=new Intl.DateTimeFormat("en-us",{month:"long",year:"numeric"}).format(e),t.appendChild(a),t.appendChild(n.addLabels());var r=document.createElement("div");return r.classList.add("month-months"),t.appendChild(r),t},makeDay:function(e){var t=document.createElement("div");return t.classList.add("date"),t.textContent=e.getDate(),t.dataset.date=e.toLocaleDateString("en-us",{year:"numeric",month:"numeric",day:"numeric"}),t},makeOffset:function(e){for(var t=document.createDocumentFragment(),n=0;n<e;n++){var a=document.createElement("div");a.classList.add("offset-block"),a.innerHTML="00",t.appendChild(a)}return t},addLabels:function(){var e=document.createElement("div");e.classList.add("days-labels");return["S","M","T","W","T","F","S"].forEach((function(t){var n=document.createElement("div");n.classList.add("label"),n.textContent=t,e.appendChild(n)})),e},getToday:function(e){var t=document.querySelector('[data-date="'.concat(e.toLocaleDateString("en-us",{year:"numeric",month:"numeric",day:"numeric"}),'"]'));return t.classList.add("today"),t}};e.exports=n},function(e,t){}]);