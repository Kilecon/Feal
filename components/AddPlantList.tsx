import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image } from 'react-native';

import { SearchBar } from '~/components/SearchBar';
import { mcPlants } from '~/data/mock';
import { Box, Text, useTheme } from '~/theme';
import { ApiResponse, Plant } from '~/types/api';

const API_URL = `${process.env.API_URL}?key=${process.env.API_KEY}`;

// const API_KEY = 'sk-62ux67ea51627720a9525'; // Replace with a secure storage method
// const BASE_URL = `https://perenual.com/api/v2/species-list?key=${API_KEY}`;

export const AddPlantList = () => {
  const theme = useTheme();
  const [data, setData] = useState<Plant[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      //await fetchData(page === 1);

      setData(mcPlants);

      setPage(1);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query, page]);

  const fetchData = async (reset = false) => {
    if (loading || (totalResults > 0 && page > Math.ceil(totalResults / 30))) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get<ApiResponse>(`${API_URL}&q=${query}&page=${page}`);
      const newData = response.data.data || [];
      setData((prevData) => (reset ? newData : [...prevData, ...newData]));
      setTotalResults(response.data.total || 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  return (
    <LinearGradient
      colors={[theme.colors.darkGreen, `${theme.colors.darkGreen}50`]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.2, y: 1 }}
      style={{
        gap: theme.spacing.m_16,
        borderTopLeftRadius: theme.borderRadii.base,
        borderTopRightRadius: theme.borderRadii.base,
        padding: 16,
        flex: 1,
      }}>
      <SearchBar placeholder="Search a plant" onSearchChange={setQuery} />

      <Text variant="smallSB" color="bgInput" paddingHorizontal="sm_12">
        {totalResults} Results
      </Text>

      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: theme.spacing.ml_24 }}
        columnWrapperStyle={{ gap: theme.spacing.m_16 }}
        renderItem={({ item }) => (
          <Box
            padding="m_16"
            gap="s_8"
            backgroundColor="white"
            borderRadius="medium"
            style={{ alignSelf: 'flex-start' }}
            flex={1}>
            <Image
              source={{
                uri: item.default_image?.medium_url,
              }}
              style={{
                resizeMode: 'contain',
                height: 135,
                width: 135,
                alignSelf: 'center',
              }}
            />
            <Text color="darkBlue" variant="mediumSB">
              {item.common_name || 'Unknown'}
            </Text>
          </Box>
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="blue" /> : null}
      />
    </LinearGradient>
  );
};
