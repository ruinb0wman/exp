import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { useTheme } from '@/context/theme';

const CustomInput = (props: TextInputProps) => {
  const { colors } = useTheme();
  return (
    <TextInput
      {...props}
      placeholderTextColor={colors.placeholder}
      style={[{ color: colors.text }, props.style]}
    />
  );
};

export default CustomInput;
