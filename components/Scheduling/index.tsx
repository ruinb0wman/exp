import React from 'react';
import { View, Text } from 'react-native';
import OptionPicker from '@/components/optionsPicker';
import CustomInput from '@/components/customInput';

type RestockMode = 'none' | 'daily' | 'weekly' | 'monthly';

interface RestockSettingsSectionProps {
  replenishmentMode: RestockMode;
  replenishmentInterval: number | null;
  replenishmentDaysOfWeek: string | null;
  replenishmentDaysOfMonth: string | null;
  onReplenishmentModeChange: (mode: RestockMode) => void;
  onReplenishmentIntervalChange: (value: number | null) => void;
  onReplenishmentDaysOfWeekChange: (value: string | null) => void;
  onReplenishmentDaysOfMonthChange: (value: string | null) => void;
}

const RestockSettingsSection: React.FC<RestockSettingsSectionProps> = ({
  replenishmentMode,
  replenishmentInterval,
  replenishmentDaysOfWeek,
  replenishmentDaysOfMonth,
  onReplenishmentModeChange,
  onReplenishmentIntervalChange,
  onReplenishmentDaysOfWeekChange,
  onReplenishmentDaysOfMonthChange,
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.label}>Scheduling</Text>
      <OptionPicker
        options={[
          { label: 'None', key: 'none' },
          { label: 'Daily', key: 'daily' },
          { label: 'Weekly', key: 'weekly' },
          { label: 'Monthly', key: 'monthly' },
        ]}
        value={replenishmentMode || 'none'}
        onChange={(selected) => {
          const selectedKey = Object.keys(selected)[0] || 'none';
          onReplenishmentModeChange(selectedKey as RestockMode);
        }}
      />

      {replenishmentMode === 'daily' && (
        <>
          <Text style={[styles.label, { marginTop: 16 }]}>Restock Interval (days)</Text>
          <CustomInput
            placeholder="e.g., 1 (every 1 day)"
            value={replenishmentInterval?.toString() || ''}
            onChangeText={(text) =>
              onReplenishmentIntervalChange(text ? parseInt(text) : null)
            }
            keyboardType="numeric"
          />
        </>
      )}

      {replenishmentMode === 'weekly' && (
        <>
          <Text style={[styles.label, { marginTop: 16 }]}>Days of Week (JSON)</Text>
          <CustomInput
            placeholder="e.g., [1, 3, 5] (Mon, Wed, Fri)"
            value={replenishmentDaysOfWeek || ''}
            onChangeText={(text) =>
              onReplenishmentDaysOfWeekChange(text || null)
            }
          />
        </>
      )}

      {replenishmentMode === 'monthly' && (
        <>
          <Text style={[styles.label, { marginTop: 16 }]}>Days of Month (JSON)</Text>
          <CustomInput
            placeholder="e.g., [1, 15] (1st and 15th)"
            value={replenishmentDaysOfMonth || ''}
            onChangeText={(text) =>
              onReplenishmentDaysOfMonthChange(text || null)
            }
          />
        </>
      )}
    </View>
  );
};

// 复用原有样式（或从外部导入）
const styles = {
  section: {
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500' as const,
    color: '#ffffff',
    lineHeight: 20,
    paddingBottom: 8,
  },
};

export default RestockSettingsSection;
