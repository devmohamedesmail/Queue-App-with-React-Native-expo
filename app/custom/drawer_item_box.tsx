import React from 'react'
import { Button, Div, Text } from 'react-native-magnus'
import { useTheme } from '../context/ThemeContext'
import colors from '../config/colors';
import { useTranslation } from 'react-i18next';

interface DrawerItemBoxProps {
  title?: string;
  icon?: React.ReactNode;
  onPress?: () => void;
  bg?: string;
  color?: string;
  [key: string]: any;
}

export default function Drawer_Item_Box({
  title = '',
  icon,
  onPress = () => {},
  bg,
  color,
  ...props
}: DrawerItemBoxProps) {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  
  

  return (
     <Button 
      onPress={onPress}  
      bg={theme === 'light' ? colors.lightTheme.light : colors.darkTheme.dark} 
      w="48%" mb={5} h={85} rounded={10}>
      <Div flexDir='column' justifyContent='center' alignItems='center'>
        {icon}
        <Text 
          color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light} 
          mt={10} 
          fontWeight='bold'
          fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
          >{title}</Text>
      </Div>
    </Button>
  )
}
