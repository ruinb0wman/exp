import { Tabs } from 'expo-router';
import { CircleCheck, CalendarDays, Store } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: 'Task', tabBarIcon: ({ color }) => <CircleCheck color={color} /> }} />
      <Tabs.Screen name="calendar" options={{ title: 'Calendar', tabBarIcon: ({ color }) => <CalendarDays color={color} /> }} />
      <Tabs.Screen name="shop" options={{ title: 'Store', tabBarIcon: ({ color }) => <Store color={color} /> }} />
      <Tabs.Screen name="about" options={{ title: 'About' }} />
    </Tabs>
  );
}
