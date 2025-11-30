import { create } from "zustand";
import { users as useresTable } from "@/db";
import { getDB } from "@/db/adaptor";

interface State {
  users: Array<typeof useresTable.$inferSelect>;
  setUsers: () => Promise<void>;
}

export const useUser = create<State>((set) => {
  const db = getDB();

  return {
    users: [],
    setUsers: async () => {
      const users = await db.db.select().from(useresTable);
      users && set({ users })
    }
  }
})
