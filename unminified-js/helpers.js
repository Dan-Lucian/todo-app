export function updateContainerHeight() {
  const container = document.querySelector('.tasks-container');

  const listHeight = document
    .getElementById('task-list')
    .getBoundingClientRect().height;

  // 4 px for the top/bottom margins
  setTimeout(() => (container.style.height = listHeight + 4 + 'px'), 100);
}

export function updateCounter(preDeleteNumber) {
  const taskCount = document.querySelectorAll('.task-row:not(.hidden)').length;

  // preDeletedNumber us used when deleting tasks
  // because removal happens with timeout
  if (preDeleteNumber) {
    document.getElementById('tasks-left').innerHTML = `${
      taskCount - preDeleteNumber
    } items left`;
    return;
  }

  document.getElementById('tasks-left').innerHTML = `${taskCount} items left`;
}
