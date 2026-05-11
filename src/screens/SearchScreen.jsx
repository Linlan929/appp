import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, FlatList, 
  SafeAreaView, TouchableOpacity, Image, Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

// 1. 模擬社群數據：包含作者資訊與按讚數
const SOCIAL_POSTS = [
  { id: '1', title: '我的復古植物風書架', author: '小圓', likes: 128, category: '復古' },
  { id: '2', title: '極簡主義者', author: '阿明', likes: 45, category: '極簡' },
  { id: '3', title: '粉紅甜點夢幻箱', author: 'Lily', likes: 890, category: '可愛' },
  { id: '4', title: '午夜讀書會', author: '黑貓', likes: 210, category: '酷炫' },
  { id: '5', title: '2026 必讀清單', author: '閱讀王', likes: 66, category: '實用' },
  { id: '6', title: '小清新拼貼', author: '花花', likes: 15, category: '文青' },
];

export default function SearchSocialScreen() {
  const [searchText, setSearchText] = useState('');

  const filteredPosts = SOCIAL_POSTS.filter(post => 
    post.title.includes(searchText) || post.author.includes(searchText) || post.category.includes(searchText)
  );

  const renderSocialItem = ({ item }) => (
    <TouchableOpacity style={styles.postCard}>
      {/* 作品預覽圖 */}
      <View style={styles.imageBox}>
        <Text style={styles.categoryBadge}>{item.category}</Text>
      </View>
      
      {/* 資訊區 */}
      <View style={styles.infoBox}>
        <Text style={styles.postTitle} numberOfLines={1}>{item.title}</Text>
        <View style={styles.authorRow}>
          <View style={styles.avatarPlaceholder} />
          <Text style={styles.authorName}>{item.author}</Text>
          <View style={styles.likeRow}>
            <Text style={styles.likeIcon}>❤️</Text>
            <Text style={styles.likeCount}>{item.likes}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 頂部搜尋遮擋區 */}
      <View style={styles.searchHeader}>
        <View style={styles.topRow}>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="搜尋靈感、創作者..."
              placeholderTextColor="rgba(74, 52, 40, 0.4)"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          {/* 上傳按鈕 */}
          <TouchableOpacity style={styles.uploadBtn}>
            <Text style={styles.uploadBtnText}>分享</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separatorLine} />
      </View>

      {/* 社群作品列表 (2列網格) */}
      <FlatList
        data={filteredPosts}
        renderItem={renderSocialItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>還沒有人分享這類的設計喔...</Text>
          </View>
        }
      />

      {/* 底部遮擋色塊 */}
      <View style={styles.bottomBlock} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2e9cc' },
  searchHeader: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#f2e9cc',
    zIndex: 10,
  },
  topRow: { flexDirection: 'row', alignItems: 'center' },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(74, 52, 40, 0.05)',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(74, 52, 40, 0.2)',
  },
  searchIcon: { marginRight: 8, fontSize: 14 },
  searchInput: { flex: 1, fontSize: 14, color: '#4A3428' },
  uploadBtn: {
    marginLeft: 12,
    backgroundColor: '#8B4513',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  uploadBtnText: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  separatorLine: {
    position: 'absolute',
    bottom: 0,
    left: '5%',
    right: '5%',
    height: 1,
    backgroundColor: 'rgba(74, 52, 40, 0.1)',
  },
  listContent: { paddingHorizontal: 20, paddingTop: 15, paddingBottom: 120 },
  
  // 作品卡片樣式
  row: {
    justifyContent: 'space-between', // 讓左右卡片各貼一邊，中間均分
  },
  listContent: { 
    paddingHorizontal: 20, // 左右外框留白
    paddingTop: 15, 
    paddingBottom: 120 
  },
  postCard: {
    // 寬度 = (螢幕寬 - 左右邊界 40 - 中間間距 15) / 2
    width: (width - 40 - 15) / 2, 
    marginBottom: 15, // 只有上下間隔，左右不要加 margin
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    
    // 陰影保持
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageBox: {
    width: '100%',
    height: 150,
    backgroundColor: '#E8E8E8',
    justifyContent: 'flex-end',
    padding: 8,
  },
  categoryBadge: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: '#fff',
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  infoBox: { padding: 10 },
  postTitle: { fontSize: 14, fontWeight: 'bold', color: '#4A3428', marginBottom: 6 },
  authorRow: { flexDirection: 'row', alignItems: 'center' },
  avatarPlaceholder: { width: 18, height: 18, borderRadius: 9, backgroundColor: '#8B4513', marginRight: 5 },
  authorName: { fontSize: 12, color: '#666', flex: 1 },
  likeRow: { flexDirection: 'row', alignItems: 'center' },
  likeIcon: { fontSize: 10, marginRight: 2 },
  likeCount: { fontSize: 11, color: '#999' },

  bottomBlock: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 90,
    backgroundColor: '#f2e9cc', zIndex: 10,
  },
});