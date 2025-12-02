import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { router } from "expo-router";
import { useCallback } from "react";
import { useDbContext } from "@/context/db";
import { useFocusEffect } from "@react-navigation/native";
import TaskDetail from '@/components/taskDetail';
import TaskCard from '@/components/taskCard';
import { Plus } from 'lucide-react-native';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  experience: number;
}

export default function Index() {
  const { canUseDB } = useDbContext();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDetailVisible, setIsTaskDetailVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      console.log('in', canUseDB, performance.now());
      if (!canUseDB) return;
    }, [canUseDB]))

  // Sample tasks data
  const tasks: Task[] = mock.tasks;

  // Calculate completed tasks
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  // User data
  const userProfile = mock.userProfile;

  const handleTaskPress = (task: Task) => {
    setSelectedTask(task);
    setIsTaskDetailVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.userSection}>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Exp</Text>
              <Text style={styles.greeting}>Good Morning!</Text>
            </View>
          </View>

          <View style={styles.expSection}>
            <View style={styles.starIcon}>
              <Text style={styles.starIconText}>⭐</Text>
            </View>
            <Text style={styles.expText}>{userProfile.exp.toLocaleString()} exp</Text>
          </View>
        </View>

        {/* Progress Section */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            You've completed {completedTasks} of {totalTasks} tasks today.
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${progressPercentage}%` }
              ]}
            />
          </View>
        </View>

        {/* Tasks Section */}
        <View style={styles.tasksSection}>
          <View style={styles.tasksHeader}>
            <Text style={styles.tasksTitle}>Today's Tasks</Text>
            <TouchableOpacity style={styles.allTasksButton}>
              <Text style={styles.allTasksIcon}>📋</Text>
              <Text style={styles.allTasksText}>All Tasks</Text>
            </TouchableOpacity>
          </View>

          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onPress={handleTaskPress}
            />
          ))}
        </View>
      </ScrollView>

      {/* Add Task Button */}
      <TouchableOpacity style={styles.fab} onPress={() => router.push('/editTask')}>
        <Plus size={32} color="#fff" />
      </TouchableOpacity>

      {/* Task Detail Modal */}
      {selectedTask && (
        <TaskDetail
          visible={isTaskDetailVisible}
          onClose={() => setIsTaskDetailVisible(false)}
          task={selectedTask}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 50, // Extra padding to account for bottom nav
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  userInfo: {
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 14,
    color: '#A1A1AA', // zinc-400
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  userName: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Inter',
    fontWeight: '700',
  },
  expSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#2b8cee1a', // primary/10
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 24,
  },
  starIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  starIconText: {
    fontSize: 18,
    color: '#2b8cee', // primary
  },
  expText: {
    fontSize: 14,
    color: '#2b8cee', // primary
    fontFamily: 'Inter',
    fontWeight: '700',
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter',
    fontWeight: '400',
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#3F3F46', // zinc-700
    borderRadius: 9999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2b8cee', // primary
    borderRadius: 9999,
  },
  tasksSection: {
    flex: 1,
  },
  tasksHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tasksTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Inter',
    fontWeight: '700',
  },
  allTasksButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#2b8cee1a', // primary/10
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 24,
  },
  allTasksIcon: {
    fontSize: 18,
    color: '#2b8cee', // primary
  },
  allTasksText: {
    fontSize: 14,
    color: '#2b8cee', // primary
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1F293780', // zinc-800/50
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    minHeight: 72,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  completedTask: {
    opacity: 0.6,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkboxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 28,
    height: 28,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#A1A1AA', // zinc-400
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  checkedCheckbox: {
    backgroundColor: '#2b8cee', // primary
    borderColor: '#2b8cee', // primary
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  taskDetails: {
    justifyContent: 'center',
    marginLeft: 16,
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter',
    fontWeight: '500',
    marginBottom: 4,
  },
  completedTaskTitle: {
    textDecorationLine: 'line-through',
  },
  taskDescription: {
    fontSize: 14,
    color: '#A1A1AA', // zinc-400
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  completedTaskDescription: {
    textDecorationLine: 'line-through',
  },
  taskIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 28,
    height: 28,
  },
  chevronIcon: {
    fontSize: 24,
    color: '#A1A1AA', // zinc-400
  },
  fab: {
    position: 'absolute',
    bottom: 80, // Above the bottom nav
    right: 16,
    width: 56,
    height: 56,
    backgroundColor: '#2b8cee', // primary
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#1F2937CC', // zinc-800/80 with backdrop blur effect
    borderTopWidth: 1,
    borderTopColor: '#3F3F46', // zinc-700
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  navItem: {
    alignItems: 'center',
    width: 64,
  },
  activeNavItem: {
    // No additional styles needed, handled by icon color
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
    color: '#A1A1AA', // zinc-400
  },
  activeNavIcon: {
    color: '#2b8cee', // primary
  },
  navLabel: {
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#A1A1AA', // zinc-400
  },
  activeNavLabel: {
    color: '#2b8cee', // primary
  },
});

const mock = {
  tasks: [
    {
      id: 1,
      title: 'Morning Jogging',
      description: '30-minute run around the park (+20 exp)',
      completed: true,
      experience: 20
    },
    {
      id: 2,
      title: 'Read a Chapter',
      description: 'Read at least one chapter of \'Atomic Habits\' (+15 exp)',
      completed: true,
      experience: 15
    },
    {
      id: 3,
      title: 'Plan Tomorrow',
      description: 'Organize tasks and schedule for the next day (+10 exp)',
      completed: true,
      experience: 10
    },
    {
      id: 4,
      title: 'Drink 8 glasses of water',
      description: 'Stay hydrated throughout the day (+5 exp)',
      completed: false,
      experience: 5
    },
    {
      id: 5,
      title: 'Practice coding for 1 hour',
      description: 'Work on a personal project or do a coding challenge (+30 exp)Work on a personal project or do a coding challenge (+30 exp)',
      completed: false,
      experience: 30
    }
  ],
  userProfile: {
    name: 'Alex',
    exp: 1250,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8FjyggINvGTsj3CN9aCnRyxyz3E1lEwJCD3Y1HbCZLlN6WfHd3JAMChioB-ZaCXw4SFCVUBNy2lgc8YOw2sXiZD0TGBZFU4SzcUDHoP0z2kF4wsCkbDAFnnniBFe5WAtf4M6NvsT1PSMVpVhNN08XPiok-3VwhphQB74YPpts56bUPuOO29J9hQY4NdWFEc2jrV-eK8vTOYt1l5jom1-6HCqMdg6Q6-BcTSk_mBkdZQqfwks17cmrDJKX5HMdPatyuHq0kypYywU'
  }
}
