import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '@/app/(tabs)/index';
import Checkbox from "@/components/checkbox"
import { ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/context/theme';

interface Props {
  task: Task;
  onPress: (task: Task) => void;
}

export default function TaskCard({ task, onPress }: Props) {
  const { colors, size } = useTheme();
  const styles = useStyles();
  return (
    <TouchableOpacity
      style={[
        styles.taskItem,

      ]}
      onPress={() => onPress(task)}
    >
      <View style={styles.taskContent}>
        <Checkbox checked={task.completed} />

        <View style={[styles.taskDetails, task.completed ? styles.completedTask : {}]}>
          <Text
            style={[
              styles.taskTitle,
              task.completed ? styles.completedTaskTitle : {}
            ]}
          >
            {task.title}
          </Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={[
              styles.taskDescription,
              task.completed ? styles.completedTaskDescription : {}
            ]}
          >
            {task.description}
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


