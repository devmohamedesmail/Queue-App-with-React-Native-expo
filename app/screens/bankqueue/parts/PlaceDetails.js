import React from 'react'
import { Div, Text } from 'react-native-magnus'
import { useTheme } from '../../../context/ThemeContext'
import { useTranslation } from 'react-i18next';
import colors from '../../../config/colors';



export default function PlaceDetails({place}) {
    const { theme } = useTheme();
    const { t, i18n } = useTranslation();


    return (
        <Div flexDir='column' justifyContent='center' alignItems='center' mt={10} px={10}>


            <Text
                fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                fontWeight='bold' 
                fontSize={20} 
                lineHeight={30} 
                textAlign='center' 
                color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary} >
                {i18n.language === "ar" ? place.nameAr : place.nameEn}
            </Text>

            <Text
                fontSize={11}
                fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                my={5}
                mt={10} 
                color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}>
                {i18n.language === "ar" ? place.addressAr : place.addressEn}
            </Text>
        </Div>
    )
}
