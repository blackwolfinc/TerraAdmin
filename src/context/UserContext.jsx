import { useEffect, useState, createContext } from "react";
import { CookieKeys } from "utils/cookies";
import { CookieStorage } from "utils/cookies";

const initialState = {
  id: "",
  name: "",
  email: "",
  role: "",
  phone: "",
};

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);

  useEffect(() => {
    const user = CookieStorage.get(CookieKeys.User);

    if (!user) {
      return;
    }

    setUser(user);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
