import React from 'react'
import { Button, Div, Text } from 'react-native-magnus'
import { useTheme } from '../context/ThemeContext'
import colors from '../config/colors'
import { useTranslation } from 'react-i18next'
import Entypo from '@expo/vector-icons/Entypo';

const CustomAccountButton = ({ icon, title, onPress }) => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  return (
    <Button
      onPress={onPress}
      mx={5}
      bg={theme === 'light' ? colors.lightTheme.light : colors.darkTheme.dark}
      rounded={5}
      mb={5}
      h={65}
    >
      <Div flexDir='row' w="100%">
        <Div flexDir='row' flex={1} w="90%">
          {icon}
          <Text
            mx={10}
            fontWeight='bold'
            color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light}
            fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
          >{title}
          </Text>
        </Div>
        <Entypo name="chevron-thin-right" size={17} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light} />

      </Div>
    </Button>
  )
}

export default CustomAccountButton