export function setHandlersForFilterButtons() {
  const tasksFilterList = document.querySelector('.tasks-filter');
  console.log(tasksFilterList);

  tasksFilterList.onpointerdown = tasksFilter;

  function tasksFilter() {
    if (event.target.id === 'tasks-all') console.log('tasks all pressed');
    if (event.target.id === 'tasks-active') console.log('tasks active pressed');
    if (event.target.id === 'tasks-completed')
      console.log('tasks completed pressed');
  }
}
