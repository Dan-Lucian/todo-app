import { collection, getDocs, getFirestore } from './firestore.js';
import { updateContainerHeight, updateCounter } from './helpers.js';
const db = getFirestore();
async function generateList() {
  extractData(await getDocs(collection(db, 'todo-items')))
    .sort((t, e) => e.order - t.order)
    .forEach((t) => {
      insertTask(t.text, t.id, t.status, t.order);
    }),
    updateContainerHeight(),
    updateCounter();
}
function extractData(t) {
  const e = [];
  return (
    t.forEach((t) => {
      e.push({
        text: t.data().text,
        id: t.id,
        status: t.data().status,
        order: t.data().order,
      });
    }),
    e
  );
}
function insertTask(t, e, a, i) {
  const s = document.querySelector('.tasks-container ul'),
    o = 'active' === a ? '' : ' checked',
    r = 'active' === a ? ' hidden' : '',
    c =
      window.screen.width < 420
        ? '<div class="lift-release-icon" aria-label="move a task"></div>'
        : '';
  s.insertAdjacentHTML(
    'afterbegin',
    `<li class="task-row draggable opace${(function (t) {
      const e = document.cookie.match(/(?<=filterButton=)[^;]*/)[0];
      if ('active' === e && 'completed' === t) return ' hidden';
      if ('completed' === e && 'active' === t) return ' hidden';
      return '';
    })(
      a
    )}" data-id="${e}" data-status="${a}" data-order="${i}">\n      <div class="task-container">\n        <div class="checkbox${o}">\n          <img height="9px" width="11px" src="/todo-app/img/icon-check.svg" alt="check icon" class="${r}"/>\n        </div>\n        <div class="task">${t}</div>\n      </div>\n      ${c}\n      <div aria-label="remove task" class="cross-icon"></div>\n    </li>`
  ),
    setTimeout(() =>
      document.querySelector('.opace').classList.toggle('opace')
    );
}
generateList();
