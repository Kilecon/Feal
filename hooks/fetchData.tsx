import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, TextInput, StyleSheet } from "react-native";
import axios from "axios";

const API_KEY = "sk-7i6e67b4a68c8da1a8719";
const BASE_URL = `https://perenual.com/api/v2/species-list?key=${API_KEY}`;

interface Plant {
  id: number;
  common_name: string;
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
      {}
      <TextInput
        style={styles.searchInput}
        placeholder="Search plants..."
        value={query}
        onChangeText={setQuery}
        returnKeyType="search"
        onSubmitEditing={() => setSearchTerm(query)}
      />

      {}
      <Text style={styles.header}>Total Results: {totalResults}</Text>

      {}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.itemText}>{item.common_name || "Unknown"}</Text>
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
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    marginVertical: 5,
  },
});
