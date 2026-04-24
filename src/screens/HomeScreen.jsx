import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>佩琳的手繪圖鑑</Text>
        <View style={styles.testPlank} />
        <Text style={styles.status}>看見這行字就成功了！✨</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F2E9', // 紙張底色
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 20,
  },
  testPlank: {
    width: '80%',
    height: 15,
    backgroundColor: '#8B4513',
    borderRadius: 10,
  },
  status: {
    marginTop: 20,
    color: '#555',
  },
});