export function setHandlersForFilterButtons() {
  const tasksFilterList = document.querySelector('.tasks-filter');
  tasksFilterList.onpointerdown = tasksFilter;
}

function tasksFilter() {
  const tasks = document.querySelectorAll('.task-row');
  const container = document.querySelector('.tasks-container');
  // const completedTasks = document.querySelectorAll('.checked');
  // const initialContainerHeight = container.getBoundingClientRect().height;
  // const taskHeight = !tasks ? tasks[0].getBoundingClientRect().height : null;

  // container.classList.add('transition');
  // container.style.height = initialContainerHeight + 'px';

  if (event.target.id === 'tasks-all') unhideAllTasks(tasks);
  if (event.target.id === 'tasks-active') hideCompletedTasks(tasks);
  if (event.target.id === 'tasks-completed') hideActiveTasks(tasks);

  // setTimeout(() => {
  //   container.classList.remove('transition');
  //   container.style.height = '';
  // }, 800);
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

function updateCounter() {
  const taskCount = document.querySelectorAll('.task-row:not(.hidden)').length;
  document.getElementById('tasks-left').innerHTML = `${taskCount} items left`;
}

function updateCookie(filterButtonPressed) {
  document.cookie = `filterButton=${filterButtonPressed}; samesite=lax; expires=Tue, 19 Jan 2038 03:14:07 GMT`;
}

// function setContainerHeight(status) {
//   if (status === 'all' && taskHeight) {
//     container.style.height = taskHeight * tasks.length + 'px';
//   }
// }
