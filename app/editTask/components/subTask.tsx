import { useState } from "react";
import { View, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useTheme } from "@/context/theme";
import { CircleX } from "lucide-react-native";

interface SubtaskProps {
  value: string[];
  onChange?: (newValues: string[]) => void;
}

export default function Subtask({ value, onChange }: SubtaskProps) {
  const [newSubtaskText, setNewSubtaskText] = useState('');
  const { colors, size } = useTheme();
  const styles = useStyles();

  const addSubtask = () => {
    if (newSubtaskText.trim()) {
      const updated = [...value, newSubtaskText.trim()];
      onChange && onChange(updated);
      setNewSubtaskText('');
    }
  };

  const updateSubtask = (index: number, text: string) => {
    const updated = [...value];
    updated[index] = text;
    onChange && onChange(updated);
  };

  const deleteSubtask = (index: number) => {
    const updated = value.filter((_, i) => i !== index);
    onChange && onChange(updated);
  };

  return (
    <View style={styles.container}>
      {/* Add new subtask */}
      <View style={[styles.subtaskRow, value.length ? styles.addTaskRow : null]}>
        <TextInput
          style={styles.subtaskInput}
          placeholder="Add a subtask"
          placeholderTextColor={colors.placeholder}
          value={newSubtaskText}
          onChangeText={setNewSubtaskText}
          onEndEditing={addSubtask}
          onSubmitEditing={addSubtask}
        />
      </View>

      {/* Render existing subtasks */}
      {value.map((text, index) => (
        <View key={index} style={styles.subtaskRow}>
          <TextInput
            style={styles.subtaskInput}
            value={text}
            onChangeText={(newText) => updateSubtask(index, newText)}
          />
          <TouchableOpacity onPress={() => deleteSubtask(index)}>
            <CircleX size={size.icon} color={colors.dimText} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

function useStyles() {
  const { colors, size } = useTheme();

  return StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: colors.lightBorder,
      borderRadius: 8,
      paddingHorizontal: 15,
      backgroundColor: colors.fill,
    },
    addTaskRow: {
      borderBottomWidth: 1,
      borderColor: colors.lightBorder,
      marginBottom: size.smallSpacing
    },
    subtaskRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      minHeight: 40,
    },
    subtaskInput: {
      flex: 1,
      fontSize: 16,
      color: '#ffffff',
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
      padding: 0,
    },
  });
}
