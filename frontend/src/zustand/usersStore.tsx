import zustand, { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
export const usersStore: any = create(
  persist(
    (set, get) => ({
      user: [],
      setUsers: (users: []) =>
        set({
          user: [...users],
        }),
    }),
    {
      name: "ALL USERS",
    }
  )
);
