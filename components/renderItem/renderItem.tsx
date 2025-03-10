import { useWindowDimensions } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { Box } from '~/theme';

export const RenderItem = ({
  item,
  index,
  x,
}: {
  item: React.JSX.Element;
  index: number;
  x: SharedValue<number>;
}) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const textAnimatedStyle = useAnimatedStyle(() => {
    const opacityAnimation = interpolate(
      x.value,
      [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
      [0, 1, 0],
      Extrapolate.CLAMP
    );

    const translateYAnimation = interpolate(
      x.value,
      [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
      [100, 0, 100],
      Extrapolate.CLAMP
    );

    return {
      opacity: opacityAnimation,
      transform: [{ translateY: translateYAnimation }],
    };
  });

  return (
    <Box flex={1} width={SCREEN_WIDTH}>
      <Animated.View style={textAnimatedStyle}>{item}</Animated.View>
    </Box>
  );
};
