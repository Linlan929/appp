import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet } from 'react-native';

const CoinBarBg = require('../assets/images/bg_coin_bar.png');
const SettingsIcon = require('../assets/images/icon_settings.png');

export default function ShelfHeader({ onOpenSettings }) {
  return (
    <View style={styles.header}>
      <ImageBackground source={CoinBarBg} style={styles.coinBar} resizeMode="contain">
        <Text style={styles.coinText}>1,200</Text>
      </ImageBackground>
      <TouchableOpacity onPress={onOpenSettings}>
        <Image source={SettingsIcon} style={styles.settingsIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25, paddingTop: 40 },
  coinBar: { width: 140, height: 50, justifyContent: 'center' },
  coinText: { fontSize: 16, fontWeight: 'bold', color: '#ffebdc', marginLeft: 45 },
  settingsIcon: { width: 45, height: 45, resizeMode: 'contain' },
});