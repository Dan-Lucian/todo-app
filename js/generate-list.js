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

  const insertCheckedClass = status === 'active' ? '' : ' checked';
  const insertHiddenClass = status === 'active' ? ' hidden' : '';

  taskList.insertAdjacentHTML(
    'afterbegin',
    `<li class="task-row opace${insertHiddenClassByCookie(
      status
    )}" data-id="${id}" data-status="${status}">
      <div class="task-container">
        <div class="checkbox${insertCheckedClass}">
          <img height="9px" width="11px" src="img/icon-check.svg" alt="check icon" class="${insertHiddenClass}"/>
        </div>
        <div class="task">${inputValue}</div>
      </div>
      <div class="cross-icon">
        <img width="18px" height="18px" src="img/icon-cross.svg" alt="cross icon" />
      </div>
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

function updateCounter() {
  const taskCount = document.querySelectorAll('.task-row').length;
  document.getElementById('tasks-left').innerHTML = `${taskCount} items left`;
}
