import { Image } from 'react-native';
import { Box, Text } from 'theme';

import { Chips } from '~/components/Chips';

type Plant = {
  id: string;
  name: string;
};

type DetailsCardProps = {
  plant: Plant;
};

export const DetailsCard = ({ plant }: DetailsCardProps) => {
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
        source={require('~/assets/plants/id1.png')}
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
          <Text variant="smallSB">{plant.name} dsqd q sdq sqsd qsdqsd</Text>
        </Box>
        <Box flexDirection="row">
          <Chips label="10%" />
        </Box>
      </Box>
    </Box>
  );
};
