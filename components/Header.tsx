import { Box, Text, theme } from 'theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TouchableOpacity } from 'react-native';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useRouter } from 'expo-router';

type HeaderProps = {
  title: string;
  canGoBack: boolean;
};

export const Header = ({ title, canGoBack = false }: HeaderProps) => {
  const router = useRouter();

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal="ml_24">
      {canGoBack ? (
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) router.back();
          }}>
          <Box
            borderRadius="small"
            backgroundColor="bgCard"
            height={40}
            width={40}
            alignItems="center"
            justifyContent="center">
            <FontAwesomeIcon icon={faChevronLeft} size={13} color={theme.colors.darkBlue} />
          </Box>
        </TouchableOpacity>
      ) : (
        <Box width={40} />
      )}

      <Text variant="mediumSB" color="darkBlue">
        {title}
      </Text>
      <Box width={40} />
    </Box>
  );
};
