"use strict";import{doc,updateDoc,getFirestore}from"./firestore.js";export function makeMobileDraggable(){const e=event.target.closest(".draggable");if(!e)return;if(e.parentElement.querySelector(".task-placeholder"))return;event.preventDefault(),document.ondragstart=function(){return!1};const t=event.target;t.classList.add("rotate-180");const n=e.getBoundingClientRect(),o=event.clientX-n.left,r=event.clientY-n.top,i=n.width,s=n.height,a=document.createElement("li");a.className="task-row task-placeholder",a.style.height=s+"px",e.style.left=event.pageX-o+"px",e.style.top=event.pageY-r+"px",e.style.width=i+"px",e.style.height=s+"px",e.replaceWith(a),document.body.append(e),e.style.position="absolute",e.classList.add("remove-touch-action");const c=event.pageY;let d;e.addEventListener("pointerdown",function n(o){if(o.target===o.currentTarget.querySelector(".lift-release-icon"))return swapOrder(e,a),a.replaceWith(e),a.remove(),e.style.cssText="",e.classList.remove("remove-touch-action"),t.classList.remove("rotate-180"),document.removeEventListener("pointermove",p),e.removeEventListener("pointerup",m),void e.removeEventListener("pointerdown",n);const r=e.getBoundingClientRect();const l=event.clientX-r.left;const u=event.clientY-r.top;document.addEventListener("pointermove",p);function p(){let t=event.pageX-l,n=event.pageY-u;const o=document.documentElement.scrollTop,r=document.documentElement.clientWidth,p=document.documentElement.clientHeight+o;!function(e,t,n){d||(d=c-u);const o=d-t;o>n/2&&e.previousElementSibling&&(e.previousElementSibling.before(e),d-=n);o<-n/2&&e.nextElementSibling&&!e.nextElementSibling.classList.contains("tasks-status")&&(e.nextElementSibling.after(e),d+=n)}(a,n,s),t<0&&(t=0),t>r-i&&(t=r-i),n<o&&(n=o),n+s>p&&(n=p-s),n===o&&o>=20&&(window.scrollBy(0,-20),n-=20),n===p-s&&document.documentElement.scrollHeight-p>=20&&(window.scrollBy(0,20),n+=20),e.style.top=n+"px",e.style.left=t+"px"}e.addEventListener("pointerup",m);function m(e){document.removeEventListener("pointermove",p)}})}function swapOrder(e,t){const n=t.previousElementSibling,o=t.nextElementSibling;if(!n){const t=+o.dataset.order/2;return e.dataset.order=t,void updateDbOrder(t,e.dataset.id)}if(!o){const t=+n.dataset.order+1;return e.dataset.order=t,void updateDbOrder(t,e.dataset.id)}const r=(+n.dataset.order+ +o.dataset.order)/2;e.dataset.order=r,updateDbOrder(r,e.dataset.id)}async function updateDbOrder(e,t){const n=await getFirestore(),o=doc(n,"todo-items",t);updateDoc(o,{order:e})}