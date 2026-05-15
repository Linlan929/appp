import React from 'react';
import { Modal, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';

export default function BookEditModal({ visible, onClose, editingBook, isRenameMode, setIsRenameMode, newTitle, setNewTitle, onSave, onDelete }) {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.menuCard}>
          {!isRenameMode ? (
            <>
              <Text style={styles.menuTitle}>編輯「{editingBook?.title}」</Text>
              <TouchableOpacity style={styles.menuOption} onPress={() => setIsRenameMode(true)}>
                <Text style={styles.emoji}>✏️</Text>
                <View>
                  <Text style={styles.optionTitle}>重新命名</Text>
                  <Text style={styles.optionDesc}>修改名稱文字</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuOption} onPress={onDelete}>
                <Text style={styles.emoji}>🗑️</Text>
                <View>
                  <Text style={[styles.optionTitle, { color: '#D9534F' }]}>刪除項目</Text>
                  <Text style={styles.optionDesc}>從書架永久移除</Text>
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.menuTitle}>重新命名</Text>
              <TextInput style={styles.renameInput} value={newTitle} onChangeText={setNewTitle} autoFocus selectTextOnFocus />
              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.btn} onPress={() => setIsRenameMode(false)}>
                  <Text>取消</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={onSave}>
                  <Text style={{ color: '#FFF' }}>儲存</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  menuCard: { width: '75%', backgroundColor: '#f5e3b7', borderRadius: 20, padding: 20, borderWidth: 4, borderColor: '#3D2B1F' },
  menuTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  menuOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  emoji: { fontSize: 28, marginRight: 15 },
  optionTitle: { fontSize: 16, fontWeight: 'bold' },
  optionDesc: { fontSize: 12, color: 'gray' },
  renameInput: { backgroundColor: '#FFF', borderWidth: 2, borderColor: '#3D2B1F', borderRadius: 10, padding: 10, marginBottom: 20 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between' },
  btn: { flex: 0.45, padding: 10, alignItems: 'center', borderRadius: 10, backgroundColor: '#DDD' },
  btnPrimary: { backgroundColor: '#3D2B1F' },
});