import {
  deleteDoc,
  doc,
  updateDoc,
  getFirestore,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

import { changeTheme } from './change-theme.js';
import { makeTasksDraggable } from './make-tasks-draggable.js';
import { updateCounter } from './helpers.js';

const db = getFirestore();

export function setBigContainerPointerdownEvents() {
  document
    .getElementById('tasks-container')
    .addEventListener('pointerdown', pointerDownFunc);

  document.getElementById('tasks-container').oncontextmenu = makeTasksDraggable;

  document.getElementById('button-theme').onpointerdown = changeTheme;
  document.getElementById('tasks-clear').onpointerdown = removeCompletedTasks;
}

function pointerDownFunc(e) {
  e.preventDefault();

  if (e.target.closest('.checkbox')) {
    toggleTaskStatus(e);
    return;
  }

  if (e.target.closest('.cross-icon')) {
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
  // remove predefined height for it to follow content height smoothly
  const container = document.getElementById('tasks-container');
  container.style.height = '';

  const task = rowChild.closest('li.task-row');
  deleteDoc(doc(db, 'todo-items', task.dataset.id));

  animateTaskDeletion(task);
  replaceTaskWithPlaceholder(task);

  // rewrite container height for addition/filtering animations to work
  setTimeout(
    () => (container.style.height = container.getBoundingClientRect().height),
    1000
  );

  updateCounter(1);
}

function replaceTaskWithPlaceholder(task) {
  const rect = task.getBoundingClientRect();
  const placeholder = document.createElement('li');

  // 2px for the margin
  placeholder.style.height = rect.height + 2 + 'px';
  placeholder.className = 'task-deletion-placeholder';

  setTimeout(() => {
    task.replaceWith(placeholder);
    setTimeout(() => placeholder.classList.add('shrink-animation'), 50);
  }, 300);

  setTimeout(() => placeholder.remove(), 1000);
}

function animateTaskDeletion(task) {
  setTimeout(() => task.classList.add('throw-animation'));
}

function removeCompletedTasks() {
  event.preventDefault();

  let deletedTasksNumber = 0;

  const checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach((checkbox) => {
    if (checkbox.classList.contains('checked')) {
      removeTask(checkbox);
      deletedTasksNumber++;
    }
  });

  updateCounter(deletedTasksNumber);
}
