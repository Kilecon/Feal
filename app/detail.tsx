import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView } from 'react-native';
import uuid from 'react-native-uuid';

import { Button } from '~/components/Button';
import { ChipsList, ChipsTipsKeys } from '~/components/ChipsList';
import { Header } from '~/components/Header';
import GradientBackground from '~/components/radiasBackground';
import useStorage from '~/core/storage';
import { fetchPlant } from '~/lib/api';
import { Box, Text, theme } from '~/theme';
import { Plant } from '~/types/api.type';
import { LocalPlant } from '~/types/storage.type';
import { PlantHealth } from '~/components/PlantHealth';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function Detail() {
  const params = useLocalSearchParams();
  const { plantId, localId } = params;

  const [localPlants, setLocalPlants] = useStorage<LocalPlant[]>('localPlants');
  const localPlant = localPlants?.find((p) => p.id === localId);

  let { isPending, error, data } = useQuery({
    queryKey: ['plantDetails', plantId],
    queryFn: async () => fetchPlant(parseInt(plantId as string, 10)),
  });
  const router = useRouter();

  if (isPending) {
    return (
      <>
        <Stack.Screen options={{ title: 'Detail', headerShown: false }} />
        <SafeAreaView
          style={{
            backgroundColor: theme.colors.background,
            flex: 1,
          }}>
          <Box paddingVertical="sm_12">
            <Header title="Plant detail" canGoBack />
          </Box>
          <GradientBackground />
          <ScrollView>
            <Box
              flexDirection="column"
              flex={1}
              justifyContent="space-between"
              paddingHorizontal="l_32"
              paddingTop="m_16">
              <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item
                  alignSelf="center"
                  width="70%"
                  height={32}
                  borderRadius={20}
                />
              </SkeletonPlaceholder>
              <Box
                height={400}
                flexDirection="row"
                paddingVertical="l_32"
                paddingHorizontal="ml_24"
                alignItems="center">
                <SkeletonPlaceholder>
                  <SkeletonPlaceholder.Item width={90} height={220} borderRadius={20} />
                </SkeletonPlaceholder>
              </Box>

              <Box gap="sm_12">
                <Text variant="subtitle">Tips for your plant</Text>
                <SkeletonPlaceholder>
                  <SkeletonPlaceholder.Item flexDirection="row" flexWrap="wrap" gap={8}>
                    {[...Array(3)].map((_, i) => (
                      <SkeletonPlaceholder.Item
                        key={i}
                        width={92}
                        height={32}
                        borderRadius={16}
                        marginBottom={16}
                      />
                    ))}
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder>

                <SkeletonPlaceholder>
                  <SkeletonPlaceholder.Item height={130} borderRadius={20} />
                </SkeletonPlaceholder>
              </Box>
            </Box>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }

  if (error) {
    return null;
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Detail', headerShown: false }} />
      <SafeAreaView
        style={{
          backgroundColor: theme.colors.background,
          flex: 1,
        }}>
        <GradientBackground />
        <Box paddingVertical="sm_12">
          <Header title="Plant detail" canGoBack />
        </Box>
        <ScrollView>
          <Box
            flexDirection="column"
            flex={1}
            justifyContent="space-between"
            paddingHorizontal="l_32"
            paddingTop="m_16">
            <Text variant="subtitleRegular" textAlign="center">
              {data!.common_name}
            </Text>
            <Box
              height={400}
              flexDirection="row"
              paddingVertical="l_32"
              paddingHorizontal="ml_24"
              alignItems="center">
              {localPlant && <PlantHealth id={localPlant.firebase_id} />}
              {!localPlant && (
                <Button
                  label="Save"
                  onPress={async () => {
                    await setLocalPlants([
                      ...(localPlants ?? []),
                      {
                        id: uuid.v4(),
                        api_id: data!.id,
                        name: data?.common_name ?? '',
                        firebase_id: '0000',
                      },
                    ]);
                    if (router.canGoBack()) router.back();
                  }}
                />
              )}
              <Image
                source={{
                  uri: `${process.env.EXPO_PUBLIC_IMAGES_SRC}all_${data!.common_name!.split(' ')[data!.common_name!.split(' ').length - 1].toLowerCase()}.png?raw=true`,
                }}
                style={{
                  resizeMode: 'contain',
                  height: 344,
                  aspectRatio: 1,
                  position: 'absolute',
                  alignSelf: 'flex-end',
                  right: -100,
                  top: 40,
                }}
              />
            </Box>

            <Box gap="sm_12">
              <Text variant="subtitle">Tips for your plant</Text>
              <ChipsList chipsToShow={getChipsToShow(data!)} />
              <Box padding="m_16" backgroundColor="bgCard" borderRadius="base">
                <Text variant="smallSB" style={{ textOverflow: 'ellipsis' }}>
                  {data?.description}
                </Text>
              </Box>
            </Box>
          </Box>
        </ScrollView>
      </SafeAreaView>
    </>
  );

  function getChipsToShow(plant: Plant): ChipsTipsKeys[] {
    const chips: ChipsTipsKeys[] = [];

    if (plant.flowers) {
      chips.push(ChipsTipsKeys.flowers);
    }
    if (plant.medicinal) {
      chips.push(ChipsTipsKeys.medical);
    }
    if (plant.edible_fruit) {
      chips.push(ChipsTipsKeys.edible_fruit);
    }
    if (plant.edible_leaf) {
      chips.push(ChipsTipsKeys.edible_leaf);
    }
    if (plant.poisonous_to_humans) {
      chips.push(ChipsTipsKeys.poisonous_to_humans);
    }
    if (plant.poisonous_to_pets) {
      chips.push(ChipsTipsKeys.poisonous_to_pets);
    }
    if (plant.cuisine) {
      chips.push(ChipsTipsKeys.cuisine);
    }
    if (plant.indoor) {
      chips.push(ChipsTipsKeys.indoor);
    }
    if (plant.tropical) {
      chips.push(ChipsTipsKeys.tropical);
    }
    if (plant.rare) {
      chips.push(ChipsTipsKeys.rare);
    }
    if (plant.invasive) {
      chips.push(ChipsTipsKeys.invasive);
    }
    if (plant.fruits) {
      chips.push(ChipsTipsKeys.fruits);
    }

    return chips;
  }
}
