import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';

const BookGreen = require('../assets/images/book_green.png');

export default function BookItem({ book, onOpen, onEdit }) {
  return (
    <TouchableOpacity 
      style={styles.bookWrapper} 
      onPress={() => onOpen(book)}
      onLongPress={() => onEdit(book)}
      delayLongPress={500}
    >
      <Image source={BookGreen} style={styles.bookImage} />
      <Text style={styles.bookLabelText} numberOfLines={1}>{book.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bookWrapper: { alignItems: 'center', width: '100%' },
  bookImage: { width: 45, height: 70, resizeMode: 'contain' },
  bookLabelText: { fontSize: 10, color: '#4A3428', fontWeight: 'bold', marginTop: 2 },
});