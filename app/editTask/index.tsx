import type { taskTemplates } from "@/db";

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Platform } from 'react-native';
import NavBar from '@/components/navBar';
import CustomInput from "@/components/customInput";


// Define types
interface Subtask {
  id: string;
  text: string;
  completed: boolean;
}

interface Props {
  id?: number;
}

const EditTaskScreen = ({ id }: Props) => {
  const [task, setTask] = useState<typeof taskTemplates.$inferInsert>({
    id: 0,
    userId: 0,
    title: '',
    rewardPoints: 10,
    repeatMode: 'daily',
    endCondition: 'manual',
    description: null,
    repeatInterval: null,
    repeatDaysOfWeek: null,
    repeatDaysOfMonth: null,
    endValue: null,
    enabled: true,
  });
  // const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [rewardPoints, setRewardPoints] = useState(10);
  const [repeatOption, setRepeatOption] = useState('Daily');
  const [endsOption, setEndsOption] = useState('Never');
  const [subtasks, setSubtasks] = useState<Subtask[]>([
    { id: '1', text: 'Read Chapter 1', completed: true },
  ]);
  const [newSubtaskText, setNewSubtaskText] = useState('');

  const addSubtask = () => {
    if (newSubtaskText.trim()) {
      const newSubtask: Subtask = {
        id: Date.now().toString(),
        text: newSubtaskText.trim(),
        completed: false,
      };
      setSubtasks([...subtasks, newSubtask]);
      setNewSubtaskText('');
    }
  };

  const toggleSubtask = (id: string) => {
    setSubtasks(subtasks.map(subtask =>
      subtask.id === id ? { ...subtask, completed: !subtask.completed } : subtask
    ));
  };

  const deleteSubtask = (id: string) => {
    setSubtasks(subtasks.filter(subtask => subtask.id !== id));
  };

  useEffect(() => {
    if (!id) return;
    // 获取task内容
    // getTask();
    // setTask();
  })

  return (
    <View style={styles.container}>
      <NavBar title="Create Task" back />

      {/* Main Content */}
      <ScrollView style={styles.mainContent} contentContainerStyle={styles.scrollContent}>
        {/* Main Task Details Card */}
        <View style={styles.card}>
          <Text style={styles.inputLabel}>Task Name</Text>
          <CustomInput
            style={styles.textInput}
            placeholder="e.g., Read for 30 minutes"
            value={task.title}
            onChangeText={(title) => setTask({ ...task, title })}
          />
          {/* <TextInput */}
          {/*   placeholderTextColor="#777" */}
          {/*   style={styles.textInput} */}
          {/*   placeholder="e.g., Read for 30 minutes" */}
          {/*   value={task.title} */}
          {/*   onChangeText={(title) => setTask({ ...task, title })} */}
          {/* /> */}

          <Text style={styles.inputLabel}>Description (optional)</Text>
          <TextInput
            style={styles.textArea}
            placeholder="e.g., Finish 'Atomic Habits'"
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
          />

          <View style={styles.pointsRow}>
            <View style={styles.pointsLeft}>
              <View style={styles.rewardIcon}>
                <Text style={styles.rewardIconText}>⭐</Text>
              </View>
              <Text style={styles.pointsLabel}>Reward Points</Text>
            </View>
            <View style={styles.pointsControls}>
              <TouchableOpacity
                style={styles.pointsButton}
                onPress={() => setRewardPoints(Math.max(0, rewardPoints - 1))}
              >
                <Text style={styles.pointsButtonText}>-</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.pointsInput}
                value={rewardPoints.toString()}
                onChangeText={(text) => setRewardPoints(Number(text) || 0)}
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={styles.pointsButton}
                onPress={() => setRewardPoints(rewardPoints + 1)}
              >
                <Text style={styles.pointsButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Scheduling Section Card */}
        <View>
          <Text style={styles.sectionTitle}>Scheduling</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.scheduleButton} onPress={() => { }}>
              <View style={styles.scheduleLeft}>
                <View style={styles.scheduleIcon}>
                  <Text style={styles.scheduleIconText}>🔄</Text>
                </View>
                <Text style={styles.scheduleLabel}>Repeat</Text>
              </View>
              <View style={styles.scheduleRight}>
                <Text style={styles.scheduleValue}>{repeatOption}</Text>
                <Text style={styles.chevron}>›</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.scheduleButton} onPress={() => { }}>
              <View style={styles.scheduleLeft}>
                <View style={styles.scheduleIcon}>
                  <Text style={styles.scheduleIconText}>📅</Text>
                </View>
                <Text style={styles.scheduleLabel}>Ends</Text>
              </View>
              <View style={styles.scheduleRight}>
                <Text style={styles.scheduleValue}>{endsOption}</Text>
                <Text style={styles.chevron}>›</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Subtasks Section Card */}
        <View>
          <Text style={styles.sectionTitle}>Checklist</Text>
          <View style={styles.card}>
            <View style={styles.subtaskRow}>
              <Text style={styles.radioButton}>{newSubtaskText ? '○' : '○'}</Text>
              <TextInput
                style={styles.subtaskInput}
                placeholder="Add a subtask"
                value={newSubtaskText}
                onChangeText={setNewSubtaskText}
                onEndEditing={addSubtask}
              />
            </View>

            {subtasks.map((subtask) => (
              <View key={subtask.id} style={[styles.subtaskRow, subtask.completed ? styles.completedSubtask : null]}>
                <TouchableOpacity onPress={() => toggleSubtask(subtask.id)}>
                  <Text style={styles.checkCircle}>
                    {subtask.completed ? '●' : '○'}
                  </Text>
                </TouchableOpacity>
                <TextInput
                  style={[styles.subtaskInput, subtask.completed ? styles.completedText : null]}
                  value={subtask.text}
                  onChangeText={(text) => {
                    setSubtasks(subtasks.map(s =>
                      s.id === subtask.id ? { ...s, text } : s
                    ));
                  }}
                  editable={!subtask.completed}
                />
                <TouchableOpacity onPress={() => deleteSubtask(subtask.id)}>
                  <Text style={styles.deleteIcon}>🗑️</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Create Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101922', // dark background
  },
  topAppBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#101922',
    padding: 16,
    paddingBottom: 8,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#b0b0b0',
    fontSize: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
    position: 'absolute',
    left: 60,
    right: 60,
    top: 20,
  },
  placeholder: {
    width: 48,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  scrollContent: {
    paddingBottom: 100, // Extra padding to account for bottom button
  },
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)', // dark: bg-slate-800/50
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff', // dark:text-white
    paddingBottom: 8,
  },
  textInput: {
    height: 56,
    backgroundColor: 'rgba(15, 23, 42, 0.7)', // dark:bg-slate-900/70
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  textArea: {
    height: 96,
    backgroundColor: 'rgba(15, 23, 42, 0.7)', // dark:bg-slate-900/70
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
    fontSize: 16,
    color: '#ffffff', // dark:text-white
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    minHeight: 56,
  },
  pointsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  rewardIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(250, 204, 21, 0.2)', // bg-yellow-400/20
    alignItems: 'center',
    justifyContent: 'center',
  },
  rewardIconText: {
    color: '#facc15', // text-yellow-400
    fontSize: 20,
  },
  pointsLabel: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#ffffff', // dark:text-white
  },
  pointsControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pointsButton: {
    width: 32,
    height: 32,
    borderRadius: 100,
    backgroundColor: 'rgba(15, 23, 42, 0.7)', // dark:bg-slate-900/70
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointsButtonText: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 16,
    color: '#ffffff', // dark:text-white
  },
  pointsInput: {
    width: 32,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 16,
    color: '#ffffff', // dark:text-white
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff', // dark:text-white
    paddingHorizontal: 8,
    paddingBottom: 8,
    paddingTop: 16,
  },
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: 'rgba(30, 41, 59, 0.4)', // dark:bg-slate-800/40
    paddingHorizontal: 16,
    minHeight: 56,
    justifyContent: 'space-between',
  },
  scheduleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  scheduleIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(43, 140, 238, 0.2)', // bg-primary/20
    alignItems: 'center',
    justifyContent: 'center',
  },
  scheduleIconText: {
    color: '#2b8cee', // text-primary
    fontSize: 20,
  },
  scheduleLabel: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#ffffff', // dark:text-white
    flex: 1,
  },
  scheduleRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scheduleValue: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#94a3b8', // dark:text-slate-400
  },
  chevron: {
    fontSize: 24,
    color: '#94a3b8', // dark:text-slate-400
  },
  subtaskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 40,
  },
  completedSubtask: {
    opacity: 0.6,
  },
  radioButton: {
    fontSize: 24,
    color: '#94a3b8', // dark:text-slate-400
  },
  checkCircle: {
    fontSize: 24,
    color: '#94a3b8', // dark:text-slate-400
  },
  subtaskInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 16,
    color: '#ffffff', // dark:text-white
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    padding: 0,
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  deleteIcon: {
    color: '#94a3b8', // dark:text-slate-400
    fontSize: 20,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 16,
    paddingBottom: 36,
    // Adding a gradient overlay effect (simulating the HTML gradient)
    backgroundColor: 'transparent',
  },
  createButton: {
    height: 56,
    backgroundColor: '#2b8cee', // bg-primary
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2b8cee',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5, // For Android shadow
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff', // text-white
  },
});

export default EditTaskScreen;
