import {
  deleteDoc,
  doc,
  updateDoc,
  getFirestore,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

import { changeTheme } from './change-theme.js';
import { makeTasksDraggable } from './make-tasks-draggable.js';
import { updateContainerHeight, updateCounter } from './helpers.js';

const db = getFirestore();

export function setBigContainerPointerdownEvents() {
  document
    .getElementById('tasks-container')
    .addEventListener('pointerdown', pointerDownFunc);

  document.getElementById('button-theme').onpointerdown = changeTheme;
  document.getElementById('tasks-clear').onpointerdown = removeCompletedTasks;
}

function pointerDownFunc(e) {
  if (e.target.closest('.checkbox')) {
    e.preventDefault();
    toggleTaskStatus(e);
    return;
  }

  if (e.target.closest('.cross-icon')) {
    e.preventDefault();
    removeTask(e.target);
    return;
  }

  // make tasks draggable
  makeTasksDraggable();
}

function toggleTaskStatus(e) {
  e.target.closest('.checkbox').classList.toggle('checked');
  e.target.closest('.checkbox').querySelector('img').classList.toggle('hidden');

  const task = e.target.closest('.task-row');
  const docRef = doc(db, 'todo-items', task.dataset.id);
  if (task.getAttribute('data-status') === 'active') {
    task.setAttribute('data-status', 'completed');
    updateDoc(docRef, {
      status: 'completed',
    });
    return;
  }
  task.setAttribute('data-status', 'active');
  updateDoc(docRef, {
    status: 'active',
  });
}

function removeTask(rowChild) {
  const task = rowChild.closest('li.task-row');

  deleteDoc(doc(db, 'todo-items', task.dataset.id));

  task.classList.add('throw-left-animation');
  setTimeout(() => {
    task.remove();
    updateContainerHeight();
  }, 500);

  updateCounter();
}

function removeCompletedTasks() {
  event.preventDefault();

  const checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach((checkbox) => {
    if (checkbox.classList.contains('checked')) removeTask(checkbox);
  });

  updateCounter();
}
