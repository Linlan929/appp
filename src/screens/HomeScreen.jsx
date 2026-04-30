import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const shelfColors = ['#4E7D5B', '#7DA9C1', '#D9A066', '#E27D60', '#C38D9E'];

  // 生成手繪感書本組件
  const renderBooks = (count) => {
    return Array.from({ length: count }).map((_, i) => (
      <TouchableOpacity key={i} style={styles.bookWrapper}>
        <View style={[
          styles.bookBody, 
          { 
            backgroundColor: shelfColors[i % shelfColors.length],
            height: 70 + Math.random() * 20, 
            transform: [{ rotate: `${(Math.random() - 0.5) * 5}deg` }] 
          }
        ]} />
        <View style={styles.bookLabel} />
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 頂部標題區：金幣與設定 */}
      <View style={styles.header}>
        <View style={styles.coinBar}>
          <Text style={styles.coinText}>💰 1,200</Text>
        </View>

        <TouchableOpacity style={styles.settingsButton}>
          <Text style={{ fontSize: 24 }}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
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

      {/* 注意：這裡已經刪除了原本的 navBar，因為它現在由 App.js 統一控制 */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBF5', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  coinBar: {
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#D2B48C',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  coinText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  settingsButton: {
    width: 45,
    height: 45,
    backgroundColor: '#FFF',
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F0EAD6',
    elevation: 3,
  },
  scrollContent: {
    paddingBottom: 120, // 留空間給全域導覽列
  },
  shelfLayer: {
    marginBottom: 60, 
    paddingHorizontal: 10,
  },
  itemsContainer: {
    flexDirection: 'row',
    marginBottom: -5,
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
    elevation: 5,
  },
  woodTexture: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginTop: 4,
    marginHorizontal: 10,
    borderRadius: 1,
  },
});