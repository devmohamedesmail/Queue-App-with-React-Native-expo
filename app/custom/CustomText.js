
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from 'react-native-magnus'
import { useTheme } from '../context/ThemeContext';
import colors from '../config/colors';

const CustomText = ({ content, ...props }) => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme()
  return (
    <Text
      
      fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
      color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary}
      {...props}>{content}  </Text>
  )
}

export default CustomText