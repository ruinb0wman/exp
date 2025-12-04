import { useEffect } from 'react';
import { ThemeProvider } from '@/context/theme';
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
import { ToastProvider } from '@/context/toast';
import { KeyboardProvider } from "react-native-keyboard-controller";
import { useNativeDB } from '@/hooks/db';
import { Platform } from 'react-native';
import { useDailyCheck } from "@/hooks/useDailyCheck"
import { getAllTaskTemplates, getAllTaskInstance, createTaskInstance } from '@/db/services';
import { generateTaskInstances, deduplicateTaskInstances } from "@/libs/task";
import { getTodayDateString } from '@/libs/date';

export default function RootLayout() {
  if (Platform.OS !== 'web') {
    useNativeDB();
  }

  useDailyCheck((today) => {
    console.log('today', today)
  })

  useEffect(() => {
    getTodaysdeDulplicatedTaskInstance();
  }, [])

  const getTodaysdeDulplicatedTaskInstance = async () => {
    const today = getTodayDateString();
    const dbTemplates = await getAllTaskTemplates()
    const dbInstances = await getAllTaskInstance()
    if (!dbTemplates) return;
    const instances = generateTaskInstances(new Date(today), dbTemplates)
    const deduplicated = dbInstances ? deduplicateTaskInstances(dbInstances, instances) : instances;
    console.log('deduplicated', deduplicated)
    // const result = await createTaskInstance(deduplicated);
    // console.log('result', result);
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
