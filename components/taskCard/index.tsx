import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Checkbox from "@/components/checkbox"
import { ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/context/theme';
import { taskInstances, taskTemplates } from '@/db';

export interface Task {
  task_instances: typeof taskInstances.$inferSelect;
  task_templates: typeof taskTemplates.$inferSelect | null;
}

export type TaskStatus = 'pending' | 'completed' | 'skipped';

export interface OnChangeProps {
  id: number;
  status: TaskStatus;
}

interface Props {
  task: Task;
  onPress: (task: Task) => void;
  onChange?: (value: OnChangeProps) => void;
}

export default function TaskCard({ task, onPress, onChange }: Props) {
  const { colors, size } = useTheme();
  const styles = useStyles();

  const handleChangeStatus = () => {
    let newStatus: TaskStatus;
    if (task.task_instances.status == 'completed') {
      newStatus = 'pending';
    } else {
      newStatus = 'completed';
    }

    onChange && onChange({ id: task.task_instances.id, status: newStatus });
  }

  return (
    <TouchableOpacity
      style={[styles.taskItem,]}
      onPress={() => onPress(task)}
    >
      <View style={styles.taskContent}>
        <Checkbox checked={task.task_instances.status == 'completed'} onPress={handleChangeStatus} />

        <View style={[styles.taskDetails, task.task_instances.status == 'completed' ? styles.completedTask : {}]}>
          <Text
            style={[
              styles.taskTitle,
              task.task_instances.status == 'completed' ? styles.completedTaskTitle : {}
            ]}
          >
            {task.task_templates?.title}
          </Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={[
              styles.taskDescription,
              task.task_instances.status == 'completed' ? styles.completedTaskDescription : {}
            ]}
          >
            {task.task_templates?.description}
          </Text>
        </View>
      </View>
      <ChevronRight color={colors.dimText} size={size.bigIcon} />
    </TouchableOpacity>
  );
};

function useStyles() {
  const { colors, size } = useTheme();

  return StyleSheet.create({
    taskItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.fill, // zinc-800/50
      borderRadius: size.lRadius,
      padding: size.smallSpacing,
      marginBottom: size.spacing,
      minHeight: size.text * 6,
    },
    completedTask: {
      opacity: 0.6,
    },
    taskContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    taskDetails: {
      justifyContent: 'center',
      marginLeft: 16,
      flex: 1,
    },
    taskTitle: {
      fontSize: size.text,
      color: '#FFFFFF',
      fontFamily: 'Inter',
      fontWeight: '500',
      marginBottom: size.eSmallSpacing,
    },
    completedTaskTitle: {
      textDecorationLine: 'line-through',
    },
    taskDescription: {
      fontSize: size.smallText,
      color: '#A1A1AA', // zinc-400
      fontFamily: 'Inter',
      fontWeight: '400',
    },
    completedTaskDescription: {
      textDecorationLine: 'line-through',
    },
  });
}


