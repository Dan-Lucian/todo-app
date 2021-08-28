import {
  collection,
  getDocs,
  getFirestore,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

//create the database object
const db = getFirestore();

export async function generateList() {
  const querySnapshot = await getDocs(collection(db, 'todo-items'));
  querySnapshot.forEach((doc) => {
    insertTask(doc.data().text, doc.id, doc.data().status);
  });

  updateCounter();
}

function insertTask(inputValue, id, status) {
  const taskList = document.querySelector('.tasks-container ul');

  const checkedInsertion = status === 'active' ? '' : ' checked';
  taskList.insertAdjacentHTML(
    'afterbegin',
    `<li class="task-row opace" data-id="${id}" data-status="${status}">
      <div class="task-container">
        <div class="checkbox${checkedInsertion}">
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
  setTimeout(() => document.querySelector('.opace').classList.toggle('opace'));
}

function updateCounter() {
  const taskCount = document.querySelectorAll('.task-row').length;
  document.getElementById('tasks-left').innerHTML = `${taskCount} items left`;
}
