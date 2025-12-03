import { ThemeProvider } from '@/context/theme';
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
import { ToastProvider } from '@/context/toast';
import { KeyboardProvider } from "react-native-keyboard-controller";
import { useDrizzleStudio } from '@/hooks/drizzleStudio';

export default function RootLayout() {
  useDrizzleStudio();

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
