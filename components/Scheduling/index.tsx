import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OptionPicker from '@/components/optionsPicker';
import CustomInput from '@/components/customInput';
import Label from '@/components/Label';
import { useTheme } from '@/context/theme';
import { useToast } from '@/context/toast';

type Mode = 'none' | 'daily' | 'weekly' | 'monthly';

interface Props {
  mode: Mode;
  interval: number | null;
  daysOfWeek: number[] | null;
  daysOfMonth: number[] | null;
  onModeChange: (mode: Mode) => void;
  onIntervalChange: (value: number | null) => void;
  onDaysOfWeekChange: (value: number[] | null) => void;
  onDaysOfMonthChange: (value: number[] | null) => void;
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
  const { info } = useToast();

  // 本地状态：用于输入框的受控值
  const [weeklyInput, setWeeklyInput] = useState(daysOfWeek?.join(' ') || '');
  const [monthlyInput, setMonthlyInput] = useState(daysOfMonth?.join(' ') || '');

  // 当外部 props 变化时（如表单重置），同步本地状态
  useEffect(() => {
    setWeeklyInput(daysOfWeek?.join(' ') || '');
  }, [daysOfWeek]);

  useEffect(() => {
    setMonthlyInput(daysOfMonth?.join(' ') || '');
  }, [daysOfMonth]);

  const validateAndSyncWeekly = () => {
    const text = weeklyInput.trim();
    if (text === '') {
      onDaysOfWeekChange(null);
      return;
    }

    const parts = text.split(/\s+/).filter(Boolean);
    for (const part of parts) {
      const num = Number(part);
      if (!Number.isInteger(num) || num < 1 || num > 7) {
        info('Day of week must be integers between 1 and 7 (e.g., "1 3 5")');
        return;
      }
    }

    const normalized = [...new Set(parts.map(Number))].sort((a, b) => a - b);
    onDaysOfWeekChange(normalized);
    // 可选：同步标准化值回输入框（提升一致性）
    // setWeeklyInput(normalized.join(' '));
  };

  const validateAndSyncMonthly = () => {
    const text = monthlyInput.trim();
    if (text === '') {
      onDaysOfMonthChange(null);
      return;
    }

    const parts = text.split(/\s+/).filter(Boolean);
    for (const part of parts) {
      const num = Number(part);
      if (!Number.isInteger(num) || num < 1 || num > 31) {
        info('Day of month must be integers between 1 and 31 (e.g., "1 15")');
        return;
      }
    }

    const normalized = [...new Set(parts.map(Number))].sort((a, b) => a - b);
    onDaysOfMonthChange(normalized);
    // setMonthlyInput(normalized);
  };

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
          <Text style={[styles.label, { marginTop: 16 }]}>Days of Week</Text>
          <CustomInput
            placeholder="e.g., 1 3 5 (Mon=1, Sun=7)"
            value={weeklyInput}
            onChangeText={setWeeklyInput}
            onBlur={validateAndSyncWeekly}
          />
        </>
      )}

      {mode === 'monthly' && (
        <>
          <Text style={[styles.label, { marginTop: 16 }]}>Days of Month</Text>
          <CustomInput
            placeholder="e.g., 1 15 (1st and 15th)"
            value={monthlyInput}
            onChangeText={setMonthlyInput}
            onBlur={validateAndSyncMonthly}
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
