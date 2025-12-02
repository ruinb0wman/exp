import { View, Text, StyleSheet } from 'react-native';
import OptionPicker from '@/components/optionsPicker';
import CustomInput from '@/components/customInput';
import Label from '@/components/Label';
import { useTheme } from '@/context/theme';

type Mode = 'none' | 'daily' | 'weekly' | 'monthly';

interface Props {
  mode: Mode;
  interval: number | null;
  daysOfWeek: string | null;
  daysOfMonth: string | null;
  onModeChange: (mode: Mode) => void;
  onIntervalChange: (value: number | null) => void;
  onDaysOfWeekChange: (value: string | null) => void;
  onDaysOfMonthChange: (value: string | null) => void;
}

export default function RestockSettingsSection({
  mode,
  interval,
  daysOfWeek,
  daysOfMonth,
  onModeChange,
  onIntervalChange,
  onDaysOfWeekChange,
  onDaysOfMonthChange,
}: Props) {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Label>Scheduling</Label>
      <OptionPicker
        options={[
          { label: 'None', key: 'none' },
          { label: 'Daily', key: 'daily' },
          { label: 'Weekly', key: 'weekly' },
          { label: 'Monthly', key: 'monthly' },
        ]}
        value={mode || 'none'}
        onChange={(selected) => {
          const selectedKey = Object.keys(selected)[0] || 'none';
          onModeChange(selectedKey as Mode);
        }}
      />

      {mode === 'daily' && (
        <>
          <Text style={[styles.label, { marginTop: 16 }]}>Restock Interval (days)</Text>
          <CustomInput
            placeholder="e.g., 1 (every 1 day)"
            value={interval?.toString() || ''}
            onChangeText={(text) =>
              onIntervalChange(text ? parseInt(text, 10) : null)
            }
            keyboardType="numeric"
          />
        </>
      )}

      {mode === 'weekly' && (
        <>
          <Text style={[styles.label, { marginTop: 16 }]}>Days of Week (JSON)</Text>
          <CustomInput
            placeholder="e.g., [1, 3, 5] (Mon, Wed, Fri)"
            value={daysOfWeek || ''}
            onChangeText={(text) =>
              onDaysOfWeekChange(text || null)
            }
          />
        </>
      )}

      {mode === 'monthly' && (
        <>
          <Text style={[styles.label, { marginTop: 16 }]}>Days of Month (JSON)</Text>
          <CustomInput
            placeholder="e.g., [1, 15] (1st and 15th)"
            value={daysOfMonth || ''}
            onChangeText={(text) =>
              onDaysOfMonthChange(text || null)
            }
          />
        </>
      )}
    </View>
  );
}

function useStyles() {
  const { colors, size } = useTheme();

  return StyleSheet.create({
    container: {
      marginBottom: size.spacing,
    },
    label: {
      fontSize: size.text,
      color: colors.text,
      paddingBottom: size.smallSpacing,
    },
  });
}
