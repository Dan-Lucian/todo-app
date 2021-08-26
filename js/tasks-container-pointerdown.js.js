export function bigContainerPointerdown() {
  document
    .getElementById('tasks-container')
    .addEventListener('pointerdown', pointerDownFunc);

  function pointerDownFunc(e) {
    e.preventDefault();
    if (e.target.closest('.checkbox')) {
      e.target.closest('.checkbox').classList.toggle('checked');
    }
  }
}
