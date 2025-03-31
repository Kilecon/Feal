import { faDroplet, faSun } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView } from 'react-native';

import { ChipsList, ChipsTipsKeys } from '~/components/ChipsList';
import { Header } from '~/components/Header';
import { InformationCard } from '~/components/InformationCard';
import GradientBackground from '~/components/radiasBackground';
import { fetchPlant } from '~/lib/api';
import { Box, Text, theme } from '~/theme';
import { Plant } from '~/types/api.type';

export default function Detail() {
  const params = useLocalSearchParams();
  const { plantId, localId } = params;

  const { isPending, error, data } = useQuery({
    queryKey: ['plantDetails'],
    queryFn: async () => fetchPlant(parseInt(plantId as string, 10)),
  });

  if (isPending) {
    return (
      <>
        <Stack.Screen options={{ title: 'Detail', headerShown: false }} />
        <SafeAreaView
          style={{
            backgroundColor: theme.colors.background,
            flex: 1,
          }}>
          <ActivityIndicator size="large" color="green" />
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
              <Box flexDirection="column" alignItems="center" gap="s_8">
                <Box flexDirection="row">
                  <InformationCard label="Humidity" color="green" icon={faDroplet} pourcent={72} />
                </Box>
                <Box style={{ width: '100%' }}>
                  <InformationCard label="Light" color="orange" icon={faSun} pourcent={10} />
                </Box>
              </Box>
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
