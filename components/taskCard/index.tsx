import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '@/app/(tabs)/index';

interface Props {
  task: Task;
  onPress: (task: Task) => void;
}

export default function TaskCard({ task, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.taskItem,
        task.completed ? styles.completedTask : {}
      ]}
      onPress={() => onPress(task)}
    >
      <View style={styles.taskContent}>
        <TouchableOpacity style={styles.checkboxContainer}>
          <View style={[
            styles.checkbox,
            task.completed ? styles.checkedCheckbox : {}
          ]}>
            {task.completed && (
              <Text style={styles.checkmark}>✓</Text>
            )}
          </View>
        </TouchableOpacity>

        <View style={styles.taskDetails}>
          <Text
            style={[
              styles.taskTitle,
              task.completed ? styles.completedTaskTitle : {}
            ]}
          >
            {task.title}
          </Text>
          <Text
            style={[
              styles.taskDescription,
              task.completed ? styles.completedTaskDescription : {}
            ]}
          >
            {task.description}
          </Text>
        </View>
      </View>

      <View style={styles.taskIcon}>
        <Text style={styles.chevronIcon}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});
