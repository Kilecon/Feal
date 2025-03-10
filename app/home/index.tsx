import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { ScrollView } from 'react-native';
import { Text, useTheme } from 'theme';

import { DetailsCard } from '~/components/DetailsCard';
import { SearchBar } from '~/components/SearchBar';
import { SectionTitle } from '~/components/SectionTitle';
import { Box } from '~/theme';

export default function Home() {
  const theme = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <Box
        flexDirection="column"
        flex={1}
        style={{ gap: 24 }}
        backgroundColor="background"
        paddingTop="l_32">
        <Text variant="medium" paddingHorizontal="ml_24">
          Hi buddie
        </Text>

        <Box paddingHorizontal="ml_24">
          <SectionTitle title="Your plants" />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 15,
              paddingTop: 36,
            }}>
            <DetailsCard plant={{ name: 'test', id: 'idplant' }} />
            <DetailsCard plant={{ name: 'test', id: 'idplant' }} />
          </ScrollView>
        </Box>

        <Box flex={1} flexDirection="column" gap="ml_24">
          <Box paddingHorizontal="ml_24">
            <SectionTitle title="Add plant" />
          </Box>

          <LinearGradient
            colors={[theme.colors.darkGreen, `${theme.colors.darkGreen}50`]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.2, y: 1 }}
            style={{
              borderTopLeftRadius: theme.borderRadii.base,
              borderTopRightRadius: theme.borderRadii.base,
              padding: 16,
              flex: 1,
            }}>
            <SearchBar placeholder="Search a plant" />
          </LinearGradient>
        </Box>
      </Box>
    </>
  );
}
