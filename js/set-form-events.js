import {
  collection,
  addDoc,
  getFirestore,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

//create the database object
const db = getFirestore();

export function setFormEvents() {
  const form = document.getElementById('form');
  form.onsubmit = formOnSubmit;

  function formOnSubmit(e) {
    e.preventDefault();

    console.log(e.timeStamp);
    const input = document.getElementById('input');

    // add input value to firebase db
    addTextToDb(input.value);

    // insert html into list with the given text
    insertTask(input.value);

    // remove value from the input
    input.value = '';
  }

  function addTextToDb(text) {
    addDoc(collection(db, 'todo-items'), {
      text: text,
      status: 'active',
    });
  }

  function insertTask(inputValue) {
    const taskList = document.querySelector('.tasks-container ul');
    taskList.insertAdjacentHTML(
      'afterbegin',
      `<li class="task-row opace">
        <div class="task-container">
          <div class="checkbox">
            <img src="img/icon-check.svg" alt="check icon" />
          </div>
          <div class="task">${inputValue}</div>
        </div>
        <div class="cross-icon">
          <img src="img/icon-cross.svg" alt="cross icon" />
        </div>
      </li>`
    );

    // remove opace class for the fade in effect, not working w/out delay
    setTimeout(() =>
      document.querySelector('.opace').classList.toggle('opace')
    );
  }
}
