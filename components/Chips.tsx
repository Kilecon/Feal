import { IconDefinition, IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Box, Text, theme, Theme } from 'theme';

type ChipsProps = {
  label: string;
  color?: keyof Theme['colors'];
  icon?: IconDefinition;
};

export const Chips = ({ label, color = 'green', icon }: ChipsProps) => {
  return (
    <Box
      borderRadius="base"
      paddingHorizontal="sm_12"
      paddingVertical="xs_4"
      backgroundColor={color}>
        {icon !== undefined && (
          <FontAwesomeIcon icon={icon} color={theme.colors[color]} size={16} />
        )}
        <FontAwesomeIcon color={theme.colors[color]} size={16} icon={'function'} />
      <Text variant="smallB">{label}</Text>
    </Box>
  );
}