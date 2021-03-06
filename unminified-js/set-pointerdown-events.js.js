import { deleteDoc, doc, updateDoc, getFirestore } from './firestore.js';
import { changeTheme } from './change-theme.js';
import { makeTasksDraggable } from './make-tasks-draggable.js';
import { makeMobileDraggable } from './mobile-draggable.js';
import { updateCounter } from './helpers.js';
const db = getFirestore();
export function setBigContainerPointerdownEvents() {
  document
    .getElementById('tasks-container')
    .addEventListener('pointerdown', pointerDownFunc),
    (document.getElementById('button-theme').onpointerdown = changeTheme),
    (document.getElementById('tasks-clear').onpointerdown =
      removeCompletedTasks);
}
function pointerDownFunc(e) {
  if ((e.preventDefault(), e.target.closest('.checkbox'))) toggleTaskStatus(e);
  else {
    if (!e.target.closest('.cross-icon'))
      return e.target.closest('.lift-release-icon')
        ? (console.log('task lifted'), void makeMobileDraggable())
        : void (window.screen.width < 420
            ? simulateHoverState(e)
            : makeTasksDraggable());
    removeTask(e.target);
  }
}
function toggleTaskStatus(e) {
  e.target.closest('.checkbox').classList.toggle('checked'),
    e.target
      .closest('.checkbox')
      .querySelector('img')
      .classList.toggle('hidden');
  const t = e.target.closest('.task-row'),
    o = doc(db, 'todo-items', t.dataset.id);
  if ('active' === t.getAttribute('data-status'))
    return (
      t.setAttribute('data-status', 'completed'),
      void updateDoc(o, { status: 'completed' })
    );
  t.setAttribute('data-status', 'active'), updateDoc(o, { status: 'active' });
}
function removeTask(e) {
  const t = document.getElementById('tasks-container');
  t.style.height = '';
  const o = e.closest('li.task-row');
  deleteDoc(doc(db, 'todo-items', o.dataset.id)),
    animateTaskDeletion(o),
    replaceTaskWithPlaceholder(o),
    setTimeout(
      () => (t.style.height = t.getBoundingClientRect().height + 'px'),
      1100
    ),
    updateCounter(1);
}
function replaceTaskWithPlaceholder(e) {
  const t = e.getBoundingClientRect(),
    o = document.createElement('li');
  (o.style.height = t.height + 2 + 'px'),
    (o.className = 'task-deletion-placeholder'),
    setTimeout(() => {
      e.replaceWith(o),
        setTimeout(() => o.classList.add('shrink-animation'), 50);
    }, 300),
    setTimeout(() => o.remove(), 1e3);
}
function animateTaskDeletion(e) {
  setTimeout(() => e.classList.add('throw-animation'));
}
function removeCompletedTasks() {
  event.preventDefault();
  let e = 0;
  document.querySelectorAll('.checkbox').forEach((t) => {
    t.classList.contains('checked') && (removeTask(t), e++);
  }),
    updateCounter(e);
}
function simulateHoverState(e) {
  const t = e.currentTarget.querySelector('.simulated-hover'),
    o = e.target.closest('.task-row');
  t && t.classList.remove('simulated-hover'),
    t !== o && o.classList.toggle('simulated-hover');
}
