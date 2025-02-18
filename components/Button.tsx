import { Pressable } from 'react-native';
import { Text, theme } from '~/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Animated from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type ButtonProps = {
  label: string;
  onPress: () => void;
  solid?: boolean;
  icon?: IconProp | null;
};

export function Button({ label, onPress, solid = true, icon }: ButtonProps) {
  return (
    <AnimatedPressable
      style={{
        backgroundColor: solid ? theme.colors.darkBlue : 'transparent',
        paddingHorizontal: theme.spacing.ml_24,
        paddingVertical: theme.spacing.sm_12,
        alignItems: 'center',
        gap: theme.spacing.sm_12,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        borderRadius: theme.borderRadii.base,
      }}
      onPress={onPress}>
      <Text variant="buttonLabel" color={solid ? 'white' : 'darkBlue'}>
        {label}
      </Text>
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          color={solid ? 'white' : theme.colors.darkBlue}></FontAwesomeIcon>
      )}
    </AnimatedPressable>
  );
}
