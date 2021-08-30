// create or read the theme cookie
setCookie();
const isCookieThemeLight =
  document.cookie.match(/(?<=theme=)[^;]*/)[0] === 'light';

changeColorsByTheme(isCookieThemeLight);

// dark or light mode
document.addEventListener('DOMContentLoaded', function () {
  setMediaQueries();
  changeTheme();
});

function setCookie() {
  const theme = document.cookie.match(/(?<=theme=)[^;]*/);

  if (!theme)
    document.cookie =
      'theme=light; samesite=lax; expires=Tue, 19 Jan 2038 03:14:07 GMT';
}

function changeColorsByTheme(isCookieThemeLight) {
  if (isCookieThemeLight) {
    document.getElementsByTagName('html')[0].classList.remove('dark');
    return;
  }

  document.getElementsByTagName('html')[0].classList.add('dark');
}

function setMediaQueries() {
  if (window.innerWidth > 420) {
    document.getElementById('background-image').src =
      'img/bg-desktop-light.jpg';

    const tasksFilter = document.getElementById('tasks-filter');
    tasksFilter.remove();
    document.getElementById('tasks-left').after(tasksFilter);
  }
}

// changing themes here
function changeTheme() {
  const isCookieThemeLight =
    document.cookie.match(/(?<=theme=)[^;]*/)[0] === 'light';

  console.log('isCookieThemeLight = ' + isCookieThemeLight);

  changeImgBg(isCookieThemeLight);
  changeImgTheme(isCookieThemeLight);
}

function changeImgBg(isCookieThemeLight) {
  if (isCookieThemeLight) {
    document.getElementById('background-image').src =
      '../img/bg-desktop-light.jpg';
    return;
  }

  document.getElementById('background-image').src =
    '../img/bg-desktop-dark.jpg';
}

function changeImgTheme(isCookieThemeLight) {
  if (isCookieThemeLight) {
    document.getElementById('img-theme').src = '../img/icon-moon.svg';
    return;
  }

  document.getElementById('img-theme').src = '../img/icon-sun.svg';
}
