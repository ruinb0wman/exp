import { ThemeProvider } from '@/context/theme';
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
import { ToastProvider } from '@/context/toast';
import { KeyboardProvider } from "react-native-keyboard-controller";
import { useNativeDB } from '@/hooks/db';
import { Platform } from 'react-native';

export default function RootLayout() {
  if (Platform.OS !== 'web') {
    useNativeDB();
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
