import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  increment,
  getFirestore,
} from './firestore.js';
import { updateContainerHeight, updateCounter } from './helpers.js';
const db = getFirestore();
export function setFormEvents() {
  document.getElementById('form').onsubmit = formOnSubmit;
}
function formOnSubmit(t) {
  t.preventDefault();
  const e = document.getElementById('input');
  addTextToDb(e.value),
    insertTask(e.value),
    (e.value = ''),
    updateContainerHeight();
}
async function addTextToDb(t) {
  await addDoc(collection(db, 'todo-items'), {
    text: t,
    status: 'active',
    order: 1,
  });
  const e = document.querySelectorAll('.task-row'),
    o = [];
  for (const t of e) o.push(t.dataset.id);
  (await getDocs(collection(db, 'todo-items'))).forEach((t) => {
    o.includes(t.id)
      ? (incrementOrderInDb(t), incrementOrderInHtml(t.id))
      : setIdAttribute(t.id);
  });
}
function insertTask(t) {
  const e = document.querySelector('.tasks-container ul'),
    o =
      window.screen.width < 420
        ? '<div class="lift-release-icon" aria-label="move a task"></div>'
        : '';
  e.insertAdjacentHTML(
    'afterbegin',
    `<li class="task-row opace draggable" data-id="null" data-status="active" data-order="1">\n      <div class="task-container">\n        <div class="checkbox">\n          <img height="9px" width="11px" src="/todo-app/img/icon-check.svg" alt="check icon" class="hidden" />\n        </div>\n        <div class="task">${t}</div>\n      </div>\n      ${o}\n      <div aria-label="remove task" class="cross-icon"></div>\n    </li>`
  ),
    updateCounter(),
    setTimeout(() =>
      document.querySelector('.opace').classList.toggle('opace')
    );
}
function setIdAttribute(t) {
  document.querySelector('[data-id="null"]').dataset.id = t;
}
function incrementOrderInDb(t) {
  const e = doc(db, 'todo-items', t.id);
  updateDoc(e, { order: increment(1) });
}
function incrementOrderInHtml(t) {
  const e = document.querySelector(`li[data-id='${t}']`);
  e.dataset.order = +e.dataset.order + 1;
}
