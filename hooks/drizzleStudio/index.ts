import { getDB } from "@/db";
import { useDrizzleStudio as _useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { Platform } from 'react-native';

export function useDrizzleStudio() {
  const { rawDB } = getDB();

  if (Platform.OS !== 'web') {
    _useDrizzleStudio(rawDB);
  }
}
