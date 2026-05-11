import React, { useState, useRef, useMemo } from 'react';
import { 
  StyleSheet, Text, View, Image, ImageBackground, 
  SafeAreaView, TouchableOpacity, Alert, useWindowDimensions, PanResponder, Modal 
} from 'react-native';

// 資源導入 (請根據妳的實際路徑調整)
const CabinetFrame = require('../assets/images/cabinet_frame.png');
const ShelfDivider = require('../assets/images/shelf_divider.png');
const CoinBarBg = require('../assets/images/bg_coin_bar.png');
const SettingsIcon = require('../assets/images/icon_settings.png'); 
const BookGreen = require('../assets/images/book_green.png');

export default function HomeScreen() {
  const { width: windowWidth } = useWindowDimensions();
  
  // --- 狀態管理 ---
  const [allBooks, setAllBooks] = useState([
    { id: 1, title: '1' },
    { id: 2, title: '2' },
    { id: 3, title: '3' },
  ]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  // 設定相關狀態
  const [isSettingsVisible, setSettingsVisible] = useState(false);
  const [fontSize, setFontSize] = useState('標準'); // 小, 標準, 大
  const [sensitivity, setSensitivity] = useState('中'); // 低, 中, 高

  // 模擬書本分頁數據
  const bookPages = [
    { id: 'p1', left: '這是第一頁左邊。', right: '這是第一頁右邊' },
    { id: 'p2', left: '這是第二頁左邊。', right: '這是第二頁右邊' },
    { id: 'p3', left: '這是第三頁左邊。', right: '這是第三頁右邊' },
  ];

  // --- 手勢邏輯 (翻頁) ---
  const panResponder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderRelease: (e, gestureState) => {
      // 根據靈敏度設定判斷距離 (暫時固定，之後可連動 sensitivity 狀態)
      const threshold = sensitivity === '高' ? 30 : sensitivity === '低' ? 100 : 60;
      if (gestureState.dx < -threshold) {
        setCurrentPage((prev) => (prev < bookPages.length - 1 ? prev + 1 : prev));
      } else if (gestureState.dx > threshold) {
        setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
      }
    },
  }), [bookPages.length, sensitivity]);

  // --- 書櫃功能 ---
  const openBook = (book) => {
    setCurrentPage(0);
    setSelectedBook(book);
  };

  const addBook = () => {
    if (allBooks.length < 12) {
      const newBook = { id: Date.now(), title: String(allBooks.length + 1) };
      setAllBooks([...allBooks, newBook]);
    } else {
      Alert.alert('提示', '書櫃已經滿載囉！');
    }
  };

  const renderLevelContent = (level) => {
    const startIndex = (level - 1) * 3;
    const currentLevelItems = allBooks.slice(startIndex, startIndex + 3);
    const showAddButtonHere = allBooks.length >= startIndex && allBooks.length < startIndex + 3;

    return (
      <View style={styles.booksRow}>
        {currentLevelItems.map((book) => (
          <TouchableOpacity key={book.id} style={styles.bookWrapper} onPress={() => openBook(book)}>
            <Image source={BookGreen} style={styles.bookImage} />
            <Text style={styles.bookLabelText}>{book.title}</Text>
          </TouchableOpacity>
        ))}
        {showAddButtonHere && (
          <View style={styles.bookWrapper}> 
            <TouchableOpacity style={styles.addButton} onPress={addBook}>
              <View style={styles.dashedCircle}><Text style={styles.addPlus}>+</Text></View>
            </TouchableOpacity>
            <Text style={[styles.bookLabelText, { opacity: 0 }]}>Spacer</Text>
          </View>
        )}
      </View>
    );
  };

  // --- 渲染閱讀模式 ---
  if (selectedBook) {
    const item = bookPages[currentPage];
    // 根據設定調整字體大小
    const contentFontSize = fontSize === '大' ? 20 : fontSize === '小' ? 13 : 16;

    return (
      <View style={styles.readingContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => setSelectedBook(null)}>
          <Text style={styles.backButtonText}>← 回到書架</Text>
        </TouchableOpacity>

        <View style={styles.bookArea}>
          <View style={styles.bookHeaderRow}>
            <Text style={styles.floatingBookTitle}>{selectedBook.title}</Text>
            <TouchableOpacity style={styles.tempEditButton} onPress={() => Alert.alert('提示', '進入編輯模式')}>
              <Text style={styles.tempEditIconText}>✎</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.openedBookFullPage} {...panResponder.panHandlers}>
            <View style={styles.pagePairWrapper}>
              <View style={[styles.bookPage, styles.leftPage]}>
                <Text style={[styles.pageContent, { fontSize: contentFontSize }]}>{item.left}</Text>
                <Text style={styles.innerPageNumberLeft}>{(currentPage * 2) + 1}</Text>
                <View style={styles.innerShadowLeft} />
              </View>
              <View style={styles.bookSpine} />
              <View style={[styles.bookPage, styles.rightPage]}>
                <View style={styles.innerShadowRight} />
                <Text style={[styles.pageContent, { fontSize: contentFontSize }]}>{item.right}</Text>
                <Text style={styles.innerPageNumberRight}>{(currentPage * 2) + 2}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.pageIndicatorContainer}>
          <Text style={styles.pageIndicatorText}>
            {String((currentPage * 2) + 2).padStart(2, '0')} / {String(bookPages.length * 2).padStart(2, '0')}
          </Text>
        </View>
      </View>
    );
  }

  // --- 渲染主畫面 ---
  return (
    <SafeAreaView style={styles.container}>
      {/* Header 與 設定圖示 */}
      <View style={styles.header}>
        <ImageBackground source={CoinBarBg} style={styles.coinBar} resizeMode="contain">
          <Text style={styles.coinText}>1,200</Text>
        </ImageBackground>
        <TouchableOpacity 
          style={styles.settingsButton} 
          onPress={() => setSettingsVisible(true)}
        >
          <Image source={SettingsIcon} style={styles.settingsIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.fixedContent}>
        <ImageBackground source={CabinetFrame} style={styles.largeCabinet} resizeMode="stretch">
          <View style={styles.shelfContainer}>
            {[1, 2, 3, 4].map((level) => (
              <View key={level} style={styles.cabinetLevel}>
                <View style={styles.levelContent}>{renderLevelContent(level)}</View>
                <Image source={ShelfDivider} style={styles.levelDivider} resizeMode="stretch" />
              </View>
            ))}
          </View>
        </ImageBackground>
      </View>

      {/* --- 設定懸浮卡片 (Modal) --- */}
      <Modal
        animationType="none"
        transparent={true}
        visible={isSettingsVisible}
        onRequestClose={() => setSettingsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.settingsCard}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setSettingsVisible(false)}activeOpacity={1}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>

            {/* 字體大小 */}
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

            {/* 靈敏度 */}
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

            {/* 音效滑桿 */}
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

            {/* 重置 */}
            <TouchableOpacity 
              style={styles.resetBtn}
              onPress={() => Alert.alert('警告', '確定要重置嗎？')}
            >
              <Text style={styles.resetText}>重置書架</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // 基礎容器
  container: { flex: 1, backgroundColor: '#f2e9cc' },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25, paddingTop: 40 },
  coinBar: { width: 140, height: 50, justifyContent: 'center', alignItems: 'center' },
  coinText: { fontSize: 16, fontWeight: 'bold', color: '#ffebdc', marginLeft: 15 },
  settingsButton: { width: 45, height: 45, justifyContent: 'center', alignItems: 'center' },
  settingsIcon: { width: '100%', height: '100%', resizeMode: 'contain' },
  
  // 書櫃樣式
  fixedContent: { flex: 1, paddingTop: 40, paddingHorizontal: 20, paddingBottom: 130, alignItems: 'center' },
  largeCabinet: { width: '100%', aspectRatio: 3 / 4.8 },
  shelfContainer: { flex: 1, paddingTop: 15, paddingHorizontal: 10, paddingBottom: 25 },
  cabinetLevel: { flex: 1, justifyContent: 'flex-end' },
  levelContent: { width: '100%', alignItems: 'center', justifyContent: 'flex-end' },
  booksRow: { flexDirection: 'row', width: '100%', justifyContent: 'flex-start', alignItems: 'flex-end', paddingBottom: 2, paddingHorizontal: 10 },
  bookWrapper: { alignItems: 'center', width: '33.3%' },
  bookImage: { width: 45, height: 70, resizeMode: 'contain' },
  bookLabelText: { fontSize: 10, color: '#4A3428', fontWeight: 'bold', marginTop: 2 },
  addButton: { width: 45, height: 70, justifyContent: 'center', alignItems: 'center' },
  dashedCircle: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: '#8B4513', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center' },
  addPlus: { fontSize: 22, color: '#8B4513' },
  levelDivider: { width: '100%', height: 12 },

  // 閱讀器樣式
  readingContainer: { flex: 1, backgroundColor: '#E5D3B3', justifyContent: 'center', alignItems: 'center' },
  backButton: { position: 'absolute', top: 60, left: 20, padding: 10, zIndex: 10 },
  backButtonText: { color: '#4A3428', fontSize: 16, fontWeight: 'bold' },
  bookArea: { width: '96%', alignItems: 'flex-start' },
  bookHeaderRow: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, paddingHorizontal: 5 },
  floatingBookTitle: { fontSize: 24, fontWeight: 'bold', color: '#4A3428' },
  tempEditButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(74, 52, 40, 0.15)', justifyContent: 'center', alignItems: 'center' },
  tempEditIconText: { fontSize: 20, color: '#4A3428' },
  openedBookFullPage: { width: '100%', aspectRatio: 1.4, backgroundColor: '#F5F5DC', borderRadius: 4, overflow: 'hidden' },
  pagePairWrapper: { flexDirection: 'row', width: '100%', height: '100%' },
  bookPage: { flex: 1, paddingHorizontal: 30, paddingVertical: 35 },
  leftPage: { backgroundColor: '#f7f2e3' },
  rightPage: { backgroundColor: '#F9F6ED' },
  bookSpine: { width: 2, height: '100%', backgroundColor: 'rgba(0,0,0,0.1)' },
  pageContent: { lineHeight: 28, color: '#4A3428', textAlign: 'justify' },
  pageIndicatorContainer: { marginTop: 25, paddingHorizontal: 15, paddingVertical: 5, backgroundColor: 'rgba(74, 52, 40, 0.1)', borderRadius: 20 },
  pageIndicatorText: { fontSize: 14, color: '#4A3428', fontWeight: 'bold' },
  innerShadowLeft: { position: 'absolute', right: 0, top: 0, bottom: 0, width: 10, backgroundColor: 'rgba(0,0,0,0.05)' },
  innerShadowRight: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 10, backgroundColor: 'rgba(0,0,0,0.05)' },
  innerPageNumberLeft: { position: 'absolute', bottom: 15, left: 20, fontSize: 10, color: '#999' },
  innerPageNumberRight: { position: 'absolute', bottom: 15, right: 20, fontSize: 10, color: '#999' },

  // 設定 Modal 樣式
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'center', alignItems: 'center' },
  settingsCard: {
    width: '80%',
    backgroundColor: '#f5e3b7', 
    borderRadius: 15,
    padding: 25,
    paddingTop: 40,
    
    // --- 這裡加粗邊框 ---
    borderWidth: 5,           // 從 1.5 加粗到 3
    borderColor: '#3D2B1F',   // 稍微加深一點褐色，讓邊框更跳脫
    // ------------------

    elevation: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  closeButton: {
  position: 'absolute',
  top: 10,       // 稍微調高一點
  right: 15,     // 稍微調右一點
  padding: 5,    // 增加點擊熱區，讓使用者更好點
},
  closeText: {
    fontSize: 28,             // 從 22 加大到 28，讓比例更好看
    color: '#3D2B1F',         // 使用跟加粗邊框一樣的深褐色
    fontWeight: '900',        // 使用最粗的權重
  },
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
  resetBtn: { marginTop: 10 },
  resetText: { fontSize: 18, color: '#D9534F', fontWeight: 'bold' },
});