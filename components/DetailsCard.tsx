import { useRouter } from 'expo-router';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Box, Text } from 'theme';

import { Chips } from '~/components/Chips';
import { LocalPlant } from '~/types/storage.type';

type DetailsCardProps = {
  localPlant: LocalPlant;
};

export const DetailsCard = ({ localPlant }: DetailsCardProps) => {
  const router = useRouter();

  if (!localPlant) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: '/detail',
          params: { plantId: localPlant.api_id, localId: localPlant.id },
        })
      }
      style={{ alignSelf: 'flex-start', flex: 1 }}>
      <Box
        flexDirection="row"
        alignItems="flex-start"
        width={255}
        height={116}
        borderRadius="base"
        padding="m_16"
        backgroundColor="bgCard"
        position="relative">
        <Image
          source={{
            uri: `${process.env.EXPO_PUBLIC_IMAGES_SRC}all_${localPlant.name.split(' ')[localPlant.name.split(' ').length - 1].toLowerCase()}.png?raw=true`,
          }}
          style={{
            position: 'absolute',
            resizeMode: 'contain',
            height: 135,
            left: -10,
            top: -30,
            width: 135,
          }}
        />
        <Box flexDirection="column" height="100%" gap="sm_12" style={{ marginLeft: 100 }} flex={1}>
          <Box flexGrow={1}>
            <Text variant="smallSB">{localPlant.name}</Text>
          </Box>
          <Box flexDirection="row">
            <Chips label="10%" />
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
