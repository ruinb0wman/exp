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

  return (
    <View style={styles.topAppBar}>
      {back ?
        <TouchableOpacity onPress={() => {
          console.log('back')
          router.back();
        }}>
          <ChevronLeft color={colors.text} size={size.icon} />
        </TouchableOpacity> :
        leftNode ? leftNode : <View />
      }
      {title && <Text style={styles.title}>{title}</Text>}
      {rightNode}
    </View>
  )
}

const styles = StyleSheet.create({
  topAppBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingBottom: 8,
    backgroundColor: '#101922', // background-dark
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  icon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  addButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
