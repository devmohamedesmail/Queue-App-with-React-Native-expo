import React from 'react';
import { Div, Text } from 'react-native-magnus';
import { ActivityIndicator } from 'react-native';
import colors from '../config/colors';
import { useTheme } from '../context/ThemeContext';

const LoaderSpinner: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Div
      flex={1}
      justifyContent="center"
      alignItems="center"
      bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background}
    >
      <ActivityIndicator
        size="large"
        color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
      />
      <Text
        mt={10}
        color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
        fontWeight="bold"
      >
        Loading...
      </Text>
    </Div>
  );
};

export default LoaderSpinner;
