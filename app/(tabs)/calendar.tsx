import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

// Define the day data type
interface DayData {
  day: number;
  hasPrimary?: boolean;
  hasAlert?: boolean;
  hasSuccess?: boolean;
  isToday?: boolean;
}

// Define the task data type
interface Task {
  id: number;
  title: string;
  exp: string;
  completed: boolean;
}

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<string>('September 24');
  const [currentMonth, setCurrentMonth] = useState<number>(8); // September is 8 (0-indexed)
  const [currentYear, setCurrentYear] = useState<number>(2024);

  // Generate days for the calendar view
  const generateDays = (): DayData[] => {
    // For September 2024, day 1 (Sunday) falls on the first column (index 0)
    // We need to add empty slots for days before the 1st based on what day of the week the 1st falls on
    // September 1, 2024 is a Sunday (day 0), so no empty slots needed at the beginning
    const days: DayData[] = [];

    // Calculate what day of the week the 1st falls on
    // September 1, 2024 was a Sunday, which is day 0
    const firstDay = new Date(2024, 8, 1).getDay(); // 8 for September (0-indexed)

    // Add empty slots for days before the 1st of the month
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: 0 }); // Placeholder for empty days
    }

    // Add days 1-30 with their indicators
    for (let day = 1; day <= 30; day++) {
      const dayData: DayData = {
        day: day,
        hasPrimary: day === 2 || day === 9, // Example primary indicators
        hasAlert: day === 4, // Example alert indicator
        hasSuccess: day === 5, // Example success indicator
        isToday: day === 24 // September 24th is the selected date
      };
      days.push(dayData);
    }

    return days;
  };

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

  // Handle month navigation
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11); // December
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0); // January
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Get month name
  const getMonthName = (month: number): string => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[month];
  };

  const days = generateDays();
  const monthName = getMonthName(currentMonth);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Top App Bar */}
      <View style={styles.topAppBar}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.icon}>◀</Text>
        </TouchableOpacity>
        <Text style={styles.topAppBarTitle}>Calendar</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.icon}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar Picker */}
      <ScrollView style={styles.mainContent}>
        <View style={styles.calendarContainer}>
          {/* Month Navigation */}
          <View style={styles.monthNavigation}>
            <TouchableOpacity onPress={goToPreviousMonth} style={styles.navButton}>
              <Text style={styles.navIcon}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.monthText}>{monthName} {currentYear}</Text>
            <TouchableOpacity onPress={goToNextMonth} style={styles.navButton}>
              <Text style={styles.navIcon}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Day Headers */}
          <View style={styles.dayHeaders}>
            <Text style={styles.dayHeader}>S</Text>
            <Text style={styles.dayHeader}>M</Text>
            <Text style={styles.dayHeader}>T</Text>
            <Text style={styles.dayHeader}>W</Text>
            <Text style={styles.dayHeader}>T</Text>
            <Text style={styles.dayHeader}>F</Text>
            <Text style={styles.dayHeader}>S</Text>
          </View>

          {/* Calendar Days Grid */}
          <View style={styles.daysGrid}>
            {days.map((dayData, index) => {
              if (dayData.day === 0) {
                return <View key={`empty-${index}`} style={styles.emptyDay} />;
              }

              return (
                <TouchableOpacity
                  key={`day-${dayData.day}`}
                  style={[
                    styles.dayButton,
                    dayData.isToday ? styles.today : null
                  ]}
                  onPress={() => setSelectedDate(`${monthName} ${dayData.day}`)}
                >
                  <View style={styles.dayContent}>
                    <Text style={[
                      styles.dayNumber,
                      dayData.isToday ? styles.todayText : null
                    ]}>
                      {dayData.day}
                    </Text>
                    {(dayData.hasPrimary || dayData.hasAlert || dayData.hasSuccess) && (
                      <View style={[
                        styles.indicator,
                        dayData.hasPrimary ? styles.primaryIndicator : null,
                        dayData.hasAlert ? styles.alertIndicator : null,
                        dayData.hasSuccess ? styles.successIndicator : null
                      ]} />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

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
  topAppBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingBottom: 8,
    backgroundColor: '#101922', // background-dark
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topAppBarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  addButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    color: '#FFFFFF',
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
