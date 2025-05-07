import { createContext, useState } from "react";

export const UserContext = createContext({ user: null, setUser: () => {} });

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null means not logged in
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
