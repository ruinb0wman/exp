import { ThemeProvider } from '@/context/theme';
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
import { ToastProvider } from '@/context/toast';
import { KeyboardProvider } from "react-native-keyboard-controller";
import { initDB } from '@/hooks/db';
import { Platform } from 'react-native';

export default function RootLayout() {
  if (Platform.OS !== 'web') {
    initDB();
  }

  return (
    <ThemeProvider>
      <ToastProvider>
        <KeyboardProvider>
          <ThemeProviderWrapper />
        </KeyboardProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
