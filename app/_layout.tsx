import { ThemeProvider } from '@/context/theme';
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
import { ToastProvider } from '@/context/toast';
import { KeyboardProvider } from "react-native-keyboard-controller";
import { useNativeDB } from '@/hooks/db';
import { Platform } from 'react-native';
import { useDailyCheck } from "@/hooks/useDailyCheck"
import { getAllTaskTemplates, getAllTaskInstance, createTaskInstance } from '@/db/services';
import { generateTaskInstances, findNewTaskInstances } from "@/libs/task";
import { getTodayDateString } from '@/libs/date';
import { useUserStore } from '@/store/users';
import { useEffect } from 'react';

export default function RootLayout() {
  if (Platform.OS !== 'web') {
    useNativeDB();
  }
  const userStore = useUserStore();
  useEffect(() => {
    userStore.initUser();
  }, [])

  // useDailyCheck((today) => {
  //   getTodaysdeDulplicatedTaskInstance();
  //   console.log('today', today)
  // })

  const getTodaysdeDulplicatedTaskInstance = async () => {
    const today = getTodayDateString();
    const dbTemplates = await getAllTaskTemplates()
    const dbInstances = await getAllTaskInstance()
    if (!dbTemplates) return;
    const instances = generateTaskInstances(new Date(today), dbTemplates)
    const newInstance = dbInstances ? findNewTaskInstances(instances, dbInstances) : instances;
    console.log('newInstance', newInstance)
    const result = await createTaskInstance(newInstance);
    console.log('result', result);
  }

  if (userStore.userInfo) {
    return (
      <ThemeProvider>
        <ToastProvider>
          <KeyboardProvider>
            <ThemeProviderWrapper />
          </KeyboardProvider>
        </ToastProvider>
      </ThemeProvider>
    );
  } else {
    <></>
  }
}
