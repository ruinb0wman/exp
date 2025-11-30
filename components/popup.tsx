import React, { useEffect } from 'react';
import { Modal, View, Pressable, StyleSheet, Dimensions } from 'react-native';

interface PopupProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ visible, onClose, children }) => {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
      backdropColor='rgba(0, 0, 0, 0.2)'
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

export default Popup;
