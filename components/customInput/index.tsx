import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import { useTheme } from '@/context/theme';

const CustomInput = (props: TextInputProps) => {
  const { colors } = useTheme();
  const styles = useStyles();
  return (
    <TextInput
      style={[styles.input, props.style, props.multiline && styles.textArea]}
      placeholderTextColor={colors.placeholder}
      {...props}
    />
  );
};

function useStyles() {
  const { colors, size } = useTheme();
  return StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: colors.lightBorder,
      borderRadius: size.lRadius,
      paddingHorizontal: size.spacing,
      fontSize: size.text,
      color: colors.text,
      backgroundColor: colors.fill,
    },
    textArea: {
      height: 144,
      paddingTop: size.spacing,
    }
  })
}

export default CustomInput;
