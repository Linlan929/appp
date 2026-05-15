import React, { useState, useRef } from 'react';
import { 
  StyleSheet, Text, View, FlatList, SafeAreaView, 
  TouchableOpacity, Dimensions, Animated, ScrollView 
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState(0);
  
  // 1. 設定數值
  const SCREEN_PADDING = 25; // 左右留白
  const ADJUSTED_WIDTH = width - (SCREEN_PADDING * 2); // 扣除留白後的有效寬度
  const TAB_WIDTH = ADJUSTED_WIDTH / 3; // 每個 Tab 底線的寬度

  // 2. 定義動畫值
  const scrollX = useRef(new Animated.Value(0)).current;

  // 3. 定義底線位移 (要在 scrollX 定義之後)
  const indicatorTranslateX = scrollX.interpolate({
    inputRange: [0, width * 3],
    outputRange: [SCREEN_PADDING, SCREEN_PADDING + ADJUSTED_WIDTH], 
  });

  const contentScrollView = useRef(null);

  const stats = { books: 12, following: 85, followers: 120 };
  const TABS = ['分享', '收藏', '按讚'];

  const handleTabPress = (index) => {
    setActiveTab(index);
    contentScrollView.current?.scrollTo({ x: index * width, animated: true });
  };

  const handleScrollListener = (event) => {
    const xOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(xOffset / width);
    if (index !== activeTab) {
      setActiveTab(index);
    }
  };

  const renderGridItem = () => (
    <View style={styles.contentCard}>
      <View style={styles.cardImage} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 頂部資訊區 */}
      <View style={styles.headerBlock}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarPlaceholder} />
          <View style={styles.nameSection}>
            <Text style={styles.userName}>布丁的小書架</Text>
            <Text style={styles.userBio}>喜歡復古風格與森林系拼貼 ✨</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}><Text style={styles.statNumber}>{stats.books}</Text><Text style={styles.statLabel}>建立書本</Text></View>
          <View style={styles.vLine} />
          <View style={styles.statItem}><Text style={styles.statNumber}>{stats.following}</Text><Text style={styles.statLabel}>追蹤中</Text></View>
          <View style={styles.vLine} />
          <View style={styles.statItem}><Text style={styles.statNumber}>{stats.followers}</Text><Text style={styles.statLabel}>粉絲</Text></View>
        </View>
      </View>

      {/* 分類 Tab 區 */}
      <View style={styles.tabBarContainer}>
        <View style={[styles.tabButtons, { paddingHorizontal: SCREEN_PADDING }]}>
          {TABS.map((tab, index) => (
            <TouchableOpacity 
              key={tab} 
              style={styles.tabBtn} 
              onPress={() => handleTabPress(index)}
              activeOpacity={1} // ✅ 解決閃爍
            >
              <Text style={[styles.tabText, activeTab === index && styles.activeTabText]}>
                {tab === '分享' ? '分享過的' : tab === '收藏' ? '收藏設計' : '按讚作品'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* 動態滑動底線 */}
        <Animated.View 
          style={[
            styles.animatedIndicator, 
            { 
              width: TAB_WIDTH,
              transform: [{ translateX: indicatorTranslateX }] 
            }
          ]} 
        />
      </View>

      {/* 內容分頁區 */}
      <ScrollView
        ref={contentScrollView}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false, listener: handleScrollListener }
        )}
        scrollEventThrottle={16}
      >
        <View style={{ width }}><FlatList data={[1, 2, 3, 4, 5, 6]} numColumns={2} columnWrapperStyle={styles.row} contentContainerStyle={styles.listContent} renderItem={renderGridItem} /></View>
        <View style={{ width }}><FlatList data={[1, 2, 3]} numColumns={2} columnWrapperStyle={styles.row} contentContainerStyle={styles.listContent} renderItem={renderGridItem} /></View>
        <View style={{ width }}><FlatList data={[1, 2, 3, 4]} numColumns={2} columnWrapperStyle={styles.row} contentContainerStyle={styles.listContent} renderItem={renderGridItem} /></View>
      </ScrollView>

      <View style={styles.bottomBlock} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2e9cc' },
  headerBlock: { paddingTop: 60, paddingHorizontal: 25, backgroundColor: '#f2e9cc' },
  profileHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  avatarPlaceholder: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#8B4513', borderWidth: 2, borderColor: '#fff' },
  nameSection: { marginLeft: 15 },
  userName: { fontSize: 20, fontWeight: 'bold', color: '#4A3428' },
  userBio: { fontSize: 13, color: 'rgba(74, 52, 40, 0.6)', marginTop: 4 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 20 },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 18, fontWeight: 'bold', color: '#4A3428' },
  statLabel: { fontSize: 12, color: 'rgba(74, 52, 40, 0.5)', marginTop: 2 },
  vLine: { width: 1, height: '60%', backgroundColor: 'rgba(74, 52, 40, 0.1)', alignSelf: 'center' },
  tabBarContainer: { backgroundColor: '#f2e9cc', borderBottomWidth: 1, borderBottomColor: 'rgba(74, 52, 40, 0.05)' },
  tabButtons: { flexDirection: 'row', height: 45 },
  tabBtn: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  tabText: { color: 'rgba(74, 52, 40, 0.5)', fontSize: 14 },
  activeTabText: { color: '#8B4513', fontWeight: 'bold' },
  animatedIndicator: { height: 3, backgroundColor: '#8B4513', position: 'absolute', bottom: 0, borderRadius: 2 },
  listContent: { paddingHorizontal: 20, paddingTop: 15, paddingBottom: 150 },
  row: { justifyContent: 'space-between' },
  contentCard: { width: (width - 40 - 15) / 2, height: 160, backgroundColor: '#fff', borderRadius: 12, marginBottom: 15 },
  cardImage: { flex: 1, backgroundColor: '#E8E8E8', borderRadius: 12 },
  bottomBlock: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 90, backgroundColor: '#f2e9cc', zIndex: 10 },
});