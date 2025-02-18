import { FlatList, useWindowDimensions, ViewToken } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import { Button } from '~/components/Button';
import { Pagination } from '~/components/Pagination';
import ItemFirst from '~/components/renderItem/itemFirst';
import ItemSecond from '~/components/renderItem/itemSecond';
import ItemThird from '~/components/renderItem/itemThird';
import { RenderItem } from '~/components/renderItem/renderItem';
import { Box } from '~/theme';

export function Onboarding() {
  const flatListRef = useAnimatedRef<FlatList>();

  const flatListIndex = useSharedValue(0);
  const x = useSharedValue(0);

  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    flatListIndex.value = viewableItems[0].index ?? 0;
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const test = [<ItemFirst />, <ItemSecond />, <ItemThird />];

  const { width: SCREEN_WIDTH } = useWindowDimensions();
  return (
    <Box flex={1}>
      <Animated.FlatList
        ref={flatListRef as any}
        data={test}
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

      <Box flexDirection="row" alignItems="center" justifyContent="space-between" margin="ml_24">
        <Pagination data={test} screenWidth={SCREEN_WIDTH} x={x} />
        <Button flatListRef={flatListRef} flatListIndex={flatListIndex} dataLength={test.length} />
      </Box>
    </Box>
  );
}
