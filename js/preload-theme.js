function setCookies() {
  document.cookie.match(/(?<=theme=)[^;]*/) ||
    (document.cookie =
      'theme=light; samesite=lax; expires=Tue, 19 Jan 2038 03:14:07 GMT'),
    document.cookie.match(/(?<=filterButton=)[^;]*/) ||
      (document.cookie =
        'filterButton=all; samesite=lax; expires=Tue, 19 Jan 2038 03:14:07 GMT');
}
function changeColorsByTheme() {
  const e = document.documentElement;
  'light' === document.cookie.match(/(?<=theme=)[^;]*/)[0]
    ? e.classList.remove('dark')
    : e.classList.add('dark');
}
function changeImgByTheme() {
  function e() {
    const e = document.getElementById('tasks-filter');
    e.remove(), document.getElementById('tasks-left').after(e);
  }
  function t() {
    document.querySelector('.drag-message p').innerHTML =
      "Press arrow up icon to change a task's order";
  }
  document.addEventListener('readystatechange', function () {
    if ('complete' === document.readyState) return;
    const o = 'light' === document.cookie.match(/(?<=theme=)[^;]*/)[0];
    !(function (o) {
      const n = document.getElementById('background-image');
      switch (`${o}_` + `${window.innerWidth > 420}`) {
        case 'false_false':
          (n.src = '/todo-app/img/bg-mobile-dark.webp'), t();
          break;
        case 'false_true':
          (n.src = '/todo-app/img/bg-desktop-dark.webp'), e();
          break;
        case 'true_false':
          (n.src = '/todo-app/img/bg-mobile-light.webp'), t();
          break;
        case 'true_true':
          (n.src = '/todo-app/img/bg-desktop-light.webp'), e();
      }
    })(o),
      (function (e) {
        if (e)
          return void (document.getElementById('img-theme').src =
            '/todo-app/img/icon-moon.svg');
        document.getElementById('img-theme').src = '/todo-app/img/icon-sun.svg';
      })(o);
  });
}
setCookies(), changeColorsByTheme(), changeImgByTheme();
