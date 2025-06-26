import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Linking, useColorScheme } from 'react-native';
import { Div, Text, Button } from 'react-native-magnus';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../../config/colors';
import i18n from '../../translation/i18n';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function Privacy() {
  const [expandedSections, setExpandedSections] = useState({});
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === 'dark' ? colors.darkTheme : colors.lightTheme;
  const {theme}=useTheme();
  const {t}=useTranslation();
  const navigation = useNavigation<any>();
  const toggleSection = (section:any) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const openLink = (url) => {
    Linking.openURL(url);
  };

  const privacySections = [
    {
      id: 'collection',
      title: i18n.t('privacy.collection.title'),
      icon: 'storage',
      content: i18n.t('privacy.collection.content')
    },
    {
      id: 'usage',
      title: i18n.t('privacy.usage.title'),
      icon: 'settings',
      content: i18n.t('privacy.usage.content')
    },
    {
      id: 'sharing',
      title: i18n.t('privacy.sharing.title'),
      icon: 'share',
      content: i18n.t('privacy.sharing.content')
    },
    {
      id: 'security',
      title: i18n.t('privacy.security.title'),
      icon: 'security',
      content: i18n.t('privacy.security.content')
    },
    {
      id: 'retention',
      title: i18n.t('privacy.retention.title'),
      icon: 'access-time',
      content: i18n.t('privacy.retention.content')
    },
    {
      id: 'rights',
      title: i18n.t('privacy.rights.title'),
      icon: 'verified-user',
      content: i18n.t('privacy.rights.content')
    }
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: themeColors.background }} showsVerticalScrollIndicator={false}>
      <Div bg={themeColors.background} flex={1}>
        {/* Header */}
        <Div bg={themeColors.primary} pt={60} pb={30} px={20}>
          <Div row alignItems="center" mb={20}>
            <Button bg="transparent" onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="white" /></Button>
            <Div
              h={40}
              w={40}
              bg={themeColors.white}
              rounded="circle"
              justifyContent="center"
              alignItems="center"
              mr={15}
            >
                
              <MaterialIcons name="security" color={themeColors.primary} size={20} />
            </Div>
            <Text color={themeColors.white} fontSize={24} fontWeight="bold">
              {i18n.t('privacy.title')}
            </Text>
          </Div>
          <Text color={themeColors.light} fontSize={16} lineHeight={24}>
            {i18n.t('privacy.description')}
          </Text>
        </Div>

        {/* Last Updated */}
        <Div bg={themeColors.light} px={20} py={15}>
          <Text color={themeColors.textSecondary} fontSize={14}>
            {i18n.t('privacy.lastUpdated', { date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) })}
          </Text>
        </Div>

        {/* Privacy Sections */}
        <Div px={20} py={20}>
          {privacySections.map((section) => (
            <TouchableOpacity
              key={section.id}
              onPress={() => toggleSection(section.id)}
              activeOpacity={0.7}
            >
              <Div
                bg={themeColors.white}
                rounded={12}
                mb={15}
                shadow="sm"
                overflow="hidden"
              >
                <Div
                  row
                  alignItems="center"
                  justifyContent="space-between"
                  p={20}
                  bg={expandedSections[section.id] ? themeColors.light : themeColors.white}
                >
                  <Div row alignItems="center" flex={1}>
                    <Div
                      h={45}
                      w={45}
                      bg={expandedSections[section.id] ? themeColors.primary : themeColors.light}
                      rounded="circle"
                      justifyContent="center"
                      alignItems="center"
                      mr={15}
                    >
                      <MaterialIcons
                        name={section.icon as 'storage' | 'settings' | 'share' | 'security' | 'access-time' | 'verified-user'}
                        color={expandedSections[section.id] ? themeColors.white : themeColors.textSecondary}
                        size={20}
                      />
                    </Div>
                    <Text
                      fontSize={16}
                      fontWeight="600"
                      color={themeColors.textPrimary}
                      flex={1}
                    >
                      {section.title}
                    </Text>
                  </Div>
                  <MaterialIcons
                    name={expandedSections[section.id] ? "expand-less" : "expand-more"}
                    color={themeColors.textSecondary}
                    size={20}
                  />
                </Div>

                {expandedSections[section.id] && (
                  <Div px={20} pb={20}>
                    <Text
                      fontSize={15}
                      lineHeight={22}
                      color={themeColors.textSecondary}
                      ml={60}
                    >
                      {section.content}
                    </Text>
                  </Div>
                )}
              </Div>
            </TouchableOpacity>
          ))}
        </Div>


          {/* Contact Section */}
        <Div bg="gray50" px={20} py={25} mx={20} rounded={12} mb={20}>
          <Text fontSize={18} fontWeight="600" color="gray800" mb={15}>
            Questions About Privacy?
          </Text>
          <Text fontSize={15} color="gray600" mb={20} lineHeight={22}>
            If you have any questions about this privacy policy or how we handle your data, 
            we're here to help.
          </Text>
          
          <Div row>
            <Button
              bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
              color="white"
              flex={1}
              mr={10}
              py={12}
              rounded={8}
              onPress={() => openLink('mailto:privacy@yourapp.com')}
            >
              {t('email-us')}
            </Button>
            <Button
              bg="white"
              color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
              borderColor={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
              borderWidth={1}
              flex={1}
              py={12}
              rounded={8}
              onPress={() => openLink('https://yourapp.com/privacy')}
            >
              {t('learn-more')}
            </Button>
          </Div>
        </Div>

        {/* Footer */}
        <Div px={20} pb={40}>
          <Text fontSize={13} color={themeColors.textSecondary} textAlign="center" lineHeight={20}>
            {i18n.t('privacy.footer')}
          </Text>
        </Div>
      </Div>
    </ScrollView>
  );
}