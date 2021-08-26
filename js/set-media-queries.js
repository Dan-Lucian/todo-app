export function setMediaQueries() {
  document.addEventListener('DOMContentLoaded', func);

  function func() {
    if (window.innerWidth > 420) {
      document.getElementById('background-image').src =
        'img/bg-desktop-light.jpg';

      const tasksFilter = document.getElementById('tasks-filter');
      tasksFilter.remove();
      document.getElementById('tasks-left').after(tasksFilter);
    }
  }
}
