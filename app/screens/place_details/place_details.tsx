import React from 'react'
import { Div, Text, Button } from 'react-native-magnus'
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native'
import { Image, ScrollView, TouchableOpacity, Linking } from 'react-native'
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons'
import colors from '../../config/colors'
import Creative_Header from '../../components/creative_header'

type PlaceDetailsRoute = RouteProp<{ params: { place: any } }, 'params'>

export default function Place_Details() {
  const { theme } = useTheme()
  const { t, i18n } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute<RouteProp<{ params: { place: any } }, 'params'>>()
  const place = route.params?.place || {}

  const isLight = theme === 'light'
  const cardBg = isLight ? colors.lightTheme.white : colors.darkTheme.surface
  const textColor = isLight ? colors.lightTheme.black : colors.darkTheme.white
  const secondaryText = isLight ? colors.lightTheme.secondary : colors.darkTheme.secondary
  const accent = isLight ? colors.lightTheme.primary : colors.darkTheme.primary

  // Helper for creative days of work
  const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ]
  const daysAr = [
    'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'
  ]
  const userLang = i18n.language === 'ar' ? 'ar' : 'en'
  const days = userLang === 'ar' ? daysAr : daysOfWeek
  const workDays = place.daysOfWork || []

  return (
    <Div flex={1} bg={isLight ? colors.lightTheme.background : colors.darkTheme.background}>
      <Creative_Header title={t('place-details')} />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Image */}
        {place.image ? (
          <Div alignItems="center" mb={18}>
            <Image
              source={{ uri: place.image }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: accent,
              }}
              resizeMode="cover"
            />
          </Div>
        ) : null}
        {/* Name */}
        <Text
          fontSize={22}
          fontWeight="bold"
          color={textColor}
          textAlign="center"
          mb={6}
          fontFamily={i18n.language === 'en' ? 'poppins-bold' : 'cairo'}
        >
          {i18n.language === 'ar' ? place.nameAr : place.nameEn}
        </Text>
        {/* Address */}
        <Div row alignItems="center" justifyContent="center" mb={8}>
          <MaterialIcons name="location-on" size={20} color={accent} />
          <Text
            ml={6}
            color={secondaryText}
            fontSize={15}
            fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
            textAlign="center"
          >
            {i18n.language === 'ar' ? place.addressAr : place.addressEn}
          </Text>
        </Div>
        {/* Description */}
        {place.description ? (
          <Text
            color={textColor}
            fontSize={15}
            mb={10}
            textAlign="center"
            fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
          >
            {place.description}
          </Text>
        ) : null}
        {/* Creative Days of Work */}
        <Div mb={16} alignItems="center">
          <Div row alignItems="center" mb={4}>
            <Feather name="calendar" size={18} color={accent} />
            <Text ml={6} color={accent} fontWeight="bold">
              {t('working-days')}
            </Text>
          </Div>
          <Div row justifyContent="center" flexWrap="wrap" mt={6}>
            {days.map((day, idx) => {
              const isActive = workDays.includes(day)
              return (
                <Div
                  key={day}
                  px={12}
                  py={6}
                  m={4}
                  rounded={16}
                  bg={isActive ? accent : (isLight ? colors.lightTheme.light : colors.darkTheme.dark)}
                  shadow={isActive ? 'md' : undefined}
                  borderWidth={isActive ? 0 : 1}
                  borderColor={isActive ? accent : secondaryText}
                >
                  <Text
                    color={isActive ? '#fff' : secondaryText}
                    fontWeight={isActive ? 'bold' : 'normal'}
                    fontSize={14}
                  >
                    {day}
                  </Text>
                </Div>
              )
            })}
          </Div>
        </Div>
        {/* Working Hours */}
        <Div row alignItems="center" justifyContent="center" mb={10}>
          <Feather name="clock" size={18} color={accent} />
          <Text ml={6} color={secondaryText} fontWeight="bold">
            {t('working-hours')}
          </Text>
          <Text ml={6} color={textColor}>
            {place.timeStart} - {place.timeClosed}
          </Text>
        </Div>
        {/* Estimate Time */}
        <Div row alignItems="center" justifyContent="center" mb={10}>
          <Feather name="activity" size={18} color={accent} />
          <Text ml={6} color={secondaryText} fontWeight="bold">
            {t('estimate-time')}
          </Text>
          <Text ml={6} color={textColor}>
            {place.estimateTime} {t('minutes')}
          </Text>
        </Div>
        {/* Services */}
        {place.services && place.services.length > 0 && (
          <Div mb={14}>
            <Div row alignItems="center" mb={4}>
              <MaterialIcons name="miscellaneous-services" size={18} color={accent} />
              <Text ml={6} color={accent} fontWeight="bold">
                {t('services')}
              </Text>
            </Div>
            {place.services.map((service: any) => (
              <Div
                key={service._id}
                bg={isLight ? colors.lightTheme.background : colors.darkTheme.dark}
                rounded={10}
                p={10}
                mb={6}
                row
                alignItems="center"
                shadow="xs"
              >
                <Feather name="chevron-right" size={16} color={accent} />
                <Text ml={8} color={textColor} fontSize={15}>
                  {i18n.language === 'ar' ? service.nameAr : service.nameEn}
                </Text>
                <Text ml={8} color={secondaryText} fontSize={13}>
                  {service.estimateTime} {t('minutes')}
                </Text>
              </Div>
            ))}
          </Div>
        )}
        {/* Location Link */}
        {place.locationlink ? (
          <Button
            mt={10}
            bg={accent}
            block
            rounded={12}
            onPress={() => Linking.openURL(place.locationlink)}
            prefix={<Ionicons name="navigate" size={20} color="#fff" />}
          >
            {t('open-in-maps')}
          </Button>
        ) : null}
      </ScrollView>
    </Div>
  )
}