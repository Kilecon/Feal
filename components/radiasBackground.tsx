import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { Box, theme } from '~/theme';
import { StyleSheet, useWindowDimensions } from 'react-native';

export default function GradientBackground() {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  return (
    <Box style={StyleSheet.absoluteFillObject} flexDirection="column" justifyContent="flex-end">
      <Svg height={SCREEN_WIDTH} width={SCREEN_WIDTH} style={{ bottom: 50 }}>
        <Defs>
          <RadialGradient id="grad" cx="80%" cy="50%" r="100%">
            <Stop offset="0%" stopColor={theme.colors.green} stopOpacity="0.9" />
            <Stop offset="50%" stopColor={theme.colors.green} stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grad)" />
      </Svg>
    </Box>
  );
}
