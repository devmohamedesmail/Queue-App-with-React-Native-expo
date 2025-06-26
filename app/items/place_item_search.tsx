import React from 'react'
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Text, Div, Button, Dropdown } from 'react-native-magnus';
import colors from '../config/colors';
import { getLimitedWords } from '../utils/getLimitedWords';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Place_Item_Search({ place }: any) {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
  const { t, i18n } = useTranslation();
  const isLight = theme === 'light';
  const cardBg = isLight ? colors.lightTheme.white : colors.darkTheme.dark;
  const textPrimary = isLight ? colors.lightTheme.primary : colors.darkTheme.primary;
  const textSecondary = isLight ? colors.lightTheme.black : colors.darkTheme.light;
  const borderColor = isLight ? 'gray300' : 'transparent';

  return (
    <Dropdown.Option
      value={place._id}
      py={0}
      px={0}
      my={3}
      block
      key={place._id}
      bg="transparent"
      borderBottomWidth={0}
      borderBottomColor={borderColor}
    >
      <Button
        onPress={() => navigation.navigate('BankQueue', { place })}
        w="100%"
        bg={cardBg}
        m={0}
        p={0}
        h={80}
        rounded={14}
        shadow="sm"
        shadowColor={isLight ? '#00000010' : '#00000030'}
        alignItems="flex-start"
      >
        <Div flexDir="row" alignItems="center" w="100%" p={12}>
          {/* Icon or image placeholder */}
          <Div mr={14} bg={isLight ? colors.lightTheme.primary : colors.darkTheme.primary} rounded="circle" h={44} w={44} alignItems="center" justifyContent="center">
            <AntDesign name="enviromento" size={22} color={isLight ? '#fff' : '#fff'} />
          </Div>
          {/* Info */}
          <Div flex={1}>
            <Text
              fontWeight="bold"
              fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
              color={textPrimary}
              mb={3}
              fontSize={15}
              numberOfLines={1}
            >
              {getLimitedWords(i18n.language === 'ar' ? place.nameAr : place.nameEn, 8)}
            </Text>
            <Text
              fontSize={11}
              fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
              color={textSecondary}
              numberOfLines={1}
            >
              {i18n.language === 'ar' ? place.addressAr : place.addressEn}
            </Text>
          </Div>
          {/* Arrow icon */}
          <Div ml={10} alignItems="center" justifyContent="center">
            <AntDesign name="arrowright" size={20} color={textPrimary} />
          </Div>
        </Div>
      </Button>
    </Dropdown.Option>
  )
}
