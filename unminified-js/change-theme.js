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

  switch (`${isCookieThemeLight}_` + `${window.screen.width > 420}`) {
    case 'false_false':
      bg.src = '/todo-app/img/bg-mobile-dark.webp';
      break;

    case 'false_true':
      bg.src = '/todo-app/img/bg-desktop-dark.webp';
      break;

    case 'true_false':
      bg.src = '/todo-app/img/bg-mobile-light.webp';
      break;

    case 'true_true':
      bg.src = '/todo-app/img/bg-desktop-light.webp';
      break;
  }
}

function changeImgTheme(isCookieThemeLight) {
  if (isCookieThemeLight) {
    document.getElementById('img-theme').src = '/todo-app/img/icon-moon.svg';
    return;
  }

  document.getElementById('img-theme').src = '/todo-app/img/icon-sun.svg';
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
