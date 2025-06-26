import React from 'react'
import { Button, Div, Text } from 'react-native-magnus';
import { useTheme } from '../context/ThemeContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from '../config/colors';

interface NotificationBtnProps {
  count?: number;
  onPress?: () => void;
  size?: number;
}

export default function Notification_Btn({ count = 0, onPress, size = 28 }: NotificationBtnProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const iconColor = isLight ? colors.lightTheme.primary : colors.darkTheme.primary;
  const badgeBg = isLight ? 'red600' : 'red400';
 
  return (
    <Button
      bg={isLight ? colors.lightTheme.primary : colors.darkTheme.dark}
      p={0}
      h={55}
      w="95%"
      alignSelf='center'
      rounded="md"
      alignItems="center"
      justifyContent="center"
      onPress={onPress}
      underlayColor={isLight ? '#F3F4F6' : '#23243a'}
    >
      <Div position="relative" alignItems="center" flexDir='row' justifyContent="center">
        <AntDesign name="bells" size={20} color='white' />
        <Text color="white" mx={10}>Notification</Text>
      </Div>
    </Button>
  )
}
