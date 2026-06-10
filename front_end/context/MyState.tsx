"use client";
import { ICategory, IUser } from "@/types";
import { getUserData } from "@/constant/api";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export type IValue = {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  cart: number;
  setCart: Dispatch<SetStateAction<number>>;
  category: ICategory[];
  setCategory: Dispatch<SetStateAction<ICategory[]>>;
};

const MyContext = createContext<IValue | null>(null);

export const useUserContext = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error("useUserContext must be used within MyState");
  }

  return context;
};

const MyState = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [cart, setCart] = useState<number>(0);
  const [category, setCategory] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserData();
        setUser(data);
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const value: IValue = {
    user,
    setUser,
    cart,
    setCart,
    category,
    setCategory,
  };
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export default MyState;
