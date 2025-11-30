import { Stack } from 'expo-router';
import { DbProvider } from '@/context/db';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import theme from '@/constants/theme';

export default function RootLayout() {

  return (
    <DbProvider>
      <StatusBar />
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundDark }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </DbProvider>
  );
}
