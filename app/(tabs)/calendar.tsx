import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import NavBar from '@/components/navBar';
import CalendarView from "@/components/calendar";
import { CircleDot, Plus } from 'lucide-react-native';
import { useTheme } from '@/context/theme';
import { useRouter } from 'expo-router';

// Define the task data type
interface Task {
  id: number;
  title: string;
  exp: string;
  completed: boolean;
}

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<string>('September 24');
  const { colors, size } = useTheme();
  const router = useRouter();

  // Sample tasks for the selected day
  const tasks: Task[] = [
    {
      id: 1,
      title: 'Morning Run',
      exp: '(+10 exp)',
      completed: false
    },
    {
      id: 2,
      title: 'Read 20 pages',
      exp: '(+5 exp)',
      completed: false
    },
    {
      id: 3,
      title: 'Plan tomorrow\'s tasks',
      exp: '(+5 exp)',
      completed: true
    }
  ];

  return (
    <View style={styles.container}>

      {/* Top App Bar */}
      <NavBar title='Calendar'
        leftNode={
          <TouchableOpacity >
            <CircleDot color={colors.text} size={size.icon} />
          </TouchableOpacity>
        }
        rightNode={
          <TouchableOpacity onPress={() => router.push('/editTask')}>
            <Plus color={colors.text} size={size.icon} />
          </TouchableOpacity>
        }
      />

      <CalendarView />

      {/* Calendar Picker */}
      <ScrollView style={styles.mainContent}>

        {/* Tasks for the day */}
        <View style={styles.tasksSection}>
          <Text style={styles.tasksTitle}>Tasks for {selectedDate}</Text>

          <View style={styles.tasksList}>
            {tasks.map((task) => (
              <View key={task.id} style={styles.taskItem}>
                <TouchableOpacity style={styles.checkboxContainer}>
                  {task.completed && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>

                <Text style={[
                  styles.taskText,
                  task.completed ? styles.completedTask : null
                ]}>
                  {task.title} <Text style={styles.taskExp}>{task.exp}</Text>
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101922', // background-dark
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  calendarContainer: {
    maxWidth: 336,
    marginHorizontal: 'auto',
  },
  monthNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  navButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  monthText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  dayHeaders: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  dayHeader: {
    width: 48,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#A1A1AA', // zinc-400
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emptyDay: {
    width: '14.28%', // 100% / 7
    height: 48,
  },
  dayButton: {
    width: '14.28%', // 100% / 7
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayContent: {
    position: 'relative',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayNumber: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  today: {
    backgroundColor: '#2b8cee', // primary
    borderRadius: 20,
  },
  todayText: {
    color: '#FFFFFF',
  },
  indicator: {
    position: 'absolute',
    bottom: 6,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  primaryIndicator: {
    backgroundColor: '#2b8cee', // primary
  },
  alertIndicator: {
    backgroundColor: '#F5A623', // alert
  },
  successIndicator: {
    backgroundColor: '#7ED321', // success
  },
  tasksSection: {
    marginTop: 24,
  },
  tasksTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  tasksList: {
    // Add divider styles if needed
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#3F3F46', // zinc-700
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#A1A1AA', // zinc-400
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginRight: 12,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  taskText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#A1A1AA', // zinc-400
  },
  taskExp: {
    color: '#A1A1AA', // zinc-400
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 68,
    backgroundColor: '#1F2937CC', // zinc-800/80 with backdrop blur effect
    borderTopWidth: 1,
    borderTopColor: '#3F3F46', // zinc-700
    paddingHorizontal: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  activeNavItem: {
    // Currently active nav item
  },
  activeNavIcon: {
    color: '#2b8cee', // primary
  },
  activeNavLabel: {
    color: '#2b8cee', // primary
  },
  navLabel: {
    fontSize: 12,
    color: '#A1A1AA', // zinc-400
    fontWeight: '500',
  },
});
