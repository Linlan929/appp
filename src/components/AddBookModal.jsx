import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

export default function AddBookModal({ visible, onClose, onAdd }) {
  const options = [
    { type: '手帳', emoji: '📖', desc: '記錄心情與日常' },
    { type: '相簿', emoji: '🖼️', desc: '珍藏妳的回憶' },
    { type: '周邊展示架', emoji: '🧸', desc: '擺放妳的收藏' },
  ];

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.menuCard}>
          <Text style={styles.menuTitle}>建立新收藏</Text>
          {options.map((item) => (
            <TouchableOpacity 
              key={item.type} 
              style={styles.menuOption} 
              onPress={() => onAdd(item.type)}
            >
              <Text style={styles.menuOptionEmoji}>{item.emoji}</Text>
              <View>
                <Text style={styles.menuOptionTitle}>{item.type}</Text>
                <Text style={styles.menuOptionDesc}>{item.desc}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'center', alignItems: 'center' },
  menuCard: { width: '75%', backgroundColor: '#f5e3b7', borderRadius: 20, padding: 20, borderWidth: 4, borderColor: '#3D2B1F' },
  menuTitle: { fontSize: 18, fontWeight: 'bold', color: '#4A3428', textAlign: 'center', marginBottom: 15 },
  menuOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(74, 52, 40, 0.1)' },
  menuOptionEmoji: { fontSize: 28, marginRight: 15 },
  menuOptionTitle: { fontSize: 16, fontWeight: 'bold', color: '#4A3428' },
  menuOptionDesc: { fontSize: 12, color: 'rgba(74, 52, 40, 0.5)' },
});