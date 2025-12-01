import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import { useTheme } from '@/context/theme';

const CustomInput = (props: TextInputProps) => {
  const { colors } = useTheme();
  const styles = useStyles();
  return (
    // <TextInput
    //   {...props}
    //   placeholderTextColor={colors.placeholder}
    //   style={[{ color: colors.text }, props.style]}
    // />
    <TextInput
      style={[styles.input, props.style, props.multiline && styles.textArea]}
      placeholderTextColor={colors.placeholder}
      {...props}
    />
  );
};

function useStyles() {
  const { colors } = useTheme();
  return StyleSheet.create({
    input: {
      height: 56,
      borderWidth: 1,
      borderColor: '#334155',
      borderRadius: 8,
      paddingHorizontal: 15,
      fontSize: 16,
      color: colors.text,
      backgroundColor: '#1e293b',
    },
    textArea: {
      height: 144,
      paddingTop: 15,
    }
  })
}

export default CustomInput;
