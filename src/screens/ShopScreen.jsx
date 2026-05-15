import React from 'react';
import { 
  StyleSheet, Text, View, FlatList, 
  SafeAreaView, ImageBackground, TouchableOpacity 
} from 'react-native';

const SHOP_ITEMS = Array.from({ length: 15 }, (_, i) => ({
  id: String(i + 1),
  price: 100 + (i * 20),
}));

const CoinBarBg = require('../assets/images/bg_coin_bar.png');

export default function ShopScreen() {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemWrapper}>
      <View style={styles.itemImagePlaceholder} />
      <Text style={styles.itemPriceText}>$ {item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. 頂部遮擋色塊 (包含金幣與細線) */}
      <View style={styles.headerBlock}>
        <ImageBackground source={CoinBarBg} style={styles.coinBar} resizeMode="contain">
          <Text style={styles.coinText}>1,200</Text>
        </ImageBackground>
        <View style={styles.separatorLine} />
      </View>

      {/* 2. 商品列表 */}
      <FlatList
        data={SHOP_ITEMS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={3}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* 3. 底部遮擋色塊 (這就是妳要的，讓商品滑入導覽列後方消失) */}
      <View style={styles.bottomBlock} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2e9cc', 
  },
  // 頂部樣式
  headerBlock: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 25,
    backgroundColor: '#f2e9cc',
    zIndex: 10,
  },
  separatorLine: {
    position: 'absolute',
    bottom: 0,
    left: '5%',
    right: '5%',
    height: 1,
    backgroundColor: 'rgba(74, 52, 40, 0.3)',
  },
  
  // 列表內容邊距
  listContent: {
    paddingHorizontal: 15,
    paddingTop: 20,
    // 💡 底部預留空間要稍微大一點，確保最後一排不會被 bottomBlock 永久擋死
    paddingBottom: 120, 
  },

  // 💡 底部遮擋色塊
  bottomBlock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,           // 這裡的高度要剛好覆蓋導覽列區域
    backgroundColor: '#f2e9cc', // 設為跟背景一樣的色塊
    zIndex: 10,           // 確保它壓在商品列表上方
  },

  // 商品樣式保持不變
  coinBar: { width: 140, height: 50, justifyContent: 'center', alignItems: 'center' },
  coinText: { fontSize: 16, fontWeight: 'bold', color: '#ffebdc', marginLeft: 15 },
  itemWrapper: { flex: 1, alignItems: 'center', margin: 12, maxWidth: '30%' },
  itemImagePlaceholder: {
    width: '100%',
    aspectRatio: 1, 
    backgroundColor: '#D9D9D9', 
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(74, 52, 40, 0.2)',
  },
  itemPriceText: { marginTop: 10, fontSize: 15, color: '#63483b', fontWeight: 'bold' },
});