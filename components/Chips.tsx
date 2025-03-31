import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
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
      flexDirection="row"
      alignItems="center"
      borderRadius="base"
      paddingHorizontal="sm_12"
      paddingVertical="xs_4"
      backgroundColor="orange">
      {icon !== undefined && (
        <FontAwesomeIcon 
          icon={icon} 
          color={theme.colors[color]} 
          size={16}
          style={{ marginRight: 8 }}
        />
      )}
      <Text variant="smallB" color={color}>{label}</Text>
    </Box>
  );
};