import React, { memo } from 'react';
import Animated from 'react-native-reanimated';
import { Box, theme } from '~/theme';

type PaginationCompProps = {
  index: number;
  currentPage: number;
};

const PaginationComp = memo(({ index, currentPage }: PaginationCompProps) => {
  return (
    <Animated.View
      style={{
        aspectRatio: 1,
        height: 12,
        backgroundColor:
          currentPage == index ? theme.colors.darkBlue : `${theme.colors.darkBlue}40`,
        borderRadius: 6,
      }}
    />
  );
});

type PaginationProps = {
  pageNumber: number;
  currentPage: number;
};

export function Pagination({ pageNumber, currentPage }: PaginationProps) {
  if (!pageNumber) return null;

  return (
    <Box flexDirection="row" alignItems="center" justifyContent="center" gap="xs_4">
      {Array.from({ length: pageNumber }, (_, index) => (
        <PaginationComp key={index} index={index} currentPage={currentPage} />
      ))}
    </Box>
  );
}
