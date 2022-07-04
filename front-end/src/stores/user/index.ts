import create from "zustand";
import { persist } from "zustand/middleware";

type UserStore = {
  userToken: string | null;
  setUserToken: (userToken: string | null) => void;
};

export const userStore = create(
  persist<UserStore>(
    (set) => ({
      userToken: null,
      setUserToken: (userToken) => set({ userToken }),
    }),
    {
      name: "token",
      getStorage: () => sessionStorage,
    }
  )
);
