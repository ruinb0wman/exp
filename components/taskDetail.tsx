import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Popup from './popup';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  experience: number;
}

interface TaskDetailProps {
  visible: boolean;
  onClose: () => void;
  task: Task;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ visible, onClose, task }) => {
  // Mock additional data
  const repetition = "Daily";
  const endCondition = "Never";
  const nextDue = "Today, 5:00 PM";

  const handleCompleteTask = () => {
    // Complete task logic here
    console.log("Task completed!");
    onClose();
  };

  return (
    <Popup visible={visible} onClose={onClose}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{task.title}</Text>
          <View style={styles.experienceContainer}>
            <Text style={styles.starIcon}>⭐</Text>
            <Text style={styles.experienceText}>+{task.experience} exp</Text>
          </View>
        </View>

        <Text style={styles.description}>{task.description}</Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.icon}>🔁</Text>
            <View style={styles.infoTextContainer}>
              <Text style={styles.label}>Repetition</Text>
              <Text style={styles.value}>{repetition}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.icon}>🏁</Text>
            <View style={styles.infoTextContainer}>
              <Text style={styles.label}>End Condition</Text>
              <Text style={styles.value}>{endCondition}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.icon}>📅</Text>
            <View style={styles.infoTextContainer}>
              <Text style={styles.label}>Next Due</Text>
              <Text style={styles.value}>{nextDue}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.completeButton} onPress={handleCompleteTask}>
          <Text style={styles.completeButtonText}>Complete Task</Text>
        </TouchableOpacity>
      </ScrollView>
    </Popup>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
    paddingRight: 16,
  },
  experienceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2b8cee1a',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  experienceText: {
    color: '#2b8cee',
    fontWeight: 'bold',
    fontSize: 14,
  },
  starIcon: {
    fontSize: 16,
    marginRight: 4,
    color: '#2b8cee',
  },
  description: {
    color: '#6b7280',
    fontSize: 16,
    marginBottom: 24,
    lineHeight: 24,
  },
  infoContainer: {
    marginBottom: 32,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 24,
    marginRight: 16,
    color: '#6b7280',
  },
  infoTextContainer: {},
  label: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  completeButton: {
    backgroundColor: '#2b8cee',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TaskDetail;
