import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

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
}

async function addTextToDb(text) {
  await addDoc(collection(db, 'todo-items'), {
    text: text,
    status: 'active',
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
  });
}

function insertTask(inputValue) {
  const taskList = document.querySelector('.tasks-container ul');
  taskList.insertAdjacentHTML(
    'afterbegin',
    `<li class="task-row opace" data-id="null" data-status="active">
      <div class="task-container">
        <div class="checkbox">
          <img src="img/icon-check.svg" alt="check icon" class="hidden" />
        </div>
        <div class="task">${inputValue}</div>
      </div>
      <div class="cross-icon">
        <img src="img/icon-cross.svg" alt="cross icon" />
      </div>
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

function updateCounter() {
  const taskCount = document.querySelectorAll('.task-row').length;
  document.getElementById('tasks-left').innerHTML = `${taskCount} items left`;
}
