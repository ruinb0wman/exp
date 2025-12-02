import { DbProvider } from '@/context/db';
import { ThemeProvider } from '@/context/theme';
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
import { ToastProvider } from '@/context/toast';
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function RootLayout() {
  return (
    <DbProvider>
      <KeyboardProvider>
        <ThemeProvider>
          <ToastProvider>
            <ThemeProviderWrapper />
          </ToastProvider>
        </ThemeProvider>
      </KeyboardProvider>
    </DbProvider>
  );
}
