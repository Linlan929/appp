import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function SettingsModal({ 
  visible, 
  onClose, 
  fontSize, 
  setFontSize, 
  sensitivity, 
  setSensitivity, 
  onReset 
}) {
  
  // 雖然 onReset 由外部傳入，但我們可以把 Alert 封裝在組件內更乾淨
  const confirmReset = () => {
    Alert.alert(
      '警告', 
      '確定要重置嗎？這將會刪除書架上所有的內容喔！',
      [
        { text: '取消', style: 'cancel' },
        { text: '確定重置', style: 'destructive', onPress: onReset }
      ]
    );
  };

  return (
    <Modal 
      animationType="none" 
      transparent={true} 
      visible={visible} 
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.settingsCard}>
          {/* 關閉按鈕 */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={1}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          {/* 字體大小設定 */}
          <View style={styles.settingItem}>
            <Text style={styles.itemLabel}>字體大小</Text>
            <View style={styles.optionsRow}>
              {['小', '標準', '大'].map(opt => (
                <TouchableOpacity 
                  key={opt} 
                  style={[styles.optionBtn, fontSize === opt && styles.optionSelected]} 
                  onPress={() => setFontSize(opt)}
                >
                  <Text style={[styles.optionText, fontSize === opt && styles.optionTextActive]}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 靈敏度設定 */}
          <View style={styles.settingItem}>
            <Text style={styles.itemLabel}>靈敏度</Text>
            <View style={styles.optionsRow}>
              {['低', '中', '高'].map(opt => (
                <TouchableOpacity 
                  key={opt} 
                  style={[styles.optionBtn, sensitivity === opt && styles.optionSelected]} 
                  onPress={() => setSensitivity(opt)}
                >
                  <Text style={[styles.optionText, sensitivity === opt && styles.optionTextActive]}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 音效 (目前是靜態 UI) */}
          <View style={styles.settingItem}>
            <Text style={styles.itemLabel}>音效</Text>
            <View style={styles.sliderContainer}>
              <View style={styles.sliderLine} />
              <View style={styles.sliderKnob} />
            </View>
          </View>

          {/* 金幣說明 */}
          <TouchableOpacity style={styles.infoRow}>
            <Text style={styles.itemLabel}>金幣說明</Text>
            <View style={styles.infoCircle}><Text style={styles.infoIcon}>!</Text></View>
          </TouchableOpacity>

          {/* 重置按鈕 */}
          <TouchableOpacity style={styles.resetBtn} onPress={confirmReset}>
            <Text style={styles.resetText}>重置書架</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'center', alignItems: 'center' },
  settingsCard: {
    width: '80%', backgroundColor: '#f5e3b7', borderRadius: 15, padding: 25, paddingTop: 40,
    borderWidth: 5, borderColor: '#3D2B1F', elevation: 10, shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5,
  },
  closeButton: { position: 'absolute', top: 10, right: 15, padding: 5 },
  closeText: { fontSize: 28, color: '#3D2B1F', fontWeight: '900' },
  settingItem: { marginBottom: 25 },
  itemLabel: { fontSize: 18, color: '#4A3428', fontWeight: 'bold', marginBottom: 10 },
  optionsRow: { flexDirection: 'row' },
  optionBtn: { paddingHorizontal: 12, paddingVertical: 4, marginRight: 10, borderRadius: 12 },
  optionSelected: { backgroundColor: 'rgba(74, 52, 40, 0.2)' },
  optionText: { fontSize: 16, color: '#4A3428' },
  optionTextActive: { fontWeight: 'bold' },
  sliderContainer: { height: 30, justifyContent: 'center' },
  sliderLine: { height: 2, backgroundColor: '#4A3428', width: '100%' },
  sliderKnob: { position: 'absolute', left: '50%', width: 14, height: 14, borderRadius: 7, backgroundColor: '#4A3428' },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  infoCircle: { width: 20, height: 20, borderRadius: 10, borderWidth: 1.5, borderColor: '#4A3428', justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  infoIcon: { fontSize: 12, color: '#4A3428', fontWeight: 'bold' },
  resetBtn: { marginTop: 5 },
  resetText: { fontSize: 18, color: '#D9534F', fontWeight: 'bold' },
});