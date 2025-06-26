import React, { useState } from 'react'
import { Div, Text } from 'react-native-magnus'
import colors from '../../config/colors'
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from 'react-i18next';
export default function HistoryItem({ item  }) {
    const { theme } = useTheme();

    const { i18n } = useTranslation();



    const date = new Date(item.createdAt);
    const day = date.getDate();
    const month = date.toLocaleString(i18n.language, { month: 'short' });
  
    const placeName = i18n.language === 'ar' ? item.place.nameAr : item.place.nameEn;
    const address = i18n.language === 'ar' ? item.place.addressAr : item.place.addressEn;
  




    return (
        <Div
            flexDir='row'
            alignItems='center'
            bg={theme === 'light' ? colors.lightTheme.light : colors.darkTheme.dark}
            shadow={6}
            mx={10}
            my={5}
            px={10}
            py={10}
            rounded={10}
        >
            <Div>


                <Text fontSize={35} textAlign='center' fontWeight='bold' color={colors.lightTheme.primary}>
                
                    
                    {day}
                    
                    </Text>
                <Text fontSize={20} textAlign='center' fontWeight='bold' color={colors.lightTheme.primary}>
                  
                    {month}
                </Text>
            </Div>
            <Div mx={20}>
                <Text
                    fontWeight='bold'
                    color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary}
                    fontSize={16}> {placeName} </Text>
                <Text
                    fontSize={12}
                    color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}
                    fontFamily='poppins'> {address} </Text>
            </Div>

        </Div>
    )
}
