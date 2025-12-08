import type { taskTemplates } from "@/db";

import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Trash } from "lucide-react-native";
import { useRouter } from "expo-router";
import NavBar from '@/components/navBar';
import CustomInput from "@/components/customInput";
import Scheduling from "@/components/Scheduling";
import Label from "@/components/Label";
import Button from "@/components/Button"
import Confirm from "@/components/Confirm";
import { useCustomState } from "@/hooks/state";
import { useTheme } from "@/context/theme";
import { useUserStore } from "@/store/users";
import { createTaskTemplate, getTaskTemplate, updateTaskTemplate, deleteTaskTemplate } from "@/db/services";
import RewardPoint from "./components/rewardPoint";
import Subtask from "./components/subTask";
import RandomTaskSwitch from "./components/randomTaskSwitcher";
import { getEmptyTaskTemplates } from "./lib";
import { useLocalSearchParams } from 'expo-router';

interface Props {
  id?: number;
}

export default function EditTaskScreen({ id }: Props) {
  const { userInfo } = useUserStore();
  const [task, setTask, updateTask] = useCustomState<typeof taskTemplates.$inferInsert>(getEmptyTaskTemplates(userInfo!));
  const [showConfirm, setShowConfirm] = useState(false);
  const params = useLocalSearchParams();
  const { colors } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (!params.id) return;
    getTaskTemplate(Number(params.id))?.then((res) => { setTask(res[0]) })
  }, [id]);

  const handleSave = async () => {
    console.log('task', task);
    let result;
    if (params.id) {
      result = await updateTaskTemplate(Number(params.id), task);
    } else {
      result = await createTaskTemplate(task);
    }
    console.log('result', result);
  };

  const handleDelete = async () => {
    console.log('handleDelete', params.id);
    await deleteTaskTemplate(Number(params.id));
    router.back();
  }

  return (
    <View style={styles.container}>
      <NavBar title={params.id ? 'Edit Task' : "Create Task"} back
        rightNode={
          params.id && <TouchableOpacity onPress={() => setShowConfirm(true)}><Trash color={colors.danger} /></TouchableOpacity>
        }
      />

      <KeyboardAwareScrollView
        style={styles.mainContent} contentContainerStyle={styles.scrollContent}
        bottomOffset={16}
      >
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
      </KeyboardAwareScrollView>

      <Button onPress={handleSave} />
      <Confirm title="Delete task" description="This operation will remove all related tasks" visible={showConfirm} onConfirm={() => { setShowConfirm(false); handleDelete() }} onCancel={() => setShowConfirm(false)} />
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
});
