import React from 'react';
import { Modal, View, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@/context/theme';

interface Props {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Popup({ visible, onClose, children }: Props) {
  const { colors } = useTheme();

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
      backdropColor={colors.overlayBackground}
    >
      <Pressable style={styles.overlay} onPress={onClose} />
      <View style={styles.container}>
        <View style={styles.dragHandle} />
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,

  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingTop: 8,
  },
  dragHandle: {
    width: 48,
    height: 4,
    backgroundColor: '#a1a1aa',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
});
