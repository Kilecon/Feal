import { Box, Text, Theme } from 'theme';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

type ChipsProps = {
  label: string;
  color?: keyof Theme['colors'];
  icon?: IconProp;
};

export const Chips = ({ label, color = 'green', icon }: ChipsProps) => {
  return (
    <Box
      borderRadius="base"
      paddingHorizontal="sm_12"
      paddingVertical="xs_4"
      backgroundColor={color}
      flexDirection="row"
      alignItems="center"
      gap="xs_4">
      {icon && <FontAwesomeIcon icon={icon} size={10} />}
      <Text variant="smallB">{label}</Text>
    </Box>
  );
};
