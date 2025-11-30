import { DbProvider } from '@/context/db';
import { ThemeProvider } from '@/context/theme';
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";

export default function RootLayout() {
  return (
    <DbProvider>
      <ThemeProvider>
        <ThemeProviderWrapper />
      </ThemeProvider>
    </DbProvider>
  );
}
