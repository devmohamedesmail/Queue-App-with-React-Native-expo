import React from 'react'
import { Button, Div, Text } from 'react-native-magnus'
import { useTheme } from '../context/ThemeContext'
import colors from '../config/colors';
import { useTranslation } from 'react-i18next';

export default function CustomDrawerItem({icon,title,onPress}) {
  const {theme}=useTheme();
  const {t,i18n}=useTranslation();
  return (
    <Button 
       onPress={onPress} 
       bg={theme === 'light' ? colors.lightTheme.light : colors.darkTheme.dark}
       borderBottomWidth={theme === 'light' ? 1 : 0} 
       h={60}
       borderBottomColor={theme === 'light' ? "gray300" : "gray200"}
       shadow="3xl"
       rounded={10}
       mx={5}
       
      
       >
        <Div flexDir='row'  w="100%">
            {icon}
            <Text fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light} mx={10} fontWeight='semibold'>{title}</Text>
        </Div>
    </Button>
  )
}
