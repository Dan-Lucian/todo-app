// create or read the theme cookie
window.onload = function () {
  console.log('load finished at: ' + performance.now());
};

setCookies();
changeColorsByTheme();
changeImgByTheme();

// dark or light mode

function setCookies() {
  setThemeCookie();
  setFilterButtonCookie();

  function setThemeCookie() {
    const theme = document.cookie.match(/(?<=theme=)[^;]*/);

    if (!theme)
      document.cookie =
        'theme=light; samesite=lax; expires=Tue, 19 Jan 2038 03:14:07 GMT';
  }

  function setFilterButtonCookie() {
    const filterButton = document.cookie.match(/(?<=filterButton=)[^;]*/);

    if (!filterButton)
      document.cookie =
        'filterButton=all; samesite=lax; expires=Tue, 19 Jan 2038 03:14:07 GMT';
  }
}

function changeColorsByTheme() {
  const html = document.documentElement;
  const isCookieThemeLight =
    document.cookie.match(/(?<=theme=)[^;]*/)[0] === 'light';

  if (isCookieThemeLight) {
    html.classList.remove('dark');
    return;
  }

  html.classList.add('dark');
}

function changeImgByTheme() {
  document.addEventListener('readystatechange', function () {
    if (document.readyState === 'complete') return;

    const isCookieThemeLight =
      document.cookie.match(/(?<=theme=)[^;]*/)[0] === 'light';

    changeImgBg(isCookieThemeLight);
    changeImgTheme(isCookieThemeLight);
  });

  function changeImgBg(isCookieThemeLight) {
    const bg = document.getElementById('background-image');

    switch (`${isCookieThemeLight}_` + `${window.innerWidth > 420}`) {
      case 'false_false':
        bg.src = 'img/bg-mobile-dark.jpg';
        break;

      case 'false_true':
        bg.src = 'img/bg-desktop-dark.jpg';
        mergeButtons();
        break;

      case 'true_false':
        bg.src = 'img/bg-mobile-light.jpg';
        break;

      case 'true_true':
        bg.src = 'img/bg-desktop-light.jpg';
        mergeButtons();
        break;
    }
  }

  function changeImgTheme(isCookieThemeLight) {
    if (isCookieThemeLight) {
      document.getElementById('img-theme').src = 'todo-app/img/icon-moon.svg';
      return;
    }

    document.getElementById('img-theme').src = 'todo-app/img/icon-sun.svg';
  }

  function mergeButtons() {
    const tasksFilter = document.getElementById('tasks-filter');
    tasksFilter.remove();
    document.getElementById('tasks-left').after(tasksFilter);
  }
}
