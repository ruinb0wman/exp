import type { taskTemplates } from "@/db";
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import NavBar from '@/components/navBar';
import CustomInput from "@/components/customInput";
import Scheduling from "@/components/Scheduling";
import Label from "@/components/Label";
import { useCustomState } from "@/hooks/state";
import RewardPoint from "./components/rewardPoint";
import Subtask from "./components/subTask";
import RandomTaskSwitch from "./components/randomTaskSwitcher";
import { getEmptyTaskTemplates } from "./lib";

interface Props {
  id?: number;
}

export default function EditTaskScreen({ id }: Props) {
  const [task, setTask, updateTask] = useCustomState<typeof taskTemplates.$inferInsert>(getEmptyTaskTemplates());

  useEffect(() => {
    if (!id) return;
    // TODO: Fetch task by id and setTask(...)
  }, [id]);

  const handleSave = () => {
    console.log('task', task);
  };

  return (
    <View style={styles.container}>
      <NavBar title="Create Task" back />

      <ScrollView style={styles.mainContent} contentContainerStyle={styles.scrollContent}>
        <Label>Task Name</Label>
        <CustomInput
          placeholder="e.g., Read for 30 minutes"
          value={task.title}
          onChangeText={(val) => updateTask("title", val)}
        />

        <Label>Description (optional)</Label>
        <CustomInput
          placeholder="e.g., Finish 'Atomic Habits'"
          value={task.description || ''}
          onChangeText={(val) => updateTask("description", val)}
          multiline
          textAlignVertical="top"
        />

        <RewardPoint
          value={task.rewardPoints}
          onChange={(rewardPoints) => setTask((prev) => ({ ...prev, rewardPoints }))}
        />

        <Scheduling
          mode={task.repeatMode ?? 'none'}
          interval={task.repeatInterval ?? null}
          daysOfWeek={task.repeatDaysOfWeek ?? null}
          daysOfMonth={task.repeatDaysOfMonth ?? null}
          onModeChange={(repeatMode) => setTask((prev) => ({ ...prev, repeatMode }))}
          onIntervalChange={(repeatInterval) => setTask((prev) => ({ ...prev, repeatInterval }))}
          onDaysOfWeekChange={(repeatDaysOfWeek) => setTask((prev) => ({ ...prev, repeatDaysOfWeek }))}
          onDaysOfMonthChange={(repeatDaysOfMonth) => setTask((prev) => ({ ...prev, repeatDaysOfMonth }))}
        />

        <Label>Subtask</Label>
        <Subtask
          value={task.subtasks || []}
          onChange={(subtasks) => setTask((prev) => ({ ...prev, subtasks }))}
        />
        {task.subtasks?.length ? <RandomTaskSwitch value={task.isRandomSubtask || false}
          onChange={(isRandomSubtask) => setTask((prev) => ({ ...prev, isRandomSubtask }))}
        /> : null
        }
      </ScrollView>

      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.createButton} onPress={handleSave}>
          <Text style={styles.createButtonText}>Create Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
  },
  mainContent: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 16,
    paddingBottom: 36,
  },
  createButton: {
    height: 56,
    backgroundColor: '#2b8cee',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2b8cee',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
