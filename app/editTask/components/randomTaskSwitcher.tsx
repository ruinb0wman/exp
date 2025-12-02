import { View, Switch, } from 'react-native'
import Label from "@/components/Label"
import { useTheme } from '@/context/theme'

interface Props {
  value: boolean
  onChange?: (val: boolean) => void
}

export default function randomTaskSwitcher({ value, onChange }: Props) {
  const { colors } = useTheme();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Label style={{ marginTop: 0 }} textStyle={{ fontWeight: 'normal' }}
        rightNode={
          <Switch
            value={value}
            onValueChange={onChange}
            trackColor={{ false: colors.fill, true: colors.primary }}
            thumbColor={value ? colors.text : colors.dimText}
          />
        }> Random </Label>
    </View>
  )
}
