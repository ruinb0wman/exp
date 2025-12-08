import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { useTheme } from "@/context/theme";

interface Props {
  onPress: () => void;
}

export default function Button({ onPress }: Props) {
  const styles = useStyles();
  return (
    <View style={styles.bottomButtonContainer}>
      <TouchableOpacity style={styles.createButton} onPress={onPress}>
        <Text style={styles.createButtonText}>Create Task</Text>
      </TouchableOpacity>
    </View>
  )
}

function useStyles() {
  const { colors, size } = useTheme();

  return StyleSheet.create({
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
  })
}
