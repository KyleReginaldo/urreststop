"use client";

import { User } from "@supabase/supabase-js";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ContextProps {
  setUser: Dispatch<SetStateAction<User | null>>;
  user: User | null;
}

const GlobalContext = createContext<ContextProps>({
  setUser: (): void => {},
  user: null as unknown as User,
});

export const GlobalContextProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
