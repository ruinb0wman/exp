import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Text, StyleSheet, View } from 'react-native'
import { useTheme } from '@/context/theme'

interface Props {
  children?: string;
  rightNode?: React.ReactNode;
  leftNode?: React.ReactNode;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}

export default function Label({ children, leftNode, rightNode, textStyle, style }: Props) {
  const styles = useStyles();

  return (
    <View style={[styles.container, style]}>
      <View style={leftNode ? styles.leftNode : null}>
        {leftNode}
      </View>
      <Text style={[styles.label, textStyle]}>{children}</Text>
      <View style={styles.rightNode}>
        {rightNode}
      </View>
    </View>
  )
}

function useStyles() {
  const { colors, size } = useTheme();
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
      marginTop: size.smallSpacing,
      marginBottom: size.spacing,
    },
    label: {
      fontSize: size.text,
      fontWeight: 'bold',
      color: colors.text, // white in dark mode
    },
    leftNode: {
      marginRight: size.smallSpacing,
    },
    rightNode: {
      marginLeft: 'auto',
    }
  })
}
