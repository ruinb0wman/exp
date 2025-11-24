import { create } from "zustand";
import { db, usersTable } from "@/db";

interface State {
  users: Array<typeof usersTable.$inferSelect>;
  setUsers: () => Promise<void>;
}

export const useUser = create<State>((set) => {
  return {
    users: [],
    setUsers: async () => {
      const users = await db.select().from(usersTable);
      set({ users })
    }
  }
})
