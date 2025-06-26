import React from 'react'
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Text, Div, Button } from 'react-native-magnus';
import colors from '../config/colors';

import AntDesign from '@expo/vector-icons/AntDesign';
import Custom_Modal from '../custom/custom_modal';

interface PlaceSelectModalProps {
    isModalVisible: boolean;
    toggleModal: () => void;
    selectedPlace: any;
}

export default function Place_Select_Modal({ isModalVisible, toggleModal, selectedPlace }: PlaceSelectModalProps) {
    const { theme } = useTheme();
    const { t, i18n } = useTranslation();
    const navigation = useNavigation<any>();
    const isLight = theme === 'light';
    const modalBg = isLight ? '#fff' : colors.darkTheme.dark;
    const textColor = isLight ? colors.lightTheme.white : colors.darkTheme.white;
    const accent = isLight ? colors.lightTheme.primary : colors.darkTheme.primary;

    return (
        <Custom_Modal isVisible={isModalVisible} h={400} onPressClose={toggleModal} onClose={toggleModal}>
            <Div
               
                rounded={20}
                p={24}
                mt={10}
                alignItems="center"
        
                
            >
                {/* Icon or Illustration */}
                
                <Div mb={15} bg={accent} rounded="circle" p={16} alignItems="center" justifyContent="center">
                    <Text fontSize={28} color="#fff">📍</Text>
                </Div>
                {/* Title */}
                <Text fontWeight="bold" color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white} fontSize={18} mb={8} textAlign="center">
                    {t('book-confirm')}
                </Text>
                {/* Place Name */}
                <Text
                    fontFamily={i18n.language === 'ar' ? 'cairo' : 'poppins-regular'}
                    fontSize={13}
                    color={accent}
                    textAlign="center"
                    mb={20}
                >
                    {selectedPlace ? (i18n.language === "ar" ? selectedPlace.nameAr : selectedPlace.nameEn) : t('loading')}
                </Text>


                <Button bg={theme === 'light' ? colors.lightTheme.primary : colors.lightTheme.primary} my={5} w="100%" h={50} p={0} rounded={10} onPress={toggleModal}>
                    <Div flexDir='row' alignItems='center' justifyContent='center' rounded={10}>

                        <AntDesign name="check" size={24} color={textColor} />
                        <Text fontSize={14} color={textColor} textAlign="center">
                            {t('ok')}
                        </Text>
                    </Div>
                </Button>

                <Button bg={theme === 'light' ? 'red600' : 'red600'} my={5} w="100%" h={50} p={0} rounded={10} onPress={toggleModal}>
                    <Div flexDir='row' alignItems='center' justifyContent='center' rounded={10}>
                        <AntDesign name="close" size={24} color={textColor} />
                        <Text fontSize={14} color={textColor} textAlign="center">
                            {t('close')}
                        </Text>
                    </Div>
                </Button>

            </Div>
        </Custom_Modal>
    )
}
