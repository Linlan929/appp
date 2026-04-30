import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets, SafeAreaProvider } from 'react-native-safe-area-context';
export default function App() {
  const insets = useSafeAreaInsets();
  // 模擬一些手繪風格的顏色
  const shelfColors = ['#4E7D5B', '#7DA9C1', '#D9A066', '#E27D60', '#C38D9E'];

  // 生成一排書的組件
  const renderBooks = (count) => {
    return Array.from({ length: count }).map((_, i) => (
      <TouchableOpacity key={i} style={styles.bookWrapper}>
        <View style={[
          styles.bookBody, 
          { 
            backgroundColor: shelfColors[i % shelfColors.length],
            height: 70 + Math.random() * 20, // 讓高度有一點點隨機，更有手繪感
            transform: [{ rotate: `${(Math.random() - 0.5) * 5}deg` }] // 讓書稍微歪歪的
          }
        ]} />
        <View style={styles.bookLabel} />
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 頂部標題區 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>我的手繪圖鑑</Text>
        <View style={styles.coinBar}>
          <Text style={styles.coinText}>💰 1,200</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 四層書架 */}
        {[1, 2, 3, 4].map((level) => (
          <View key={level} style={styles.shelfLayer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.itemsContainer}>
              {renderBooks(6)}
            </ScrollView>
            {/* 木板層 */}
            <View style={styles.woodPlank}>
              <View style={styles.woodTexture} />
            </View>
          </View>
        ))}
      </ScrollView>

      {/* 底部導覽列 */}
      <View style={styles.navBar}>
        {['🏠', '🔍', '🎒', '👤'].map((icon, index) => (
          <TouchableOpacity key={index} style={styles.navItem}>
            <Text style={{ fontSize: 24 }}>{icon}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBF5', // 溫暖的紙張底色
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,    // 讓頂部留更多空間
    paddingBottom: 20, // 讓標題跟第一層架子分開一點
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#5D4037',
  },
  coinBar: {
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#D2B48C',
  },
  coinText: {
    fontWeight: 'bold',
    color: '#8B4513',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  shelfLayer: {
    marginBottom: 60, // 從原本的 40 改成 60，架子就會離遠一點
    paddingHorizontal: 10,
  },
  itemsContainer: {
    flexDirection: 'row',
    marginBottom: -5, // 讓書稍微「踩」在木板上
  },
  bookWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: 8,
    width: 45,
  },
  bookBody: {
    width: 40,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  bookLabel: {
    width: 20,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginTop: -15,
    marginBottom: 10,
    borderRadius: 2,
  },
  woodPlank: {
    height: 14,
    backgroundColor: '#8B4513',
    borderRadius: 7,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    elevation: 5,
  },
  woodTexture: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginTop: 4,
    marginHorizontal: 10,
    borderRadius: 1,
  },
  navBar: {
    position: 'absolute',
    // 修改這裡：原本的 30 加上手機底部的安全距離 (insets.bottom)
    bottom: 30 + (insets.bottom > 0 ? insets.bottom : 0), 
    left: 20,
    right: 20,
    height: 70,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#F0EAD6',
  },
  navItem: {
    padding: 10,
  },
});