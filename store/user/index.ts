import { create } from "zustand";
import { usersTable } from "@/db";
import { getDB } from "@/db/adaptor";

interface State {
  users: Array<typeof usersTable.$inferSelect>;
  setUsers: () => Promise<void>;
}

export const useUser = create<State>((set) => {
  const db = getDB();

  return {
    users: [],
    setUsers: async () => {
      const users = await db.db.select().from(usersTable);
      users && set({ users })
    }
  }
})
