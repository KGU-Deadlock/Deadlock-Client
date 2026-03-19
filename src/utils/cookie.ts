export const getCookie = (name: string) => {
  return document.cookie.split("; ").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    return key === name ? decodeURIComponent(value) : acc;
  }, "");
};

export const setCookie = (name: string, value: string) => {
  document.cookie = `${name}=${value}; path=/`;
};
