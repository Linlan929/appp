import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import ShopScreen from './src/screens/ShopScreen';

const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  
  // 定義導覽列圖示路徑
  const getIcon = (routeName, isFocused) => {
    const icons = {
      Home: {
        active: require('./src/assets/images/nav_home_active.png'),
        inactive: require('./src/assets/images/nav_home_inactive.png'),
      },
      Search: {
        active: require('./src/assets/images/nav_search_active.png'),
        inactive: require('./src/assets/images/nav_search_inactive.png'),
      },
      Shop: {
        active: require('./src/assets/images/nav_shop_active.png'), // 如果是背包圖示記得路徑
        inactive: require('./src/assets/images/nav_shop_inactive.png'),
      },
      Profile: {
        active: require('./src/assets/images/nav_profile_active.png'),
        inactive: require('./src/assets/images/nav_profile_inactive.png'),
      },
    };
    return isFocused ? icons[routeName].active : icons[routeName].inactive;
  };

  return (
    <View style={[styles.navBar, { bottom: 5 + insets.bottom }]}>
      <Image source={require('./src/assets/images/nav_bar_main.png')} style={styles.navBarBg} />
      <View style={styles.navContent}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          return (
            <TouchableOpacity 
              key={index} 
              onPress={() => navigation.navigate(route.name)} 
              style={styles.navItem}
            >
              <Image source={getIcon(route.name, isFocused)} style={styles.navIcon} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator tabBar={props => <MyTabBar {...props} />} screenOptions={{ headerShown: false }}>
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
  navBar: { position: 'absolute', left: 20, right: 20, height: 80, alignItems: 'center' },
  navBarBg: { position: 'absolute', width: '100%', height: '100%', resizeMode: 'contain' },
  navContent: { flexDirection: 'row', width: '100%', height: '100%', alignItems: 'center' },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  navIcon: { width: 40, height: 40, resizeMode: 'contain' },
});