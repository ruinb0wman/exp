import { View } from "react-native";
import OptionPicker from "@/components/optionsPicker";

interface Props {
  type: 'none' | 'daily' | 'weekly' | 'monthly'
}

export default function Scheduling({ type }: Props) {
  return (
    <View>
      <OptionPicker options={OPTIONS} value={type} />
    </View>
  )
}

const OPTIONS = [
  { label: 'None', key: 'none' },
  { label: 'Daily', key: 'daily' },
  { label: 'Weekly', key: 'weekly' },
  { label: 'Monthly', key: 'monthly' },
]
