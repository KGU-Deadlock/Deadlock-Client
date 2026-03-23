export const getCookie = (name: string) => {
  return document.cookie.split("; ").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    return key === name ? decodeURIComponent(value) : acc;
  }, "");
};

export const setCookie = (name: string, value: string) => {
  document.cookie = `${name}=${value}; path=/`;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  document.cookie = `${name}=; path=/; max-age=0`;
};

export const deleteAllCookies = () => {
  const cookies = document.cookie ? document.cookie.split("; ") : [];
  for (const cookie of cookies) {
    const [name] = cookie.split("=");
    if (!name) continue;
    deleteCookie(name);
  }
};
