import { Box, Text, Theme } from 'theme';

type ChipsProps = {
  label: string;
  color?: keyof Theme['colors'];
};

export const Chips = ({ label, color = 'green' }: ChipsProps) => {
  return (
    <Box
      borderRadius="base"
      paddingHorizontal="sm_12"
      paddingVertical="xs_4"
      backgroundColor={color}>
      <Text variant="smallB">{label}</Text>
    </Box>
  );
};
