export function setCookieOnAnotherDomain(cookieName: string, cookieValue: string, domain: string) {
  const script = document.createElement('script');
  script.src =
    domain + '/set-cookie.php?name=' + encodeURIComponent(cookieName) + '&value=' + encodeURIComponent(cookieValue);
  document.body.appendChild(script);
}
