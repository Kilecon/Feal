import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';

export const HorizontalScrollView = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={true} // Hide scroll indicator
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.card}>
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.image} />
        <Text>Item 1</Text>
      </View>
      <View style={styles.card}>
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.image} />
        <Text>Item 2</Text>
      </View>
      <View style={styles.card}>
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.image} />
        <Text>Item 3</Text>
      </View>
      {/* Add more items */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 10,
  },
  card: {
    marginRight: 10,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
});

export default HorizontalScrollView;
