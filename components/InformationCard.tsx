import { Box, Text, theme, Theme } from 'theme';
import { Chips } from '~/components/Chips';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { CircularProgressWithChild } from 'react-native-circular-progress-indicator';

type InformationCardProps = {
  label: string;
  color?: keyof Theme['colors'];
  pourcent: number;
  icon: IconProp;
};

export const InformationCard = ({
  label,
  color = 'green',
  icon,
  pourcent,
}: InformationCardProps) => {
  return (
    <Box
      borderRadius="base"
      backgroundColor="bgCard"
      padding="sm_12"
      flexDirection="column"
      alignItems="center"
      gap="sm_12">
      <CircularProgressWithChild
        inActiveStrokeWidth={3}
        initialValue={0}
        activeStrokeColor={theme.colors[color]}
        inActiveStrokeOpacity={0.3}
        value={pourcent}
        radius={20}
        activeStrokeWidth={3}
        duration={200}>
        <FontAwesomeIcon icon={icon} color={theme.colors[color]} size={16} />
      </CircularProgressWithChild>
      <Box gap="s_8" flexDirection="column" alignItems="center">
        <Text variant="smallB">{label}</Text>
        <Chips label={`${pourcent}%`} color={color} />
      </Box>
    </Box>
  );
};
