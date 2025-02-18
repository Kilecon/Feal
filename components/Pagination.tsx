import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { theme } from '../constants/theme';
import { type Data } from '../data/screens';

type PaginationCompProps = {
  index: number;
  x: SharedValue<number>;
  screenWidth: number;
};

const DOT_SIZE = 10;
const ACTIVE_DOT_SIZE = 20;
const DOT_OPACITY_ACTIVE = 1;
const DOT_OPACITY_INACTIVE = 0.5;

const PaginationComp = memo(({ index, x, screenWidth }: PaginationCompProps) => {
  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      x.value,
      [
        (index - 1) * screenWidth,
        index * screenWidth,
        (index + 1) * screenWidth,
      ],
      [DOT_SIZE, ACTIVE_DOT_SIZE, DOT_SIZE],
      Extrapolate.CLAMP
    );

    const opacityAnimation = interpolate(
      x.value,
      [
        (index - 1) * screenWidth,
        index * screenWidth,
        (index + 1) * screenWidth,
      ],
      [DOT_OPACITY_INACTIVE, DOT_OPACITY_ACTIVE, DOT_OPACITY_INACTIVE],
      Extrapolate.CLAMP
    );

    return {
      width: widthAnimation,
      height: widthAnimation,
      opacity: opacityAnimation,
    };
  });

  return <Animated.View style={[styles.dots, animatedDotStyle]} />;
});

type PaginationProps = {
  data: Data[];
  x: SharedValue<number>;
  screenWidth: number;
};

export function Pagination({ data, screenWidth, x }: PaginationProps) {
  if (data.length === 0) return null;

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <PaginationComp
          key={item.id}
          index={index}
          x={x}
          screenWidth={screenWidth}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dots: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: theme.colors.backgroundHighlightColor,
    marginHorizontal: 10,
  },
});
