export function setHandlersForFilterButtons() {
  const tasksFilterList = document.querySelector('.tasks-filter');
  tasksFilterList.onpointerdown = tasksFilter;

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
  }

  function hideCompletedTasks(tasks) {
    tasks.forEach((task) => {
      task.className = 'task-row';
      if (task.querySelector('.checkbox').classList.contains('checked'))
        task.classList.add('hidden');
    });
  }

  function hideActiveTasks(tasks) {
    tasks.forEach((task) => {
      task.className = 'task-row';
      if (!task.querySelector('.checkbox').classList.contains('checked'))
        task.classList.add('hidden');
    });
  }
}
