// changing themes here
export function changeTheme() {
  changeCookieTheme();

  const isCookieThemeLight =
    document.cookie.match(/(?<=theme=)[^;]*/)[0] === 'light';

  changeImgBg(isCookieThemeLight);
  changeImgTheme(isCookieThemeLight);
  changeColorsByTheme(isCookieThemeLight);
}

function changeCookieTheme() {
  const isCookieThemeLight =
    document.cookie.match(/(?<=theme=)[^;]*/)[0] === 'light';

  if (isCookieThemeLight) {
    document.cookie =
      'theme=dark; samesite=lax; expires=Tue, 19 Jan 2038 03:14:07 GMT';
    return;
  }

  document.cookie =
    'theme=light; samesite=lax; expires=Tue, 19 Jan 2038 03:14:07 GMT';
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

function changeColorsByTheme(isCookieThemeLight) {
  if (isCookieThemeLight) {
    document.getElementsByTagName('body')[0].classList.remove('dark');
    document.querySelector('.big-container').classList.remove('dark');
    return;
  }

  document.getElementsByTagName('body')[0].classList.add('dark');
  document.querySelector('.big-container').classList.add('dark');
}
