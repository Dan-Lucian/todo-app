export function setCookie() {
  const theme = document.cookie.match(/(?<=theme=)[^;]*/);

  if (!theme)
    document.cookie =
      'theme=light; samesite=lax; expires=Tue, 19 Jan 2038 03:14:07 GMT';
}
