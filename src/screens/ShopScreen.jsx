import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ShopScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🎒 商店 (Shop)</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.goBack()}
      >
        <Text>回主頁</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FDFBF5' },
  text: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  button: { padding: 10, backgroundColor: '#D2B48C', borderRadius: 10 }
});