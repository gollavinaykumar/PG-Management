import zustand, { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
export const roomsStore: any = create(
  persist(
    (set, get) => ({
      rooms: [],
      setRooms: (room: []) =>
        set({
          rooms: [...room],
        }),
    }),
    {
      name: "ALL ROOMS",
    }
  )
);
