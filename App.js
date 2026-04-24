import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';

export default function App() {
  // 這是你的金幣數量（以後可以從資料庫讀取）
  const coinCount = 1000;

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. 上方狀態列：金幣與設定 */}
      <View style={styles.header}>
        <View style={styles.coinBadge}>
          <View style={styles.coinIcon} /> {/* 這裡之後放你畫的金幣 SVG */}
          <Text style={styles.coinText}>{coinCount.toLocaleString()}</Text>
        </View>
        <TouchableOpacity style={styles.settingsBtn}>
          <View style={styles.gearIcon} /> {/* 這裡之後放你畫的設定齒輪 */}
        </TouchableOpacity>
      </View>

      {/* 2. 主體書櫃區 */}
      <View style={styles.shelfContainer}>
        {/* 四層架子 */}
        {[1, 2, 3, 4].map((layer) => (
          <View key={layer} style={styles.shelfLayer}>
            <View style={styles.shelfPlank} /> {/* 這是你的手繪木板位置 */}
            
            {/* 這裡先放幾個暫時的方塊代表書本/展示架 */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.itemsScroll}>
              <TouchableOpacity style={styles.placeholderItem}>
                <View style={[styles.bookShape, {backgroundColor: '#4E7D5B'}]} />
                <Text style={styles.itemTitle}>我的書本</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.placeholderItem}>
                <View style={[styles.shelfShape, {borderColor: '#7DA9C1'}]} />
                <Text style={styles.itemTitle}>展示架</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        ))}
      </View>

      {/* 3. 下方導覽列 */}
      <View style={styles.tabBar}>
        <Text>🏠</Text>
        <Text>🔍</Text>
        <Text>🛍️</Text>
        <Text>👤</Text>
      </View>
    </SafeAreaView>
  );
}

// 樣式設定
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F2E9', // 淡淡的紙張底色
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  coinBadge: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    alignItems: 'center',
  },
  coinIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#FFD700', // 暫時用黃色方塊代表金幣
    borderRadius: 10,
    marginRight: 8,
  },
  coinText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  settingsBtn: {
    width: 35,
    height: 35,
    backgroundColor: '#D2B48C',
    borderRadius: 18,
  },
  shelfContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
  },
  shelfLayer: {
    height: 120,
    justifyContent: 'flex-end',
  },
  shelfPlank: {
    height: 10,
    backgroundColor: '#8B4513', // 這是你的木頭架子
    borderRadius: 5,
    width: '100%',
  },
  itemsScroll: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    paddingLeft: 20,
  },
  placeholderItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  bookShape: {
    width: 60,
    height: 80,
    borderRadius: 4,
  },
  shelfShape: {
    width: 60,
    height: 80,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 4,
  },
  itemTitle: {
    fontSize: 10,
    marginTop: 5,
    color: '#555',
  },
  tabBar: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    backgroundColor: '#FFF',
  },
});