import create from "zustand";
import { persist } from "zustand/middleware";

import { queryClient } from "../../services/QueryClient";

type UserStore = {
  userToken: string | null;
  setUserToken: (userToken: string | null) => void;
};

export const userStore = create(
  persist<UserStore>(
    (set) => ({
      userToken: null,
      setUserToken: (userToken) => {
        set({ userToken });
        queryClient.invalidateQueries("tasks");
      },
    }),
    {
      name: "token",
      getStorage: () => sessionStorage,
    }
  )
);
