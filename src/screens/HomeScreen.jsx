import React, { useState, useMemo } from 'react';
import { 
  StyleSheet, Text, View, Image, ImageBackground, 
  SafeAreaView, TouchableOpacity, Alert, Modal, TextInput,PanResponder 
} from 'react-native';

// --- 1. 引入抽離後的組件 ---
import ReaderView from '../components/ReaderView';
import SettingsModal from '../components/SettingsModal';
import AddBookModal from '../components/AddBookModal';

// --- 2. 資源導入 ---
const CabinetFrame = require('../assets/images/cabinet_frame.png');
const ShelfDivider = require('../assets/images/shelf_divider.png');
const CoinBarBg = require('../assets/images/bg_coin_bar.png');
const SettingsIcon = require('../assets/images/icon_settings.png'); 
const BookGreen = require('../assets/images/book_green.png');

export default function HomeScreen() {
  // --- 狀態管理 ---
  const [allBooks, setAllBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isSettingsVisible, setSettingsVisible] = useState(false);
  const [isAddModalVisible, setAddModalVisible] = useState(false);

  // 編輯相關狀態
  const [editingBook, setEditingBook] = useState(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isRenameMode, setIsRenameMode] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  // 閱讀器相關狀態
  const [currentPage, setCurrentPage] = useState(0);
  const [fontSize, setFontSize] = useState('標準');
  const [sensitivity, setSensitivity] = useState('中');

  // 模擬書本內容
  const bookPages = [
    { left: '這是第一頁左邊內容。', right: '這是第一頁右邊內容。' },
    { left: '這是第二頁左邊。', right: '祝你有美好的一天。' },
  ];

  // --- 功能函數 ---

  // 1. 長按書本：打開編輯選單
  const handleLongPressBook = (book) => {
    setEditingBook(book);
    setNewTitle(book.title);
    setIsRenameMode(false);
    setEditModalVisible(true);
  };

  // 2. 刪除書本
  const handleDeleteBook = () => {
    Alert.alert('確認刪除', `確定要刪除「${editingBook.title}」嗎？`, [
      { text: '取消', style: 'cancel' },
      { text: '刪除', style: 'destructive', onPress: () => {
          setAllBooks(allBooks.filter(b => b.id !== editingBook.id));
          setEditModalVisible(false);
      }}
    ]);
  };

  // 3. 重新命名儲存
  const handleSaveRename = () => {
    if (newTitle.trim()) {
      setAllBooks(allBooks.map(b => b.id === editingBook.id ? { ...b, title: newTitle } : b));
      setEditModalVisible(false);
    }
  };

  // 4. 重置書架
  const handleResetShelf = () => {
    setAllBooks([]);
    setSettingsVisible(false);
  };

  // 5. 新增項目
  const handleAddNewItem = (type) => {
    if (allBooks.length < 12) {
      const newItem = { id: Date.now(), title: `${type}${allBooks.length + 1}`, type };
      setAllBooks([...allBooks, newItem]);
      setAddModalVisible(false);
    }
  };

  const panResponder = useMemo(() => PanResponder.create({
  onStartShouldSetPanResponder: () => true,
  onMoveShouldSetPanResponder: () => true, // 確保滑動時能持續捕捉手勢
  onPanResponderRelease: (e, gestureState) => {
    // 根據靈敏度決定門檻
    const threshold = sensitivity === '高' ? 30 : sensitivity === '低' ? 100 : 60;

    if (gestureState.dx < -threshold) { 
      // 向左滑 -> 下一頁
      setCurrentPage(p => Math.min(p + 1, bookPages.length - 1));
    } else if (gestureState.dx > threshold) { 
      // 向右滑 -> 上一頁
      setCurrentPage(p => Math.max(p - 1, 0));
    }
  },
}), [bookPages.length, sensitivity]);

  // --- 渲染書架邏輯 ---
  const renderLevelContent = (level) => {
    const startIndex = (level - 1) * 3;
    return (
      <View style={styles.booksRow}>
        {[0, 1, 2].map((slotIndex) => {
          const globalIndex = startIndex + slotIndex;
          const book = allBooks[globalIndex];
          
          if (book) {
            return (
              <TouchableOpacity 
                key={book.id} 
                style={styles.bookWrapper} 
                onPress={() => { setCurrentPage(0); setSelectedBook(book); }}
                onLongPress={() => handleLongPressBook(book)}
                delayLongPress={500}
              >
                <Image source={BookGreen} style={styles.bookImage} />
                <Text style={styles.bookLabelText} numberOfLines={1}>{book.title}</Text>
              </TouchableOpacity>
            );
          }
          
          if (globalIndex === allBooks.length) {
            return (
              <TouchableOpacity 
                key="add" 
                style={styles.bookWrapper} 
                onPress={() => setAddModalVisible(true)}
              >
                <View style={styles.dashedCircle}><Text style={styles.addPlus}>+</Text></View>
                <Text style={[styles.bookLabelText, { opacity: 0 }]}>Add</Text>
              </TouchableOpacity>
            );
          }
          return <View key={`empty-${globalIndex}`} style={styles.bookWrapper} />;
        })}
      </View>
    );
  };

  // --- 視圖切換：閱讀器 ---
  if (selectedBook) {
    return (
      <ReaderView 
  selectedBook={selectedBook}
  bookPages={bookPages}
  currentPage={currentPage}
  fontSize={fontSize}
  // 這裡最重要：要把 panResponder 的 handlers 傳進去
  panHandlers={panResponder.panHandlers} 
  onBack={() => setSelectedBook(null)}
/>
    );
  }

  // --- 視圖切換：書架 ---
  return (
    <SafeAreaView style={styles.container}>
      {/* 頂部 Header */}
      <View style={styles.header}>
        <ImageBackground source={CoinBarBg} style={styles.coinBar} resizeMode="contain">
          <Text style={styles.coinText}>1,200</Text>
        </ImageBackground>
        <TouchableOpacity onPress={() => setSettingsVisible(true)}>
          <Image source={SettingsIcon} style={styles.settingsIcon} />
        </TouchableOpacity>
      </View>

      {/* 書櫃區域 */}
      <View style={styles.fixedContent}>
        <ImageBackground source={CabinetFrame} style={styles.largeCabinet} resizeMode="stretch">
          <View style={styles.shelfContainer}>
            {[1, 2, 3, 4].map((l) => (
              <View key={l} style={styles.cabinetLevel}>
                <View style={styles.levelContent}>{renderLevelContent(l)}</View>
                <Image source={ShelfDivider} style={styles.levelDivider} resizeMode="stretch" />
              </View>
            ))}
          </View>
        </ImageBackground>
      </View>

      {/* --- Modals --- */}

      {/* 1. 長按編輯選單 */}
      <Modal animationType="fade" transparent={true} visible={isEditModalVisible}>
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setEditModalVisible(false)}
        >
          <View style={styles.menuCard}>
            {!isRenameMode ? (
              <>
                <Text style={styles.menuTitle}>編輯「{editingBook?.title}」</Text>
                <TouchableOpacity style={styles.menuOption} onPress={() => setIsRenameMode(true)}>
                  <Text style={styles.menuOptionEmoji}>✏️</Text>
                  <View>
                    <Text style={styles.menuOptionTitle}>重新命名</Text>
                    <Text style={styles.menuOptionDesc}>修改這個項目的名稱文字</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuOption} onPress={handleDeleteBook}>
                  <Text style={styles.menuOptionEmoji}>🗑️</Text>
                  <View>
                    <Text style={[styles.menuOptionTitle, { color: '#D9534F' }]}>刪除項目</Text>
                    <Text style={styles.menuOptionDesc}>將此項目從書架永久移除</Text>
                  </View>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.menuTitle}>重新命名</Text>
                <TextInput 
                  style={styles.renameInput} 
                  value={newTitle} 
                  onChangeText={setNewTitle} 
                  autoFocus 
                  selectTextOnFocus 
                />
                <View style={styles.renameActionRow}>
                  <TouchableOpacity style={styles.renameBtn} onPress={() => setIsRenameMode(false)}>
                    <Text style={styles.renameBtnText}>取消</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.renameBtn, styles.saveBtn]} onPress={handleSaveRename}>
                    <Text style={[styles.renameBtnText, { color: '#FFF' }]}>儲存</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 2. 新增項目選單 */}
      <AddBookModal 
        visible={isAddModalVisible}
        onClose={() => setAddModalVisible(false)}
        onAdd={handleAddNewItem}
      />

      {/* 3. 系統設定選單 */}
      <SettingsModal 
        visible={isSettingsVisible}
        onClose={() => setSettingsVisible(false)}
        fontSize={fontSize}
        setFontSize={setFontSize}
        sensitivity={sensitivity}
        setSensitivity={setSensitivity}
        onReset={handleResetShelf}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2e9cc' },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25, paddingTop: 40 },
  coinBar: { width: 140, height: 50, justifyContent: 'center' },
  coinText: { fontSize: 16, fontWeight: 'bold', color: '#ffebdc', marginLeft: 45 },
  settingsIcon: { width: 45, height: 45, resizeMode: 'contain' },
  fixedContent: { flex: 1, paddingTop: 20, paddingHorizontal: 20, alignItems: 'center' },
  largeCabinet: { width: '100%', aspectRatio: 3 / 4.8 },
  shelfContainer: { flex: 1, paddingTop: 15, paddingHorizontal: 10, paddingBottom: 25 },
  cabinetLevel: { flex: 1, justifyContent: 'flex-end' },
  levelContent: { width: '100%' },
  booksRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', paddingBottom: 2 },
  bookWrapper: { alignItems: 'center', width: '33.3%' },
  bookImage: { width: 45, height: 70, resizeMode: 'contain' },
  bookLabelText: { fontSize: 10, color: '#4A3428', fontWeight: 'bold', marginTop: 2 },
  dashedCircle: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: '#8B4513', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center' },
  addPlus: { fontSize: 22, color: '#8B4513' },
  dashedCircle: { 
  width: 44, 
  height: 44, 
  borderRadius: 22, 
  borderWidth: 2, 
  borderColor: '#8B4513', 
  borderStyle: 'dashed', 
  justifyContent: 'center', 
  alignItems: 'center',
  marginBottom: 12, // 如果想讓它離底部的層板高一點，可以加這個
},
  levelDivider: { width: '100%', height: 12 },
  
  // Modal 樣式
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'center', alignItems: 'center' },
  menuCard: { width: '75%', backgroundColor: '#f5e3b7', borderRadius: 20, padding: 20, borderWidth: 4, borderColor: '#3D2B1F' },
  menuTitle: { fontSize: 18, fontWeight: 'bold', color: '#4A3428', textAlign: 'center', marginBottom: 15 },
  menuOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(74, 52, 40, 0.1)' },
  menuOptionEmoji: { fontSize: 28, marginRight: 15 },
  menuOptionTitle: { fontSize: 16, fontWeight: 'bold', color: '#4A3428' },
  menuOptionDesc: { fontSize: 12, color: 'rgba(74, 52, 40, 0.5)' },
  renameInput: { backgroundColor: '#FFF', borderWidth: 2, borderColor: '#3D2B1F', borderRadius: 10, padding: 10, fontSize: 16, marginBottom: 20 },
  renameActionRow: { flexDirection: 'row', justifyContent: 'space-between' },
  renameBtn: { flex: 0.45, paddingVertical: 10, alignItems: 'center', borderRadius: 10, backgroundColor: '#DDD' },
  saveBtn: { backgroundColor: '#3D2B1F' },
  renameBtnText: { fontWeight: 'bold', color: '#4A3428' },
});