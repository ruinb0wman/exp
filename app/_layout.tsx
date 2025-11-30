import { Stack } from 'expo-router';
import { DbProvider } from '@/context/db';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {

  return (
    <DbProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </DbProvider>
  );
}
