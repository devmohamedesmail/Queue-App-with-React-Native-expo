import React from 'react'
import { Button, Div, Text } from 'react-native-magnus'
import { useTheme } from '../context/ThemeContext'
import colors from '../config/colors';
import { useTranslation } from 'react-i18next';

export default function CustomDrawerBoxIcon({title,icon,onPress}) {
  const{theme,toggleTheme}=useTheme();
  const {t, i18n} = useTranslation();
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
