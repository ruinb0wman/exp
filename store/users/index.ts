import { create } from 'zustand'
import { users, getDB } from '@/db';
import { getNewUser } from "./lib"

interface UserState {
  userInfo: typeof users.$inferSelect | null;
}

interface UserActions {
  initUser: () => void;
}

export const useUserStore = create<UserState & UserActions>((set) => ({
  userInfo: null,
  initUser: async () => {
    const { db } = getDB();
    if (!db) return;
    const userInfo = (await db.select().from(users).limit(1))[0];
    if (userInfo) {
      set({ userInfo })
    } else {
      const newUser = getNewUser();
      await db.insert(users).values(newUser).onConflictDoNothing({ target: users.id });
      set({ userInfo: newUser })
    }
  }
}))
