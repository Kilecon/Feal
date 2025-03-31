import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ActivityIndicator, Image } from 'react-native';
import { Box, Text } from 'theme';

import { Chips } from '~/components/Chips';
import { fetchPlant } from '~/lib/api';
import { LocalPlant } from '~/types/storage.type';

type DetailsCardProps = {
  localPlant: LocalPlant;
};

export const DetailsCard = ({ localPlant }: DetailsCardProps) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['plantDetails'],
    queryFn: async () => fetchPlant(localPlant.api_id),
  });

  if (isPending) {
    return <ActivityIndicator size="large" color="green" />;
  }

  if (error) {
    return null;
  }

  return (
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
          uri: `${process.env.EXPO_PUBLIC_IMAGES_SRC}all_${data!.common_name!.split(' ')[data!.common_name!.split(' ').length - 1].toLowerCase()}.png?raw=true`,
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
          <Text variant="smallSB">{data!.common_name}</Text>
        </Box>
        <Box flexDirection="row">
          <Chips label="10%" />
        </Box>
      </Box>
    </Box>
  );
};
