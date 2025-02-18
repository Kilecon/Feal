import { Box, Text } from '~/theme';
import { Image, View } from 'react-native';

export default function ItemThird() {
  return (
    <>
      <Box height="100%">
        <Box style={{ paddingHorizontal: 40, paddingTop: 90 }} gap="l_32">
          <View>
            <Text variant="extra_large">Follow plant health</Text>
          </View>
        </Box>
        <Box
          flexDirection="column"
          justifyContent="center"
          flex={1}
          style={{ paddingHorizontal: 40 }}>
          <Box backgroundColor="green" style={{ width: 100, height: 300 }}></Box>
          <Image
            source={require('~/assets/zamioculcas_zamiifolia_plant.png')}
            style={{
              position: 'absolute',
              top: -20,
              right: 0,
              resizeMode: 'contain',
              height: 388,
              aspectRatio: 1,
              alignSelf: 'flex-end',
            }}
          />
        </Box>
      </Box>
    </>
  );
}
