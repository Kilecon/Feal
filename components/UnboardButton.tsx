import { Feather } from '@expo/vector-icons';
import React, { RefObject } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { theme } from '~/theme';
import { useRouter } from 'expo-router';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type ButtonProps = {
  flatListRef: RefObject<FlatList>;
  flatListIndex: number;
  dataLength: number;
};

export function UnboardButton({ dataLength, flatListIndex, flatListRef }: ButtonProps) {
  const router = useRouter();

  const buttonAnimationStyle = useAnimatedStyle(() => {
    const isLastScreen = flatListIndex === dataLength - 1;
    return {
      width: isLastScreen ? withSpring(140) : withSpring(60),
      height: 60,
    };
  });

  const arrowAnimationStyle = useAnimatedStyle(() => {
    const isLastScreen = flatListIndex === dataLength - 1;
    return {
      opacity: isLastScreen ? withTiming(0) : withTiming(1),
      transform: [{ translateX: isLastScreen ? withTiming(100) : withTiming(0) }],
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    const isLastScreen = flatListIndex === dataLength - 1;
    return {
      opacity: isLastScreen ? withTiming(1) : withTiming(0),
      transform: [{ translateX: isLastScreen ? withTiming(0) : withTiming(-100) }],
    };
  });

  const handleNextScreen = () => {
    const isLastScreen = flatListIndex === dataLength - 1;
    if (!isLastScreen) {
      flatListRef.current?.scrollToIndex({ index: flatListIndex + 1 });
    } else {
      router.replace({ pathname: '/home' });
    }
  };

  return (
    <AnimatedPressable onPress={handleNextScreen} style={[styles.container, buttonAnimationStyle]}>
      <Animated.Text style={[styles.text, textAnimationStyle]}>Get Started</Animated.Text>

      <Animated.View style={[arrowAnimationStyle]}>
        <Feather name="arrow-right" size={30} color={theme.colors.white} />
      </Animated.View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.darkBlue,
    padding: 10,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  text: {
    position: 'absolute',
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
});
