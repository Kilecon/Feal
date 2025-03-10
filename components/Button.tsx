import { Pressable, View } from 'react-native';
import { Text, theme } from '~/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect, useRef } from 'react';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type ButtonProps = {
  label: string;
  onPress: () => void;
  solid?: boolean;
  icon?: IconProp | null;
};

export function Button({ label, onPress, solid = true, icon }: ButtonProps) {
  const width = useSharedValue(0);
  const measureRef = useRef<View>(null);

  useEffect(() => {
    if (measureRef.current) {
      measureRef.current.measure((x, y, w) => {
        width.value = withTiming(w, { duration: 200 });
      });
    }
  }, [label]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: width.value > 0 ? width.value : undefined,
  }));

  return (
    <>
      {/* Mesure du bouton sans l'afficher */}
      <View
        ref={measureRef}
        style={[
          {
            position: 'absolute',
            opacity: 0,
            backgroundColor: solid ? theme.colors.darkBlue : 'transparent',
            paddingHorizontal: theme.spacing.ml_24,
            paddingVertical: theme.spacing.sm_12,
            alignItems: 'center',
            gap: theme.spacing.sm_12,
            flexDirection: 'row',
            alignSelf: 'flex-start',
            borderRadius: theme.borderRadii.base,
            overflow: 'hidden',
          },
          animatedStyle,
        ]}>
        <Text variant="buttonLabel" color={solid ? 'white' : 'darkBlue'} style={{ lineHeight: 21 }}>
          {label}
        </Text>
        {icon && <FontAwesomeIcon icon={icon} color={solid ? 'white' : theme.colors.darkBlue} />}
      </View>

      {/* Bouton animé */}
      <AnimatedPressable
        style={[
          {
            backgroundColor: solid ? theme.colors.darkBlue : 'transparent',
            paddingHorizontal: theme.spacing.ml_24,
            paddingVertical: theme.spacing.sm_12,
            alignItems: 'center',
            gap: theme.spacing.sm_12,
            flexDirection: 'row',
            alignSelf: 'flex-start',
            borderRadius: theme.borderRadii.base,
            overflow: 'hidden',
          },
          animatedStyle,
        ]}
        onPress={onPress}>
        <Text variant="buttonLabel" color={solid ? 'white' : 'darkBlue'} style={{ lineHeight: 21 }}>
          {label}
        </Text>
        {icon && <FontAwesomeIcon icon={icon} color={solid ? 'white' : theme.colors.darkBlue} />}
      </AnimatedPressable>
    </>
  );
}
