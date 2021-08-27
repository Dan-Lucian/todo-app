export function bigContainerPointerdown() {
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
  }

  function removeTask(crossElem) {
    const task = crossElem.closest('.task-row');
    task.remove();
  }
}
