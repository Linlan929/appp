import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ReaderView({ selectedBook, bookPages, currentPage, fontSize, panHandlers, onBack }) {
  const item = bookPages[currentPage];
  const contentFontSize = fontSize === '大' ? 22 : fontSize === '小' ? 14 : 17;

  return (
    <View style={styles.readingContainer}>
      {/* 返回按鈕 */}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← 回到書架</Text>
      </TouchableOpacity>
      
      <View style={styles.bookArea}>
        <View style={styles.bookHeaderRow}>
          <Text style={styles.floatingBookTitle}>{selectedBook.title}</Text>
          <TouchableOpacity style={styles.tempEditButton}>
            <Text style={styles.tempEditIconText}>✎</Text>
          </TouchableOpacity>
        </View>
        
        {/* 書本主體 */}
        <View style={styles.openedBookFullPage} {...panHandlers}>
          <View style={styles.pagePairWrapper}>
            {/* 左頁 */}
            <View style={[styles.bookPage, styles.leftPage]}>
              <Text style={[styles.pageContent, { fontSize: contentFontSize }]}>{item.left}</Text>
              <Text style={styles.innerPageNumberLeft}>{currentPage * 2 + 1}</Text>
              <View style={styles.innerShadowLeft} />
            </View>

            <View style={styles.bookSpine} />

            {/* 右頁 */}
            <View style={[styles.bookPage, styles.rightPage]}>
              <View style={styles.innerShadowRight} />
              <Text style={[styles.pageContent, { fontSize: contentFontSize }]}>{item.right}</Text>
              <Text style={styles.innerPageNumberRight}>{currentPage * 2 + 2}</Text>
            </View>
          </View>
        </View>

        {/* --- ✅ 找回來的頁碼顯示區域 --- */}
        <View style={styles.pageIndicatorContainer}>
          <Text style={styles.pageIndicatorText}>
            {String((currentPage * 2) + 2).padStart(2, '0')} / {String(bookPages.length * 2).padStart(2, '0')}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // 位置調高：由 center 改為 flex-start 並配合 paddingTop
  readingContainer: { 
    flex: 1, 
    backgroundColor: '#E5D3B3', 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    paddingTop: 220 
  },
  backButton: { position: 'absolute', top: 60, left: 20, zIndex: 10 },
  backButtonText: { fontSize: 16, fontWeight: 'bold', color: '#4A3428' },
  bookArea: { width: '95%', alignItems: 'center' },
  bookHeaderRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 5
  },
  floatingBookTitle: { fontSize: 22, fontWeight: 'bold', color: '#4A3428' },
  openedBookFullPage: { 
    width: '100%', 
    aspectRatio: 1.4, 
    backgroundColor: '#F5F5DC',
    elevation: 5, // 加一點陰影讓它像立體書
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  pagePairWrapper: { flexDirection: 'row', height: '100%' },
  bookPage: { flex: 1, padding: 25, justifyContent: 'flex-start' },
  leftPage: { backgroundColor: '#f7f2e3' },
  rightPage: { backgroundColor: '#F9F6ED' },
  bookSpine: { width: 2, backgroundColor: 'rgba(0,0,0,0.1)' },
  pageContent: { lineHeight: 28, color: '#4A3428', textAlign: 'justify' },
  
  // 內部微小裝飾
  innerShadowLeft: { position: 'absolute', right: 0, top: 0, bottom: 0, width: 10, backgroundColor: 'rgba(0,0,0,0.03)' },
  innerShadowRight: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 10, backgroundColor: 'rgba(0,0,0,0.03)' },
  innerPageNumberLeft: { position: 'absolute', bottom: 15, left: 20, fontSize: 10, color: '#999' },
  innerPageNumberRight: { position: 'absolute', bottom: 15, right: 20, fontSize: 10, color: '#999' },

  tempEditButton: { width: 35, height: 35, borderRadius: 18, backgroundColor: 'rgba(74, 52, 40, 0.1)', justifyContent: 'center', alignItems: 'center' },
  tempEditIconText: { fontSize: 18, color: '#4A3428' },

  // ✅ 底部頁數指示器樣式
  pageIndicatorContainer: { 
    marginTop: 25, 
    paddingHorizontal: 15, 
    paddingVertical: 5, 
    backgroundColor: 'rgba(74, 52, 40, 0.08)', 
    borderRadius: 20 
  },
  pageIndicatorText: { 
    fontSize: 14, 
    color: '#4A3428', 
    fontWeight: 'bold',
    letterSpacing: 1
  },
});