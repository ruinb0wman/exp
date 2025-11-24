import { create } from 'zustand'

interface User { id: number, name: string, age: number, email: string };

interface State {
  users: User[];
  setItems: (users: User[]) => void
}

export const useTest = create<State>((set) => ({
  users: [],
  setItems: (users) => set((state) => ({ users: [...state.users, ...users] })),
}))
