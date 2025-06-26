import React from 'react'
import { Div, Text, Icon } from 'react-native-magnus'
import colors from '../config/colors'
import { useTheme } from '../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator } from 'react-native'


interface WaitingStatusProps {
    waitingQueues?: any[];
    loading?: boolean;
}

export default function Waiting_Status({ waitingQueues = [], loading = false }) {

    const { theme } = useTheme();
    const { t, i18n } = useTranslation();

    const isLight = theme === 'light';
    const cardBg = isLight ? colors.lightTheme.light : colors.darkTheme.dark;
    const textPrimary = isLight ? colors.lightTheme.primary : colors.darkTheme.primary;
    const textSecondary = isLight ? colors.lightTheme.black : colors.darkTheme.light;

    // Calculate estimated time (15 min per client)
    const clientsCount = waitingQueues ? waitingQueues.length : 0;
    const totalMinutes = clientsCount * 15;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return (
        <Div
            bg={cardBg}
            rounded={18}
            shadow="md"
            shadowColor={isLight ? '#00000010' : '#00000030'}
            p={22}
            mb={50}
            alignItems="center"
            // borderWidth={1}
            borderColor={isLight ? colors.lightTheme.light : colors.darkTheme.primary}
        >
            <Div flexDir="row" alignItems="center" mb={10}>
                <Icon
                    name="users"
                    fontFamily="Feather"
                    color={textPrimary}
                    fontSize={28}
                    mr={10}
                />
                <Text
                    fontWeight="bold"
                    fontSize={18}
                    color={textPrimary}
                    fontFamily={i18n.language === 'en' ? 'poppins-bold' : 'cairo'}
                >
                    {t('clients-in-queue')}
                </Text>
            </Div>
            {loading ? (
                <ActivityIndicator color={textPrimary} size="large" />
            ) : (
                <Text
                    fontSize={20}
                    fontWeight="bold"
                    color={textSecondary}
                    mb={8}
                    fontFamily={i18n.language === 'en' ? 'poppins-bold' : 'cairo'}
                >
                    {clientsCount > 0 ? clientsCount : t('no-clients')}
                </Text>
            )}

            <Div flexDir="row" alignItems="center" mt={10}>
                <Icon
                    name="clock"
                    fontFamily="Feather"
                    color={textPrimary}
                    fontSize={22}
                    mr={8}
                />
                <Text
                    fontSize={16}
                    color={textPrimary}
                    fontWeight="600"
                    fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                >
                    {t('estimate-time')}
                </Text>
                <Text
                    fontSize={16}
                    color={textSecondary}
                    fontWeight="bold"
                    ml={8}
                    fontFamily={i18n.language === 'en' ? 'poppins-bold' : 'cairo'}
                >
                    {`${hours}:${minutes.toString().padStart(2, '0')} H`}
                </Text>
            </Div>
        </Div>
    )
}
