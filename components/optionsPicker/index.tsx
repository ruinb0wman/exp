import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export type Option = {
  label: string;
  key: string;
  meta?: any;
};

type OptionPickerProps = {
  options: Option[];
  value: string | string[]; // 当前选中的 key 或 keys
  multiple?: boolean;
  onChange?: (selectedOptions: Record<string, Option>) => void;
  containerStyle?: any;
};

const OptionPicker: React.FC<OptionPickerProps> = ({
  options,
  value,
  multiple = false,
  onChange,
}) => {
  // 判断某个 option 是否被选中
  const isSelected = (key: string): boolean => {
    if (multiple) {
      return Array.isArray(value) && value.includes(key);
    }
    return value === key;
  };

  const handlePress = (option: Option, index: number) => {
    if (!onChange) return;

    let selectedKeys: string[] = [];

    if (multiple) {
      selectedKeys = Array.isArray(value) ? [...value] : [];
      const idx = selectedKeys.indexOf(option.key);
      if (idx >= 0) {
        selectedKeys.splice(idx, 1); // 取消选中
      } else {
        selectedKeys.push(option.key); // 选中
      }
    } else {
      selectedKeys = [option.key]; // 单选：只保留当前点击的 key
    }

    // 构建 { [key]: Option } 对象
    const selectedMap: Record<string, Option> = {};
    selectedKeys.forEach(key => {
      const opt = options.find(o => o.key === key);
      if (opt) {
        selectedMap[key] = opt;
      }
    });

    onChange(selectedMap);
  };

  return (
    <View style={[styles.buttonRow]}>
      {options.map((option, index) => {
        const selected = isSelected(option.key);
        return (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.cycleButton,
              selected && styles.cycleButtonSelected,
            ]}
            onPress={() => handlePress(option, index)}
          >
            <Text
              style={[
                styles.cycleButtonText,
                selected && styles.cycleButtonTextSelected,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  cycleButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    backgroundColor: '#1e293b', // slate-800 dark
    borderWidth: 1,
    borderColor: '#334155', // slate-700 dark
  },
  cycleButtonSelected: {
    backgroundColor: '#2b8cee', // primary
    borderColor: '#2b8cee',
  },
  cycleButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },
  cycleButtonTextSelected: {
    color: '#ffffff',
  },
});

export default OptionPicker;
