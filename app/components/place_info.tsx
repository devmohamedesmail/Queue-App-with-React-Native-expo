import React from 'react';
import { Div, Text } from 'react-native-magnus';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import colors from '../config/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity, Animated, Linking } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';













export default function Place_Info({ place }:any) {
    const { theme } = useTheme();
    const { t, i18n } = useTranslation<any>();
    const scaleAnim = new Animated.Value(1);
    const navigation = useNavigation<any>();
    const animatePress = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.98,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            })
        ]).start();
    };

    const handleLocationPress = () => {
        animatePress();
        Linking.openURL(place.locationlink || `https://maps.google.com/?q=${place.location.lat},${place.location.lng}`);

    };

  

   

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Div mt={3} px={16}>
                {/* Main Card Container */}
                <Div
                    bg={theme === 'light' ? 'white' : colors.darkTheme.surface}
                    rounded={20}
                    shadow="lg"
                    overflow="hidden"
                    position="relative"
                >
                    {/* Decorative Background Pattern */}
                    <Div
                        position="absolute"
                        top={0}
                        right={0}
                        h={100}
                        w={100}
                        style={{
                            backgroundColor: theme === 'light' ? '#3B82F610' : '#1D4ED810',
                            borderBottomLeftRadius: 50,
                        }}
                    />
                    
                    {/* Floating Action Buttons */}
                    

                    {/* Content */}
                    <Div p={24} pt={20}>
                        {/* Location Icon Header */}
                    

                        {/* Place Name */}
                        <Text
                            fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                            fontWeight="bold"
                            fontSize={20}
                            lineHeight={32}
                            textAlign="center"
                            color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary}
                            mb={8}
                        >
                            {i18n.language === "ar" ? place.nameAr : place.nameEn}
                        </Text>

                        {/* Subtitle Line */}
                        <Div
                            h={2}
                            w={60}
                            bg={theme === 'light' ? '#3B82F6' : '#60A5FA'}
                            rounded={2}
                            alignSelf="center"
                            mb={20}
                        />

                        {/* Address Section */}
                        <TouchableOpacity
                            onPress={handleLocationPress}
                            activeOpacity={0.8}
                        >
                            <Div
                                bg={theme === 'light' ? '#F8FAFC' : '#1F2937'}
                                rounded={16}
                                p={16}
                                row
                                alignItems="center"
                                mb={20}
                            >
                                <Div
                                    h={40}
                                    w={40}
                                    bg={theme === 'light' ? '#EFF6FF' : '#1E3A8A'}
                                    rounded="circle"
                                    justifyContent="center"
                                    alignItems="center"
                                    mr={12}
                                >
                                    <MaterialIcons
                                        name="location-on"
                                        size={20}
                                        color={theme === 'light' ? '#3B82F6' : '#60A5FA'}
                                    />
                                </Div>
                                
                                <Div flex={1}>
                                    <Text
                                        fontSize={11}
                                        fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                                        color={theme === 'light' ? '#6B7280' : '#9CA3AF'}
                                        mb={2}
                                        fontWeight="500"
                                    >
                                        {t('location')}
                                    </Text>
                                    <Text
                                        fontSize={14}
                                        fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                                        color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}
                                        lineHeight={20}
                                        fontWeight="500"
                                    >
                                        {i18n.language === "ar" ? place.addressAr : place.addressEn}
                                    </Text>
                                </Div>
                                
                                <MaterialIcons
                                    name="chevron-right"
                                    size={20}
                                    color={theme === 'light' ? '#9CA3AF' : '#6B7280'}
                                />
                            </Div>
                        </TouchableOpacity>

                        {/* Quick Info Cards */}
                        <Div row justifyContent="space-between" mb={20}>
                            <Div
                                flex={1}
                                bg={theme === 'light' ? '#F0FDF4' : '#064E3B'}
                                rounded={12}
                                p={12}
                                mr={8}
                                alignItems="center"
                            >
                                <MaterialIcons
                                    name="access-time"
                                    size={20}
                                    color="#10B981"
                                />
                                <Text
                                    fontSize={10}
                                    fontWeight="600"
                                    color="#10B981"
                                    mt={4}
                                    fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                                >
                                    {t('open_now')}
                                </Text>
                            </Div>
                            
                            <Div
                                flex={1}
                                bg={theme === 'light' ? '#FEF3C7' : '#78350F'}
                                rounded={12}
                                p={12}
                                mx={4}
                                alignItems="center"
                            >
                                <MaterialIcons
                                    name="directions-walk"
                                    size={20}
                                    color="#F59E0B"
                                />
                                <Text
                                    fontSize={10}
                                    fontWeight="600"
                                    color="#F59E0B"
                                    mt={4}
                                    fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                                >
                                    5 min
                                </Text>
                            </Div>
                            
                            <Div
                                flex={1}
                                bg={theme === 'light' ? '#FEE2E2' : '#7F1D1D'}
                                rounded={12}
                                p={12}
                                ml={8}
                                alignItems="center"
                            >
                                <MaterialIcons
                                    name="people"
                                    size={20}
                                    color="#EF4444"
                                />
                                <Text
                                    fontSize={10}
                                    fontWeight="600"
                                    color="#EF4444"
                                    mt={4}
                                    fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                                >
                                    Popular
                                </Text>
                            </Div>
                        </Div>

                        {/* Action Buttons */}
                        <Div row justifyContent="space-between">
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={{ flex: 1, marginRight: 8 }}
                                onPress={() => Linking.openURL(`${place.locationlink}`)}
                            >
                                <Div
                                    bg={theme === 'light' ? '#3B82F6' : '#1D4ED8'}
                                    rounded={12}
                                    py={14}
                                    row
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <MaterialIcons name="directions" size={18} color="white" />
                                    <Text
                                        fontSize={14}
                                        fontWeight="600"
                                        color="white"
                                        ml={8}
                                        fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                                    >
                                        {t('directions')}
                                    </Text>
                                </Div>
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={{ flex: 1, marginLeft: 8 }}
                                onPress={() => navigation.navigate('PlaceDetails', { place })}
                            >
                                <Div
                                    bg="transparent"
                                    borderWidth={2}
                                    borderColor={theme === 'light' ? '#E5E7EB' : '#4B5563'}
                                    rounded={12}
                                    py={12}
                                    row
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <MaterialIcons
                                        name="info-outline"
                                        size={18}
                                        color={theme === 'light' ? '#6B7280' : '#9CA3AF'}
                                    />
                                    <Text
                                        fontSize={14}
                                        fontWeight="600"
                                        color={theme === 'light' ? '#6B7280' : '#9CA3AF'}
                                        ml={8}
                                        fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                                    >
                                        {t('details')}
                                    </Text>
                                </Div>
                            </TouchableOpacity>
                        </Div>
                    </Div>
                </Div>

             
            </Div>
        </Animated.View>
    );
}