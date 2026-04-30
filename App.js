import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

// 引入頁面
import HomeScreen from './src/screens/HomeScreen';
import ShopScreen from './src/screens/ShopScreen';

const Tab = createBottomTabNavigator();

// 自定義導覽列組件：負責讓導覽列固定且「飄」在所有頁面之上
function MyTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.navBar, { bottom: 5 + insets.bottom }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // 根據頁面名稱顯示對應圖示
        const icons = { Home: '🏠', Search: '🔍', Shop: '🎒', Profile: '👤' };

        return (
          <TouchableOpacity 
            key={index} 
            onPress={onPress} 
            style={styles.navItem}
            activeOpacity={0.7}
          >
            <Text style={{ 
              fontSize: 24, 
              // 當前頁面圖示不透明，其他頁面半透明，增加質感
              opacity: isFocused ? 1 : 0.3,
              // 如果選中，可以加一點點放大效果
              transform: [{ scale: isFocused ? 1.2 : 1 }]
            }}>
              {icons[route.name]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator 
          tabBar={props => <MyTabBar {...props} />}
          screenOptions={{ headerShown: false }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={View} /> 
          <Tab.Screen name="Shop" component={ShopScreen} />
          <Tab.Screen name="Profile" component={View} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  navBar: {
    position: 'absolute',
    left: 20,
    right: 20,
    height: 70,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 35,
    elevation: 10,
    borderWidth: 2,
    borderColor: '#F0EAD6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});