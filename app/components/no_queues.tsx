import React from 'react';
import { Div, Text } from 'react-native-magnus';
import { useTheme } from '../context/ThemeContext';
import colors from '../config/colors';
import { useTranslation } from 'react-i18next';
import Feather from '@expo/vector-icons/Feather';

export default function No_Queues() {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();

  return (
    <Div alignItems="center" justifyContent="center" py={60}>
      <Div
        bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
        h={90}
        w={90}
        rounded="circle"
        alignItems="center"
        justifyContent="center"
        mb={18}
        shadow="md"
        shadowColor={theme === 'light' ? '#00000010' : '#00000030'}
      >
        <Feather name="users" size={44} color={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.background} />
      </Div>
      <Text
        fontSize={20}
        fontWeight="bold"
        color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
        fontFamily={i18n.language === 'en' ? 'poppins-bold' : 'cairo'}
        mb={8}
      >
        {t('noQueues', 'No Queues Found')}
      </Text>
      <Text
        fontSize={15}
        color={theme === 'light' ? colors.lightTheme.gray : colors.darkTheme.gray}
        textAlign="center"
        fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
        maxW={260}
      >
        {t('noQueuesDesc', 'You have not joined or created any queues yet. Your queues will appear here.')}
      </Text>
    </Div>
  );
}
