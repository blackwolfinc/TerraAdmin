import Cookies from "universal-cookie";

const cookies = new Cookies();
let serverCookies = undefined;

export const CookieKeys = {
  AuthToken: "authToken",
  Role: "role",
  Username: "username",
  LimitError: 100,
};

const getCookieInstance = (ctx) => {
  if (ctx?.req) {
    serverCookies = serverCookies || new Cookies(ctx?.req?.headers?.cookie);
    return serverCookies;
  }

  return cookies;
};

const CookieOptions = {
  path: "/",
};

export const CookieStorage = {
  set: (key, data, ctx) => {
    const cookieInstances = getCookieInstance(ctx);
    return cookieInstances.set(key, data, CookieOptions);
  },
  get: (key, ctx) => {
    const cookieInstances = getCookieInstance(ctx);
    return cookieInstances.get(key);
  },
  remove: (key, ctx) => {
    const cookieInstances = getCookieInstance(ctx);
    return cookieInstances.remove(key, CookieOptions);
  },
};
