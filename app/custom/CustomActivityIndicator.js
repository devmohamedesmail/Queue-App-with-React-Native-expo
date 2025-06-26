import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { Div } from 'react-native-magnus'
import colors from '../config/colors'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../context/ThemeContext'


const CustomActivityIndicator = () => {
    const { t } = useTranslation();
    const {theme}=useTheme()
  return (
    <Div flexDir='row' justifyContent='center' alignItems='center' w="100%" >
        <ActivityIndicator size="large" color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />
    </Div>
  )
}

export default CustomActivityIndicator