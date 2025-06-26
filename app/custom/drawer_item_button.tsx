import React from 'react'
import { Button, Div, Text } from 'react-native-magnus'
import { useTheme } from '../context/ThemeContext'
import colors from '../config/colors';
import { useTranslation } from 'react-i18next';

interface DrawerItemButtonProps {
  icon?: React.ReactNode;
  title?: string;
  onPress?: () => void;
  [key: string]: any;
}

export default function Drawer_Item_Button({ icon, title = '', onPress = () => {}, ...props }: DrawerItemButtonProps) {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  return (
    <Button
      onPress={onPress}
      mb={5}
      bg={theme === 'light' ? colors.lightTheme.light : colors.darkTheme.dark}
      borderBottomWidth={theme === 'light' ? 1 : 0}
      h={60}
      borderBottomColor={theme === 'light' ? "gray300" : "gray200"}
      shadow="3xl"
      rounded={10}
      mx={5}
      {...props}
    >
      <Div flexDir='row' w="100%">
        {icon}
        <Text fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light} mx={10} >{title}</Text>
      </Div>
    </Button>
  )
}
