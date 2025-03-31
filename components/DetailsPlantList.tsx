import React from 'react';
import { Box, Text } from '~/theme';

export const DetailsPlantList = () => {
  return (
    <Box flexDirection="row" justifyContent="center" alignItems="center" padding="ml_24">
      <Text>No plants saved</Text>
    </Box>

    // <ScrollView
    //   horizontal
    //   showsHorizontalScrollIndicator={false}
    //   contentContainerStyle={{
    //     gap: 15,
    //     paddingTop: 36,
    //   }}>
    //   <DetailsCard plant={{ name: 'test', id: 'idplant' }} />
    //   <DetailsCard plant={{ name: 'test', id: 'idplant' }} />
    // </ScrollView>
  );
};
