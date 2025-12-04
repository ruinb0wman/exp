import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { useTheme } from '@/context/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ThemeProviderWrapper() {
  const { colors, size } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar backgroundColor={colors.background} barStyle='light-content' />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background, padding: size.spacing } }} >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  )

}
