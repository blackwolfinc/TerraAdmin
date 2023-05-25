import { CookieStorage, CookieKeys } from "utils/cookies";

export const IsLoggedIn = () => {
  const token = CookieStorage.get(CookieKeys.AuthToken);
  return token !== undefined;
};
