import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, TextInput, StyleSheet, Image } from "react-native";
import axios from "axios";

const API_KEY = "sk-7i6e67b4a68c8da1a8719"; // Replace with a secure storage method
const BASE_URL = `https://perenual.com/api/v2/species-list?key=${API_KEY}`;

interface Plant {
  id: number;
  common_name: string | null;
  scientific_name: string[];
  family: string | null;
  default_image?: {
    medium_url: string;
  };
}

interface ApiResponse {
  data: Plant[];
  total: number;
}

export const App: React.FC = () => {
  const [data, setData] = useState<Plant[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [query, setQuery] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(query);
      setPage(1);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const fetchData = async (reset = false) => {
    if (loading || (totalResults > 0 && page > Math.ceil(totalResults / 30))) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get<ApiResponse>(`${BASE_URL}&q=${searchTerm}&page=${page}`);
      const newData = response.data.data || [];
      setData((prevData) => (reset ? newData : [...prevData, ...newData]));
      setTotalResults(response.data.total || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page === 1);
  }, [searchTerm, page]);

  const loadMore = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search plants..."
        value={query}
        onChangeText={setQuery}
        returnKeyType="search"
        onSubmitEditing={() => setSearchTerm(query)}
      />

      {/* Total Results */}
      <Text style={styles.header}>Total Results: {totalResults}</Text>

      {/* List of Plant Cards */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.default_image?.medium_url || "https://via.placeholder.com/80" }}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={styles.commonName}>{item.common_name || "Unknown"}</Text>
              <Text style={styles.scientificName}>{item.scientific_name?.join(", ") || "N/A"}</Text>
              <Text style={styles.family}>Family: {item.family || "N/A"}</Text>
            </View>
          </View>
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="blue" /> : null}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  commonName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  scientificName: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#666",
  },
  family: {
    fontSize: 12,
    color: "#444",
  },
});

export default App;
