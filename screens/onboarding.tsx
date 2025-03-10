import { FlatList, ViewToken } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { Pagination } from '~/components/Pagination';
import ItemFirst from '~/components/renderItem/itemFirst';
import ItemSecond from '~/components/renderItem/itemSecond';
import ItemThird from '~/components/renderItem/itemThird';
import { RenderItem } from '~/components/renderItem/renderItem';
import { Box } from '~/theme';
import { useState } from 'react';
import { Button } from '~/components/Button';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'expo-router';
import GradientBackground from '~/components/radiasBackground';
import {useAsyncStorage} from "@react-native-async-storage/async-storage"


export function Onboarding() {
  const {setItem} = useAsyncStorage("isOnboarded")
  const router = useRouter();
  const flatListRef = useAnimatedRef<FlatList>();

  const [currentPage, setCurrentPage] = useState(0);
  const x = useSharedValue(0);

  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    setCurrentPage(viewableItems[0].index ?? 0);
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const onboardPage = [<ItemFirst flatListRef={flatListRef} />, <ItemSecond />, <ItemThird />];

  const handleNextScreen = () => {
    const isLastScreen = currentPage === onboardPage.length - 1;
    if (!isLastScreen) {
      flatListRef.current?.scrollToIndex({ index: currentPage + 1 });
    } else {
      setItem('true');
      router.replace({ pathname: '/home' });
    }
  };

  const handleBack = () => {
    const isFirstScreen = currentPage === 0;
    if (!isFirstScreen) {
      flatListRef.current?.scrollToIndex({ index: currentPage - 1 });
    }
  };

  return (
    <Box flex={1}>
      <GradientBackground />
      <Animated.FlatList
        ref={flatListRef as any}
        data={onboardPage}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item, index }) => <RenderItem item={item} index={index} x={x} />}
        onScroll={onScroll}
        scrollEventThrottle={16}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        style={{ flex: 1 }}
      />

      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        height={45}
        marginVertical="ml_24"
        style={{ paddingHorizontal: 40 }}>
        <Pagination pageNumber={onboardPage.length} currentPage={currentPage} />
        {currentPage != 0 && (
          <Box flexDirection="row" alignItems="center" justifyContent="center">
            <Button label="Previous" onPress={handleBack} solid={false}></Button>
            <Button
              label={currentPage == onboardPage.length - 1 ? 'Get start' : 'Next'}
              onPress={handleNextScreen}
              icon={faArrowRight} ></Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
