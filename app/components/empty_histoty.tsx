import React from 'react';
import { Div, Text } from 'react-native-magnus';
import { useTheme } from '../context/ThemeContext';
import colors from '../config/colors';
import { useTranslation } from 'react-i18next';
import Feather from '@expo/vector-icons/Feather';

export default function Empty_Histoty() {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();

  return (
    <Div alignItems="center" justifyContent="center" py={60}>
      <Div
        bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
        h={80}
        w={80}
        rounded="circle"
        alignItems="center"
        justifyContent="center"
        mb={18}
        shadow="md"
        shadowColor={theme === 'light' ? '#00000010' : '#00000030'}
      >
        <Feather name="clock" size={38} color={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.background} />
      </Div>
      <Text
        fontSize={20}
        fontWeight="bold"
        color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
        fontFamily={i18n.language === 'en' ? 'poppins-bold' : 'cairo'}
        mb={8}
      >
        {t('noHistoryFound')}
      </Text>
      <Text
        fontSize={15}
        color={theme === 'light' ? colors.lightTheme.gray : colors.darkTheme.gray}
        textAlign="center"
        fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
        maxW={260}
      >
        {t('noHistoryDesc', 'You have not joined any queues yet. Your queue history will appear here.')}
      </Text>
    </Div>
  );
}
