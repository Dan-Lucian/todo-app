// create or read the theme cookie
setCookie();
const isCookieThemeLight =
  document.cookie.match(/(?<=theme=)[^;]*/)[0] === 'light';

changeColorsByTheme(isCookieThemeLight);

// dark or light mode
document.addEventListener('readystatechange', function () {
  if (document.readyState === 'complete') return;
  changeTheme(isCookieThemeLight);
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

// changing themes here
function changeTheme(isCookieThemeLight) {
  changeImgBg(isCookieThemeLight);
  changeImgTheme(isCookieThemeLight);
}

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
    document.getElementById('img-theme').src = '../img/icon-moon.svg';
    return;
  }

  document.getElementById('img-theme').src = '../img/icon-sun.svg';
}

function mergeButtons() {
  const tasksFilter = document.getElementById('tasks-filter');
  tasksFilter.remove();
  document.getElementById('tasks-left').after(tasksFilter);
}
