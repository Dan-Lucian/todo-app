import {
  collection,
  getDocs,
  getFirestore,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

import { updateContainerHeight, updateCounter } from './helpers.js';

//create the database object
const db = getFirestore();
generateList();

async function generateList() {
  const querySnapshot = await getDocs(collection(db, 'todo-items'));

  const arrTasks = extractData(querySnapshot);
  arrTasks
    .sort((a, b) => b.order - a.order)
    .forEach((obj) => {
      insertTask(obj.text, obj.id, obj.status, obj.order);
    });

  updateContainerHeight();
  updateCounter();
}

function extractData(firebaseQuery) {
  const arr = [];
  firebaseQuery.forEach((doc) => {
    arr.push({
      text: doc.data().text,
      id: doc.id,
      status: doc.data().status,
      order: doc.data().order,
    });
  });

  return arr;
}

function insertTask(inputValue, id, status, order) {
  const taskList = document.querySelector('.tasks-container ul');

  const insertCheckedClass = status === 'active' ? '' : ' checked';
  const insertHiddenClass = status === 'active' ? ' hidden' : '';
  const insertMobileArrowIcon =
    window.screen.width < 420
      ? '<div class="lift-release-icon" role="button" aria-pressed="false"></div>'
      : '';

  taskList.insertAdjacentHTML(
    'afterbegin',
    `<li class="task-row draggable opace${insertHiddenClassByCookie(
      status
    )}" data-id="${id}" data-status="${status}" data-order="${order}">
      <div class="task-container">
        <div role="checkbox" aria-checked="false" class="checkbox${insertCheckedClass}">
          <img height="9px" width="11px" src="/todo-app/img/icon-check.svg" alt="check icon" class="${insertHiddenClass}"/>
        </div>
        <div class="task">${inputValue}</div>
      </div>
      ${insertMobileArrowIcon}
      <div role="button" aria-pressed="false" class="cross-icon"></div>
    </li>`
  );

  // remove opace class for the fade in effect, not working w/out delay
  setTimeout(() => document.querySelector('.opace').classList.toggle('opace'));

  function insertHiddenClassByCookie(status) {
    const lastFilterButton = document.cookie.match(
      /(?<=filterButton=)[^;]*/
    )[0];

    if (lastFilterButton === 'active' && status === 'completed') {
      return ' hidden';
    }

    if (lastFilterButton === 'completed' && status === 'active') {
      return ' hidden';
    }

    return '';
  }
}
