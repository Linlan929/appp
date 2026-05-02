import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native';

const CabinetFrame = require('../assets/images/cabinet_frame.png');
const ShelfDivider = require('../assets/images/shelf_divider.png');
const CoinBarBg = require('../assets/images/bg_coin_bar.png');
const SettingsIcon = require('../assets/images/icon_settings.png'); // 使用妳畫的設定圖

const bookImages = [require('../assets/images/book_green.png')];

export default function HomeScreen() {
  // 渲染每一層內容
  const renderLevelContent = (level) => {
    if (level === 1) {
      // 第一層：放三本書
      return (
        <View style={styles.booksRow}>
          {[1, 2, 3].map((_, i) => (
            <View key={i} style={styles.bookWrapper}>
              <Image source={require('../assets/images/book_green.png')} style={styles.bookImage} />
              <Text style={styles.bookLabelText}>XXXX</Text>
            </View>
          ))}
        </View>
      );
    } else if (level === 2) {
      // 第二層：放妳畫的加號按鈕
      return (
        <View style={styles.addArea}>
          <TouchableOpacity style={styles.addButton}>
            <View style={styles.dashedCircle}>
              <Text style={styles.addPlus}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ImageBackground source={CoinBarBg} style={styles.coinBar} resizeMode="contain">
          <Text style={styles.coinText}>1,200</Text>
        </ImageBackground>
        <TouchableOpacity style={styles.settingsButton}>
          <Image source={SettingsIcon} style={styles.settingsIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.fixedContent}>
        <ImageBackground source={CabinetFrame} style={styles.largeCabinet} resizeMode="stretch">
          <View style={styles.shelfContainer}>
            {[1, 2, 3, 4].map((level) => (
              <View key={level} style={styles.cabinetLevel}>
                {/* 讓內容物貼齊底部木板 */}
                <View style={styles.levelContent}>
                  {renderLevelContent(level)}
                </View>
                {/* 層架木板 */}
                <Image source={ShelfDivider} style={styles.levelDivider} resizeMode="stretch" />
              </View>
            ))}
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2e9cc' },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25, paddingTop: 40 },
  coinBar: { width: 140, height: 50, justifyContent: 'center', alignItems: 'center' },
  coinText: { fontSize: 16, fontWeight: 'bold', color: '#8B4513', marginLeft: 15 },
  settingsButton: { width: 45, height: 45, justifyContent: 'center', alignItems: 'center' },
  settingsIcon: { width: '100%', height: '100%', resizeMode: 'contain' },
  fixedContent: {
    flex: 1,
    // 1. 【關鍵修改】拉大左右與頂部 padding，讓櫃子變小並往中央移
    paddingTop: 40,          // 從 20 拉高到 40，讓櫃子離頂部 UI 遠一點
    paddingHorizontal: 20,   // 從 25 拉大到 35，讓櫃子整體「收縮」
    paddingBottom: 130,      // 留出底部導覽列的空間
    alignItems: 'center',    // 確保櫃子在水平中央
  },
  
  largeCabinet: {
    width: '100%',
    // 2. 【關鍵修改】設定固定比例 (寬:高)，確保櫃子形狀正確
    aspectRatio: 3 / 4.8,     // 根據妳畫的框，這個比例看起來會比較精緻
    resizeMode: 'stretch',   // 保持拉伸模式
  },

  shelfContainer: {
    flex: 1,
    // 3. 【關鍵修改】增加內部呼吸間距，讓書不要太擠
    paddingTop: 15,          // 頂部書跟框框的距離
    paddingHorizontal: 10,   // 左右間距
    paddingBottom: 25,       // 最底部書跟框框的距離
  },

 cabinetLevel: {
    flex: 1,
    justifyContent: 'flex-end', // 這是關鍵：讓所有東西往下壓
  },
  levelContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  booksRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingBottom: 2, // 避免書本直接壓死在木板線上
  },
  bookWrapper: {
    alignItems: 'center',
    width: 70,
  },
  bookImage: {
    width: 55,  // 稍微縮小一點點會更精緻
    height: 80,
    resizeMode: 'contain',
  },
  bookLabelText: {
    fontSize: 10,
    color: '#6F4E37',
    fontWeight: 'bold',
    marginTop: 2,
  },

  // 加號按鈕樣式
  addArea: {
    width: '100%',
    paddingLeft: 30, // 依照妳草圖的位置調整
    paddingBottom: 30,
  },
  addButton: {
    width: 44,
    height: 44,
  },
  dashedCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#8B4513',
    borderStyle: 'dashed', // 虛線效果
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPlus: {
    fontSize: 22,
    color: '#8B4513',
    fontWeight: '300',
  },

  levelDivider: {
    width: '100%',
    height: 12,
  },
});