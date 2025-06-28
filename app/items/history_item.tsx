import React from 'react'
import { Div, Text } from 'react-native-magnus';
import { useTheme } from '../context/ThemeContext';
import colors from '../config/colors';
import { useTranslation } from 'react-i18next';
import Feather from '@expo/vector-icons/Feather';
import { getLimitedWords } from '../utils/getLimitedWords';
export default function History_Item({ item }) {
    const { theme } = useTheme();
    const { i18n } = useTranslation();
    const date = new Date(item.createdAt);
    const day = date.getDate();
    const month = date.toLocaleString(i18n.language, { month: 'short' });
    const placeName = i18n.language === 'ar' ? getLimitedWords(item.place.nameAr,5) : getLimitedWords(item.place.nameEn,5);
    const address = i18n.language === 'ar' ? item.place.addressAr : item.place.addressEn;

    return (
        <Div
            flexDir="row"
            alignItems="center"
            bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.surface}
            shadow="md"
            shadowColor={theme === 'light' ? '#00000010' : '#00000030'}
            mx={10}
            my={8}
            px={16}
            py={14}
            rounded={16}
            borderWidth={1}
            borderColor={theme === 'light' ? colors.lightTheme.primary + '30' : colors.darkTheme.primary + '30'}
        >
            <Div alignItems="center" justifyContent="center" mr={18}>
                <Div
                    bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                    h={54}
                    w={54}
                    rounded="circle"
                    alignItems="center"
                    justifyContent="center"
                    mb={4}
                    shadow="sm"
                    shadowColor={theme === 'light' ? '#00000010' : '#00000030'}
                >
                    <Text fontSize={22} fontWeight="bold" color={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.background}>
                        {day}
                    </Text>
                    <Text fontSize={13} fontWeight="600" color={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.background}>
                        {month}
                    </Text>
                </Div>
                <Feather name="clock" size={18} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />
            </Div>
            <Div flex={1}>
                <Text
                    fontWeight="bold"
                    color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                    fontSize={15}
                    mb={2}
                    numberOfLines={1}
                    fontFamily={i18n.language === 'en' ? 'poppins-bold' : 'cairo'}
                >
                    {placeName}
                </Text>
                <Text
                    fontSize={12}
                    color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}
                    fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                    numberOfLines={2}
                >
                    {address}
                </Text>
            </Div>
        </Div>
    );
}
