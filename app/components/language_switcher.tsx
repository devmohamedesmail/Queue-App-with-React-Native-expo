import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-magnus'
import { useTranslation } from 'react-i18next'

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation()
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang)
      .then(() => {
        // I18nManager.forceRTL(newLang === 'ar');

      })
      .catch(err => console.error('Failed to change language', err));
  };



  return (
    <View>
      <Text>{t("welcome")}</Text>
      <Button onPress={() => toggleLanguage()}>chaneg</Button>
    </View>
  )
}

export default LanguageSwitcher