import { View, Text, StyleSheet } from 'react-native';

interface Props {
  complete: number;
  total: number;
}

export default function Progress({ complete, total }: Props) {
  const styles = useStyles();

  return (
    <View style={styles.progressContainer}>
      <Text style={styles.progressText}>
        You've completed {complete} of {total} tasks today.
      </Text>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${complete / total * 100}%` }
          ]}
        />
      </View>
    </View>
  )
}

function useStyles() {
  return StyleSheet.create({
    progressContainer: {
      marginBottom: 24,
    },
    progressText: {
      fontSize: 16,
      color: '#FFFFFF',
      fontFamily: 'Inter',
      fontWeight: '400',
      marginBottom: 8,
    },
    progressBar: {
      width: '100%',
      height: 8,
      backgroundColor: '#3F3F46',
      borderRadius: 9999,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#2b8cee',
      borderRadius: 9999,
    },
  })
}
