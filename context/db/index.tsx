import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { db, rawDB } from '@/db';
import migrations from '@/drizzle/migrations';

type DbContextType = {
  state: 'pending' | 'failed' | 'success';
  canUseDB: boolean;
};

const DbContext = createContext<DbContextType | undefined>(undefined);

export const DbProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<DbContextType>({
    state: 'pending',
    canUseDB: false,
  })

  useDrizzleStudio(rawDB);
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (success) {
      setState({ state: 'success', canUseDB: true });
      return;
    }
    if (error || !success) {
      setState({ state: 'failed', canUseDB: false });
      return;
    }
  }, [success])

  return (
    <DbContext.Provider value={{ ...state }}>
      {children}
    </DbContext.Provider>
  );
};

export const useDbContext = () => {
  const context = useContext(DbContext);
  if (!context) {
    throw new Error('useDbContext must be used within DbProvider');
  }
  return context;
};
