import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  increment,
  getFirestore,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

import { updateContainerHeight, updateCounter } from './helpers.js';

//create the database object
const db = getFirestore();

export function setFormEvents() {
  const form = document.getElementById('form');
  form.onsubmit = formOnSubmit;
}

function formOnSubmit(e) {
  e.preventDefault();

  const input = document.getElementById('input');

  // add input value to firebase db
  addTextToDb(input.value);

  // insert html into list with the given text
  insertTask(input.value);

  // remove value from the input
  input.value = '';

  // update container height for the animation
  updateContainerHeight();
}

async function addTextToDb(text) {
  await addDoc(collection(db, 'todo-items'), {
    text: text,
    status: 'active',
    order: 1,
  });

  const taskRows = document.querySelectorAll('.task-row');
  const taskRowsIds = [];

  for (const task of taskRows) {
    taskRowsIds.push(task.dataset.id);
  }

  const querySnapshot = await getDocs(collection(db, 'todo-items'));
  querySnapshot.forEach((doc) => {
    if (!taskRowsIds.includes(doc.id)) {
      setIdAttribute(doc.id);
      return;
    }

    incrementOrderInDb(doc);
    incrementOrderInHtml(doc.id);
  });
}

function insertTask(inputValue) {
  const taskList = document.querySelector('.tasks-container ul');
  const insertMobileArrowIcon =
    window.screen.width < 420
      ? '<div class="lift-release-icon" aria-label="move a task"></div>'
      : '';

  taskList.insertAdjacentHTML(
    'afterbegin',
    `<li class="task-row opace draggable" data-id="null" data-status="active" data-order="1">
      <div class="task-container">
        <div class="checkbox">
          <img height="9px" width="11px" src="/todo-app/img/icon-check.svg" alt="check icon" class="hidden" />
        </div>
        <div class="task">${inputValue}</div>
      </div>
      ${insertMobileArrowIcon}
      <div aria-label="remove task" class="cross-icon"></div>
    </li>`
  );

  updateCounter();

  // remove opace class for the fade in effect, not working w/out delay
  setTimeout(() => document.querySelector('.opace').classList.toggle('opace'));
}

function setIdAttribute(id) {
  const task = document.querySelector('[data-id="null"]');
  task.dataset.id = id;
}

function incrementOrderInDb(item) {
  const docRef = doc(db, 'todo-items', item.id);
  updateDoc(docRef, {
    order: increment(1),
  });
}

function incrementOrderInHtml(id) {
  const item = document.querySelector(`li[data-id='${id}']`);
  item.dataset.order = +item.dataset.order + 1;
}
