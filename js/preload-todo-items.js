import {
  collection,
  getDocs,
  getFirestore,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

//create the database object
const db = getFirestore();
generateList();

async function generateList() {
  console.log('request for collection sent: ' + performance.now());
  const querySnapshot = await getDocs(collection(db, 'todo-items'));
  console.log('request for collection received: ' + performance.now());

  const arrTasks = extractData(querySnapshot);
  arrTasks
    .sort((a, b) => b.order - a.order)
    .forEach((obj) => {
      insertTask(obj.text, obj.id, obj.status, obj.order);
    });

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

  taskList.insertAdjacentHTML(
    'afterbegin',
    `<li class="task-row draggable opace${insertHiddenClassByCookie(
      status
    )}" data-id="${id}" data-status="${status}" data-order="${order}">
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
  const taskCount = document.querySelectorAll('.task-row:not(.hidden)').length;
  document.getElementById('tasks-left').innerHTML = `${taskCount} items left`;
}
