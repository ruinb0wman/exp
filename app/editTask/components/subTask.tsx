import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
// Define types
interface Subtask {
  id: string;
  text: string;
  completed: boolean;
}

export default function Subtask() {
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
  return (
    < View >
      <View >
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
    </View >
  )
}
const styles = StyleSheet.create({
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
});
