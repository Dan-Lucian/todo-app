import { updateContainerHeight, updateCounter } from './helpers.js';

export function setHandlersForFilterButtons() {
  const tasksFilterList = document.querySelector('.tasks-filter');
  tasksFilterList.onpointerdown = tasksFilter;
}

function tasksFilter() {
  const tasks = document.querySelectorAll('.task-row');

  if (event.target.id === 'tasks-all') unhideAllTasks(tasks);
  if (event.target.id === 'tasks-active') hideCompletedTasks(tasks);
  if (event.target.id === 'tasks-completed') hideActiveTasks(tasks);

  updateContainerHeight();
}

function unhideAllTasks(tasks) {
  // setContainerHeight('all');

  tasks.forEach((task) => {
    task.classList.remove('hidden');
  });

  updateCounter();
  updateCookie('all');
}

function hideCompletedTasks(tasks) {
  // setContainerHeight('active');

  tasks.forEach((task) => {
    task.classList.remove('hidden');
    if (task.querySelector('.checkbox').classList.contains('checked'))
      task.classList.add('hidden');
  });

  updateCounter();
  updateCookie('active');
}

function hideActiveTasks(tasks) {
  // setContainerHeight('completed');

  tasks.forEach((task) => {
    task.classList.remove('hidden');
    if (!task.querySelector('.checkbox').classList.contains('checked'))
      task.classList.add('hidden');
  });

  updateCounter();
  updateCookie('completed');
}

function updateCookie(filterButtonPressed) {
  document.cookie = `filterButton=${filterButtonPressed}; samesite=lax; expires=Tue, 19 Jan 2038 03:14:07 GMT`;
}
