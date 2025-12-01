import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";

interface Props {
  onChange?: (val: number) => void
  value: number
}

export default function RewardPoint({ onChange, value }: Props) {

  return (
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
          onPress={() => onChange && onChange(Math.max(0, value - 1))}
        >
          <Text style={styles.pointsButtonText}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.pointsInput}
          value={value.toString()}
          onChangeText={(text) => onChange && onChange(Number(text) || 0)}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.pointsButton}
          onPress={() => onChange && onChange(value + 1)}
        >
          <Text style={styles.pointsButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
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
});
