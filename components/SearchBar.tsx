import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TextInput } from 'react-native';

import { Box, useTheme } from '~/theme';

type SearchBarProps = {
  placeholder: string;
  onSearchChange: (value: string) => void;
};

export const SearchBar = ({ placeholder, onSearchChange }: SearchBarProps) => {
  const theme = useTheme();
  return (
    <Box
      backgroundColor="bgInput"
      paddingHorizontal="ml_24"
      paddingVertical="sm_12"
      borderRadius="base"
      flexDirection="row"
      alignItems="center">
      <TextInput
        placeholderTextColor={`${theme.colors.darkBlue}80`}
        placeholder={placeholder}
        onChangeText={onSearchChange}
        returnKeyType="search"
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          outline: 'none',
          ...theme.textVariants.smallSB,
          color: theme.colors.darkBlue,
        }}
      />
      <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color={`${theme.colors.darkBlue}80`} />
    </Box>
  );
};
