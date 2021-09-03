export function updateContainerHeight() {
  const container = document.querySelector('.tasks-container');

  const listHeight = document
    .getElementById('task-list')
    .getBoundingClientRect().height;

  // 4 px for the top/bottom margins
  setTimeout(() => (container.style.height = listHeight + 4 + 'px'));
}

export function updateCounter() {
  const taskCount = document.querySelectorAll('.task-row:not(.hidden)').length;
  document.getElementById('tasks-left').innerHTML = `${taskCount} items left`;
}