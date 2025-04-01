import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';

import { SearchBar } from '~/components/SearchBar';
import { fetchPlantList } from '~/lib/api';
import { Box, Text, useTheme } from '~/theme';
import { useRouter } from 'expo-router';
import { Plant } from '~/types/api.type';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const AddPlantList = () => {
  const theme = useTheme();
  const [page, setPage] = useState<number>(1);
  const [previousPage, setPreviousPage] = useState(1);
  const [query, setQuery] = useState<string>('');
  const [plantList, setPlantList] = useState<Plant[]>([]);

  const router = useRouter();

  const { isPending, error, data } = useQuery({
    queryKey: ['plantList', query, page],
    queryFn: async () => fetchPlantList(query, page),
    placeholderData: keepPreviousData,
  });

  const loadMore = () => {
    if (!isPending) {
      if (data && page === data.last_page) {
        return;
      }
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (previousPage !== page) {
      setPlantList((previous) => [...previous, ...(data?.data ?? [])]);
      setPreviousPage(page);
      return;
    }
    setPage(1);
    setPlantList(data?.data ?? []);
  }, [data]);

  if (isPending) {
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

        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item
            flexDirection="row"
            justifyContent="space-between"
            flexWrap="wrap">
            {[...Array(6)].map((_, i) => (
              <SkeletonPlaceholder.Item
                key={i}
                width="48%"
                height={200}
                borderRadius={16}
                marginBottom={16}
              />
            ))}
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </LinearGradient>
    );
  }

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

      {error ? (
        <Box flexDirection="row" justifyContent="center" alignItems="center" padding="ml_24">
          <Text>Network error</Text>
        </Box>
      ) : (
        <>
          <Text variant="smallSB" color="bgInput" paddingHorizontal="sm_12">
            {data?.total} Results
          </Text>

          <FlatList
            data={plantList}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ gap: theme.spacing.ml_24 }}
            columnWrapperStyle={{ gap: theme.spacing.m_16 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => router.push({ pathname: '/detail', params: { plantId: item.id } })}
                style={{ alignSelf: 'flex-start', flex: 1 }}>
                <Box padding="m_16" gap="s_8" backgroundColor="white" borderRadius="medium">
                  <Image
                    source={{
                      uri: `${process.env.EXPO_PUBLIC_IMAGES_SRC}all_${item.common_name!.split(' ')[item.common_name!.split(' ').length - 1].toLowerCase()}.png?raw=true`,
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
              </TouchableOpacity>
            )}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isPending ? <ActivityIndicator size="large" color="green" /> : null
            }
          />
        </>
      )}
    </LinearGradient>
  );
};
