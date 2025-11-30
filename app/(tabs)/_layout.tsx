import { Tabs } from 'expo-router';
import { CircleCheck, CalendarDays, Store, User } from 'lucide-react-native';
import theme from "@/constants/theme";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: theme.backgroundDark, borderColor: '#000' } }}>
      <Tabs.Screen name="index" options={{ title: 'Task', tabBarIcon: ({ color }) => <CircleCheck color={color} /> }} />
      <Tabs.Screen name="calendar" options={{ title: 'Calendar', tabBarIcon: ({ color }) => <CalendarDays color={color} /> }} />
      <Tabs.Screen name="shop" options={{ title: 'Store', tabBarIcon: ({ color }) => <Store color={color} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color }) => <User color={color} /> }} />
    </Tabs>
  );
}
