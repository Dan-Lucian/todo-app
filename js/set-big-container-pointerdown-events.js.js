import {
  deleteDoc,
  doc,
  getFirestore,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

const db = getFirestore();

export function setBigContainerPointerdownEvents() {
  document
    .getElementById('tasks-container')
    .addEventListener('pointerdown', pointerDownFunc);

  function pointerDownFunc(e) {
    if (e.target.closest('.checkbox')) {
      e.preventDefault();
      e.target.closest('.checkbox').classList.toggle('checked');
    }

    if (e.target.closest('.cross-icon')) {
      e.preventDefault();
      removeTask(e.target);
    }

    if (e.target === document.getElementById('tasks-clear')) {
      e.preventDefault();
      removeCompletedTasks();
    }
  }

  function removeTask(rowChild) {
    const task = rowChild.closest('li.task-row');
    deleteDoc(doc(db, 'todo-items', task.dataset.id));
    task.remove();
  }

  function removeCompletedTasks() {
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach((checkbox) => {
      if (checkbox.classList.contains('checked')) removeTask(checkbox);
    });
  }
}
