import {
  deleteDoc,
  doc,
  updateDoc,
  getFirestore,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

import { changeTheme } from './change-theme.js';
import { makeTasksDraggable } from './make-tasks-draggable.js';

const db = getFirestore();

export function setBigContainerPointerdownEvents() {
  document
    .getElementById('tasks-container')
    .addEventListener('pointerdown', pointerDownFunc);

  document.getElementById('button-theme').onpointerdown = changeTheme;
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

  if (e.target === document.getElementById('tasks-clear')) {
    e.preventDefault();
    removeCompletedTasks();
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
  task.remove();
  updateCounter();
}

function removeCompletedTasks() {
  const checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach((checkbox) => {
    if (checkbox.classList.contains('checked')) removeTask(checkbox);
  });

  updateCounter();
}

function updateCounter() {
  const taskCount = document.querySelectorAll('.task-row').length;
  document.getElementById('tasks-left').innerHTML = `${taskCount} items left`;
}
