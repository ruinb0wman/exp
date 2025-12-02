import { ReactNode } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/context/theme";

interface Props {
  leftNode?: ReactNode,
  rightNode?: ReactNode,
  back?: boolean,
  title?: string
}

export default function NavBar({ leftNode, rightNode, back, title }: Props) {
  const { colors, size } = useTheme();
  const router = useRouter();
  const styles = useStyles();

  return (
    <View style={styles.topAppBar}>
      {back ?
        <TouchableOpacity onPress={() => {
          console.log('back')
          router.back();
        }}>
          <ChevronLeft color={colors.text} size={size.icon} />
        </TouchableOpacity> :
        leftNode ? leftNode : <View style={{ width: size.icon }} />
      }
      {title && <Text style={styles.title}>{title}</Text>}
      {rightNode ? rightNode : <View style={{ width: size.icon }} />}
    </View>
  )
}

function useStyles() {
  const { colors, size } = useTheme();

  return StyleSheet.create({
    topAppBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: size.smallSpacing,
      paddingBottom: size.spacing,
      justifyContent: 'space-between'
    },
    title: {
      fontSize: size.bigText,
      fontWeight: 'bold',
      color: colors.text,
    },
  })
}


