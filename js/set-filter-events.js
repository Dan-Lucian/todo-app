export function setHandlersForFilterButtons() {
  const tasksFilterList = document.querySelector('.tasks-filter');
  tasksFilterList.onpointerdown = tasksFilter;
}

function tasksFilter() {
  const tasks = document.querySelectorAll('.task-row');

  if (event.target.id === 'tasks-all') unhideAllTasks(tasks);
  if (event.target.id === 'tasks-active') hideCompletedTasks(tasks);
  if (event.target.id === 'tasks-completed') hideActiveTasks(tasks);
}

function unhideAllTasks(tasks) {
  tasks.forEach((task) => {
    task.className = 'task-row';
  });
  updateCounter();
  updateCookie('all')
}

function hideCompletedTasks(tasks) {
  tasks.forEach((task) => {
    task.className = 'task-row';
    if (task.querySelector('.checkbox').classList.contains('checked'))
      task.classList.add('hidden');
  });
  updateCounter();
  updateCookie('active')
}

function hideActiveTasks(tasks) {
  tasks.forEach((task) => {
    task.className = 'task-row';
    if (!task.querySelector('.checkbox').classList.contains('checked'))
      task.classList.add('hidden');
  });
  updateCounter();
  updateCookie('completed');
}

function updateCounter() {
  const taskCount = document.querySelectorAll('.task-row:not(.hidden)').length;
  document.getElementById('tasks-left').innerHTML = `${taskCount} items left`;
}

function updateCookie(filterButtonPressed){
  document.cookie = `filterButton=${filterButtonPressed}; samesite=lax; expires=Tue, 19 Jan 2038 03:14:07 GMT`;
}
