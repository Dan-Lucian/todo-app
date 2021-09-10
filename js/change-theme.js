export function changeTheme() {
  changeCookieTheme();
  const e = 'light' === document.cookie.match(/(?<=theme=)[^;]*/)[0];
  changeImgBg(e), changeImgTheme(e), changeColorsByTheme(e);
}
function changeCookieTheme() {
  'light' === document.cookie.match(/(?<=theme=)[^;]*/)[0]
    ? (document.cookie =
        'theme=dark; samesite=lax; expires=Tue, 19 Jan 2038 03:14:07 GMT')
    : (document.cookie =
        'theme=light; samesite=lax; expires=Tue, 19 Jan 2038 03:14:07 GMT');
}
function changeImgBg(e) {
  const t = document.getElementById('background-image');
  switch (`${e}_` + `${window.innerWidth > 420}`) {
    case 'false_false':
      t.src = '/todo-app/img/bg-mobile-dark.webp';
      break;
    case 'false_true':
      t.src = '/todo-app/img/bg-desktop-dark.webp';
      break;
    case 'true_false':
      t.src = '/todo-app/img/bg-mobile-light.webp';
      break;
    case 'true_true':
      t.src = '/todo-app/img/bg-desktop-light.webp';
  }
}
function changeImgTheme(e) {
  document.getElementById('img-theme').src = e
    ? '/todo-app/img/icon-moon.svg'
    : '/todo-app/img/icon-sun.svg';
}
function changeColorsByTheme(e) {
  const t = document.documentElement;
  if (e)
    return (
      t.classList.add('transition'),
      setTimeout(() => t.classList.remove('transition'), 300),
      void t.classList.remove('dark')
    );
  t.classList.add('transition'),
    setTimeout(() => t.classList.remove('transition'), 300),
    t.classList.add('dark');
}
