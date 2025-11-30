import { TouchableOpacity, View, Text, StyleSheet } from "react-native"
import { useTheme } from "@/context/theme";
import { Check } from "lucide-react-native";

interface Props {
  checked: boolean;
  onPress?: () => void;
}

export default function CheckBox({ checked, onPress }: Props) {
  const { colors, size } = useTheme();
  const styles = useStyles({ checked });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.checkbox}>
        {checked ?
          <Check color={colors.text} size={size.eSmallIcon} /> :
          <View style={styles.emptyHolder} />
        }
      </View>
    </TouchableOpacity>
  )
}

function useStyles({ checked }: { checked: boolean }) {
  const { colors, size } = useTheme();

  return StyleSheet.create({
    container: {
      padding: size.eSmallSpacing
    },
    checkbox: {
      padding: size.eSmallSpacing,
      borderColor: checked ? colors.primary : colors.lightBorder,
      borderRadius: size.radius,
      borderWidth: size.boldBorder,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: checked ? colors.primary : 'transparent',
    },
    emptyHolder: { width: size.eSmallIcon, height: size.eSmallIcon }
  })
}
