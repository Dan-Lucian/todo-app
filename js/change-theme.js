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
  const bg = document.getElementById('background-image');

  switch (`${isCookieThemeLight}_` + `${window.innerWidth > 420}`) {
    case 'false_false':
      bg.src = 'img/bg-mobile-dark.jpg';
      break;

    case 'false_true':
      bg.src = 'img/bg-desktop-dark.jpg';
      break;

    case 'true_false':
      bg.src = 'img/bg-mobile-light.jpg';
      break;

    case 'true_true':
      bg.src = 'img/bg-desktop-light.jpg';
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

function changeColorsByTheme(isCookieThemeLight) {
  const html = document.documentElement;

  if (isCookieThemeLight) {
    html.classList.add('transition');
    setTimeout(() => html.classList.remove('transition'), 300);
    html.classList.remove('dark');
    return;
  }

  html.classList.add('transition');
  setTimeout(() => html.classList.remove('transition'), 300);
  html.classList.add('dark');
}
