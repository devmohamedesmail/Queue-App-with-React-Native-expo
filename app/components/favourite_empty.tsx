import React from 'react'
import { Div, Text } from 'react-native-magnus'
import { useTheme } from '../context/ThemeContext'
import AntDesign from '@expo/vector-icons/AntDesign'
import colors from '../config/colors'
import { useTranslation } from 'react-i18next'


export default function Favourite_Empty() {
    const { theme } = useTheme()
    const { t, i18n } = useTranslation()
  return (
     <Div justifyContent="center" alignItems="center" py={60}>
            <Div
                h={100}
                w={100}
                bg={theme === 'light' ? '#F3F4F6' : '#374151'}
                rounded="circle"
                justifyContent="center"
                alignItems="center"
                mb={20}
            >
                <AntDesign
                    name="hearto"
                    size={40}
                    color={theme === 'light' ? '#9CA3AF' : '#6B7280'}
                />
            </Div>
            <Text
                fontSize={18}
                fontWeight="600"
                color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}
                fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                mb={8}
                textAlign="center"
            >
                {t('no_favourites')}
            </Text>
            <Text
                fontSize={14}
                color={theme === 'light' ? '#6B7280' : '#9CA3AF'}
                fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                textAlign="center"
                lineHeight={20}
            >
                {t('start_adding_favourites')}
            </Text>
        </Div>
  )
}
