import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

const PlantDetailsScreen: React.FC<{ route: any }> = ({ route }) => {
  const { plant } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: plant.default_image?.medium_url || "https://via.placeholder.com/200" }}
        style={styles.image}
      />
      <Text style={styles.commonName}>{plant.common_name || "Unknown"}</Text>
      <Text style={styles.scientificName}>{plant.scientific_name?.join(", ") || "N/A"}</Text>
      <Text style={styles.family}>Family: {plant.family || "N/A"}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  commonName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  scientificName: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#666",
    marginBottom: 8,
  },
  family: {
    fontSize: 16,
    color: "#444",
  },
});

export default PlantDetailsScreen;
