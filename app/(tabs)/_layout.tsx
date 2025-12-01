import { Tabs } from 'expo-router';
import { CircleCheck, CalendarDays, Store, User } from 'lucide-react-native';
import { useTheme } from '@/context/theme';

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.dimText,
      tabBarStyle: {
        backgroundColor: colors.background,
        borderColor: colors.border,
      }
    }}>
      <Tabs.Screen name="index" options={{ title: 'Task', tabBarIcon: ({ color }) => <CircleCheck color={color} /> }} />
      <Tabs.Screen name="calendar" options={{ title: 'Calendar', tabBarIcon: ({ color }) => <CalendarDays color={color} /> }} />
      <Tabs.Screen name="rewards" options={{ title: 'Rewards', tabBarIcon: ({ color }) => <Store color={color} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color }) => <User color={color} /> }} />
    </Tabs>
  );
}
