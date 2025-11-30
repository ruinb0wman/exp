import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { useTheme } from '@/context/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ThemeProviderWrapper() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }} >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  )

}
