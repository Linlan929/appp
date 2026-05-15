import React, { useState, useMemo } from 'react';
import { StyleSheet, View, ImageBackground, SafeAreaView, PanResponder, Alert, Text, TouchableOpacity, Image } from 'react-native';

// --- 1. 引入所有組件 ---
import ReaderView from '../components/ReaderView';
import SettingsModal from '../components/SettingsModal';
import AddBookModal from '../components/AddBookModal';
import BookEditModal from '../components/BookEditModal';
import BookItem from '../components/BookItem';
import ShelfHeader from '../components/ShelfHeader';

export default function HomeScreen() {
  // --- 狀態管理 ---
  const [allBooks, setAllBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isSettingsVisible, setSettingsVisible] = useState(false);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  
  // 編輯選單相關狀態
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [isRenameMode, setIsRenameMode] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  // 閱讀器相關狀態
  const [currentPage, setCurrentPage] = useState(0);
  const [fontSize, setFontSize] = useState('標準');
  const [sensitivity, setSensitivity] = useState('中');

  // 模擬書本內容 (之後可改為從外部匯入或資料庫讀取)
  const bookPages = [
    { left: '這是第一頁左邊內容。', right: '這是第一頁右邊內容。' },
    { left: '這是第二頁左邊。', right: '祝你有美好的一天。' },
  ];

  // --- 邏輯處理函數 ---
  const handleOpenBook = (book) => { 
    setCurrentPage(0); 
    setSelectedBook(book); 
  };
  
  const handleEditBook = (book) => {
    setEditingBook(book);
    setNewTitle(book.title);
    setIsRenameMode(false);
    setEditModalVisible(true);
  };

  const handleSaveRename = () => {
    if (newTitle.trim()) {
      setAllBooks(allBooks.map(b => b.id === editingBook.id ? { ...b, title: newTitle } : b));
      setEditModalVisible(false);
    }
  };

  const handleDeleteBook = () => {
    Alert.alert('確認刪除', `確定要刪除「${editingBook.title}」嗎？`, [
      { text: '取消', style: 'cancel' },
      { text: '刪除', style: 'destructive', onPress: () => {
          setAllBooks(allBooks.filter(b => b.id !== editingBook.id));
          setEditModalVisible(false);
      }}
    ]);
  };

  // 翻頁手勢處理
  const panResponder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderRelease: (e, gestureState) => {
      const threshold = sensitivity === '高' ? 30 : sensitivity === '低' ? 100 : 60;
      if (gestureState.dx < -threshold) { 
        setCurrentPage(p => Math.min(p + 1, bookPages.length - 1));
      } else if (gestureState.dx > threshold) { 
        setCurrentPage(p => Math.max(p - 1, 0));
      }
    },
  }), [bookPages.length, sensitivity]);

  // --- 視圖切換：閱讀器 ---
  if (selectedBook) {
    return (
      <ReaderView 
        selectedBook={selectedBook}
        bookPages={bookPages}
        currentPage={currentPage}
        fontSize={fontSize}
        panHandlers={panResponder.panHandlers} 
        onBack={() => setSelectedBook(null)}
      />
    );
  }

  // --- 視圖切換：主要書架 ---
  return (
    <SafeAreaView style={styles.container}>
      {/* 頂部 Header 組件 */}
      <ShelfHeader onOpenSettings={() => setSettingsVisible(true)} />

      {/* 書櫃區域 */}
      <View style={styles.fixedContent}>
        <ImageBackground source={require('../assets/images/cabinet_frame.png')} style={styles.largeCabinet} resizeMode="stretch">
          <View style={styles.shelfContainer}>
            {[0, 1, 2, 3].map(level => (
              <View key={level} style={styles.cabinetLevel}>
                <View style={styles.booksRow}>
                  {[0, 1, 2].map(slot => {
                    const idx = level * 3 + slot;
                    const book = allBooks[idx];
                    return (
                      <View key={idx} style={{ width: '33.3%' }}>
                        {book ? (
                          <BookItem book={book} onOpen={handleOpenBook} onEdit={handleEditBook} />
                        ) : idx === allBooks.length ? (
                          <TouchableOpacity onPress={() => setAddModalVisible(true)} style={styles.addBtn}>
                            <View style={styles.dashedCircle}><Text style={styles.addPlus}>+</Text></View>
                          </TouchableOpacity>
                        ) : null}
                      </View>
                    );
                  })}
                </View>
                <Image source={require('../assets/images/shelf_divider.png')} style={styles.divider} resizeMode="stretch" />
              </View>
            ))}
          </View>
        </ImageBackground>
      </View>

      {/* --- 所有彈窗 (Modals) --- */}
      <BookEditModal 
        visible={isEditModalVisible} 
        editingBook={editingBook} 
        isRenameMode={isRenameMode}
        setIsRenameMode={setIsRenameMode}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        onClose={() => setEditModalVisible(false)}
        onSave={handleSaveRename}
        onDelete={handleDeleteBook}
      />
      
      <AddBookModal 
  visible={isAddModalVisible} 
  onClose={() => setAddModalVisible(false)} 
  onAdd={(type) => {
    // 1. 執行新增邏輯
    setAllBooks([...allBooks, { id: Date.now(), title: `${type}${allBooks.length + 1}`, type }]);
    
    // 2. ✅ 手動把彈窗關掉
    setAddModalVisible(false); 
  }} 
/>
      <SettingsModal 
        visible={isSettingsVisible} 
        onClose={() => setSettingsVisible(false)} 
        fontSize={fontSize} 
        setFontSize={setFontSize} 
        sensitivity={sensitivity} 
        setSensitivity={setSensitivity} 
        onReset={() => setAllBooks([])} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2e9cc' },
  fixedContent: { flex: 1, paddingTop: 20, paddingHorizontal: 20, alignItems: 'center' },
  largeCabinet: { width: '100%', aspectRatio: 3 / 4.8 },
  shelfContainer: { flex: 1, paddingTop: 15, paddingHorizontal: 10, paddingBottom: 25 },
  cabinetLevel: { flex: 1, justifyContent: 'flex-end' },
  booksRow: { flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 2 },
  divider: { width: '100%', height: 12 },
  dashedCircle: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: '#8B4513', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', marginBottom: 25 },
  addPlus: { fontSize: 22, color: '#8B4513' },
  addBtn: { alignItems: 'center' }
});