import React from 'react'
import { Div, Text } from 'react-native-magnus'
import colors from '../../config/colors'
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import Creative_Header from '../../components/creative_header'
import User_Queues from '../../components/user_queues'


export default function MyQueue({ route }) {
    const { theme } = useTheme()
    const { t, i18n } = useTranslation()
    const { queue, place } = route.params;
    return (

        <Div bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.black} h="100%" >
            <Creative_Header title={t('my-queues')} />
            <User_Queues />
        </Div>

    )
}
