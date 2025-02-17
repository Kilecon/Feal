import { Box, Text } from 'theme';

type SectionTitleProps = {
  title: string;
};

export const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <Box alignItems="flex-start">
      <Text variant="subtitle">{title}</Text>
    </Box>
  );
};
