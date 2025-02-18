import { Image, View } from 'react-native';
import { Box, Text } from '~/theme';

export default function ItemSecond() {
  return (
    <>
      <Box style={{ paddingHorizontal: 40, paddingTop: 50 }} gap="xl_64">
        <Image
          source={require('~/assets/onboarding_carrousell.png')}
          style={{
            resizeMode: 'contain',
            height: 340,
            aspectRatio: 1,
            alignSelf: 'center',
          }}
        />
        <Box>
          <View>
            <Text variant="extra_large">Search your plant</Text>
          </View>
        </Box>
      </Box>
    </>
  );
}
