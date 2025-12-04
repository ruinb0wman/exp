import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Plus } from 'lucide-react-native';
import { router } from "expo-router";
import TaskDetail from '@/components/taskDetail';
import TaskCard from '@/components/taskCard';
import Label from "@/components/Label";
import Header from "@/components/TabsIndexHeader";
import Progress from "@/components/TabsIndexProgress"
import { getAllTaskTemplates, getAllTaskInstance } from '@/db/services';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  experience: number;
}

export default function Index() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDetailVisible, setIsTaskDetailVisible] = useState(false);
  // const [tasks, setTasks] = useState<typeof taskTemplates.$inferInsert[]>([]);

  useEffect(() => {
    getAllTaskInstance();
  }, [])

  // Sample tasks data
  const tasks: Task[] = mock.tasks;

  // Calculate completed tasks
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  // User data
  const userProfile = mock.userProfile;

  const handleTaskPress = (task: Task) => {
    setSelectedTask(task);
    setIsTaskDetailVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Header exp={userProfile.exp} />
        <Progress complete={completedTasks} total={totalTasks} />

        {/* Tasks Section */}
        <View style={styles.tasksSection}>
          <View style={styles.tasksHeader}>
            <Label textStyle={{ fontSize: 20 }} rightNode={
              <TouchableOpacity style={styles.allTasksButton} onPress={() => router.push('/taskTemplates')}>
                <Text style={styles.allTasksIcon}>📋</Text>
                <Text style={styles.allTasksText}>All Tasks</Text>
              </TouchableOpacity>
            }>Today's Tasks</Label>
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
    paddingBottom: 50,
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
    backgroundColor: '#2b8cee1a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 24,
  },
  allTasksIcon: {
    fontSize: 18,
    color: '#2b8cee',
  },
  allTasksText: {
    fontSize: 14,
    color: '#2b8cee',
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 16,
    width: 56,
    height: 56,
    backgroundColor: '#2b8cee',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});;

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
