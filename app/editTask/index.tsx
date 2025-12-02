import type { taskTemplates } from "@/db";
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Switch } from 'react-native';
import { getEmptyTaskTemplates } from "./lib"
import { useCustomState } from "@/hooks/state";
import { useTheme } from "@/context/theme";
import NavBar from '@/components/navBar';
import CustomInput from "@/components/customInput";
import Scheduling from "@/components/Scheduling"
import RewardPoint from "./components/rewardPoint";
import Subtask from "./components/subTask";

interface Props {
  id?: number;
}

export default function EditTaskScreen({ id }: Props) {
  const [task, setTask, updateTask] = useCustomState<typeof taskTemplates.$inferInsert>(getEmptyTaskTemplates());
  const { colors, size } = useTheme();

  useEffect(() => {
    if (!id) return;
    // 获取task内容
    // getTask();
    // setTask();
  })

  const handleSave = () => {
    console.log('task', task);
  }

  return (
    <View style={styles.container}>
      <NavBar title="Create Task" back />

      {/* Main Content */}
      <ScrollView style={styles.mainContent} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.inputLabel}>Task Name</Text>
        <CustomInput
          placeholder="e.g., Read for 30 minutes"
          value={task.title}
          onChangeText={(val) => updateTask("title", val)}
        />
        <Text style={styles.inputLabel}>Description (optional)</Text>
        <CustomInput
          placeholder="e.g., Finish 'Atomic Habits'"
          value={task.description || ''}
          onChangeText={(val) => updateTask("description", val)}
          multiline
          textAlignVertical="top"
        />
        <RewardPoint value={task.rewardPoints} onChange={(rewardPoints) => setTask((prev) => ({ ...prev, rewardPoints }))} />

        <Scheduling
          replenishmentMode={task.repeatMode || 'none'}
          replenishmentInterval={task.repeatInterval || 0}
          replenishmentDaysOfWeek={task.repeatDaysOfWeek || ''}
          replenishmentDaysOfMonth={task.repeatDaysOfMonth || ''}
          onReplenishmentModeChange={(repeatMode) =>
            setTask((prev) => ({ ...prev, repeatMode }))
          }
          onReplenishmentIntervalChange={(repeatInterval) =>
            setTask((prev) => ({ ...prev, repeatInterval }))
          }
          onReplenishmentDaysOfWeekChange={(repeatDaysOfWeek) =>
            setTask((prev) => ({ ...prev, repeatDaysOfWeek }))
          }
          onReplenishmentDaysOfMonthChange={(repeatDaysOfMonth) =>
            setTask((prev) => ({ ...prev, repeatDaysOfMonth }))
          }
        />

        {/* subTask section */}
        <Text style={styles.inputLabel}>Subtask</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.inputLabel}>Random</Text>
          <Switch
            value={task.isRandomSubtask}
            onValueChange={(isRandomSubtask) => setTask(prev => ({ ...prev, isRandomSubtask }))}
            trackColor={{ false: colors.fill, true: colors.primary }}
            thumbColor={task.isRandomSubtask ? colors.text : colors.dimText}
          />
        </View>
        <Subtask value={task.subtasks || []} onChange={(subtasks) => setTask((prev) => ({ ...prev, subtasks }))} />
      </ScrollView>

      {/* Bottom CTA Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.createButton} onPress={handleSave}>
          <Text style={styles.createButtonText}>Create Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
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
  mainContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  scrollContent: {
    paddingBottom: 100, // Extra padding to account for bottom button
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff', // dark:text-white
    paddingBottom: 8,
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
