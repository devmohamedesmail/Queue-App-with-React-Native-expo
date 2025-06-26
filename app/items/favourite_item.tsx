import React from 'react'
import { TouchableOpacity, Animated } from 'react-native';
import { Div, Text, Image } from 'react-native-magnus';
import { useTheme } from '../context/ThemeContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import { getLimitedWords } from '../utils/getLimitedWords';
import { useSelector, useDispatch } from 'react-redux';
import { remove_From_wishlist } from '../redux/reducers/wishlistSlice';
import colors from '../config/colors';
import { Alert } from 'react-native';

export default function Favourite_Item({ data, selectedItems, isSelectionMode,toggleSelection, setIsSelectionMode,setSelectedItems }:any) {
    const isSelected = selectedItems.includes(data.item.id);
    const scaleAnim = new Animated.Value(1);
    const { theme } = useTheme();
    const { t, i18n } = useTranslation();
     const dispatch = useDispatch();

    const animatePress = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.95,
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






 const handle_delete = (id:any) => {
        Alert.alert(
            t('remove_favourite'),
            t('are_you_sure_remove'),
            [
                {
                    text: t('cancel'),
                    style: 'cancel',
                },
                {
                    text: t('remove'),
                    style: 'destructive',
                    onPress: () => dispatch(remove_From_wishlist({ id }))
                }
            ]
        );
    };








    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    animatePress();
                    if (isSelectionMode) {
                        toggleSelection(data.item.id);
                    }
                }}
                onLongPress={() => {
                    if (!isSelectionMode) {
                        setIsSelectionMode(true);
                        setSelectedItems([data.item.id]);
                    }
                }}
            >
                <Div
                    bg={theme === 'light' ? 'white' : colors.darkTheme.surface}
                    flexDir='row'
                    alignItems='center'
                    justifyContent='space-between'
                    p={16}
                    mb={12}
                    rounded={16}
                    shadow="sm"
                    borderWidth={isSelected ? 2 : 0}
                    borderColor={isSelected ? '#3B82F6' : 'transparent'}
                    position="relative"
                >
                    {/* Selection indicator */}
                    {isSelectionMode && (
                        <Div
                            position="absolute"
                            top={8}
                            right={8}
                            h={24}
                            w={24}
                            bg={isSelected ? '#3B82F6' : 'transparent'}
                            borderWidth={isSelected ? 0 : 2}
                            borderColor="#E5E7EB"
                            rounded="circle"
                            justifyContent="center"
                            alignItems="center"
                            zIndex={10}
                        >
                            {isSelected && (
                                <AntDesign name="check" size={14} color="white" />
                            )}
                        </Div>
                    )}

                    <Div row alignItems="center" flex={1}>
                        {/* Image with gradient overlay */}
                        <Div position="relative" mr={16}>
                            <Image
                                w={80}
                                h={80}
                                rounded={12}
                                source={{ uri: data.item.image }}
                                resizeMode='cover'
                            />
                            <Div
                                position="absolute"
                                bottom={4}
                                right={4}
                                h={24}
                                w={24}
                                bg="rgba(239, 68, 68, 0.9)"
                                rounded="circle"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <AntDesign name="heart" size={12} color="white" />
                            </Div>
                        </Div>

                        {/* Content */}
                        <Div flex={1}>
                            <Text
                                fontSize={16}
                                fontWeight='bold'
                                fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                                color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                                mb={4}
                                numberOfLines={2}
                            >
                                {getLimitedWords(i18n.language === 'en' ? data.item.name_en : data.item.name_ar, 8)}
                            </Text>

                            <Div row alignItems="center" mb={6}>
                                <MaterialIcons
                                    name="location-on"
                                    size={14}
                                    color={theme === 'light' ? '#6B7280' : '#9CA3AF'}
                                />
                                <Text
                                    fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                                    color={theme === 'light' ? '#6B7280' : '#9CA3AF'}
                                    fontSize={12}
                                    ml={4}
                                    flex={1}
                                    numberOfLines={1}
                                >
                                    {getLimitedWords(i18n.language === 'en' ? data.item.address_en : data.item.address_ar, 8)}
                                </Text>
                            </Div>

                            {/* Rating or additional info */}
                            <Div row alignItems="center">
                                <Div row alignItems="center" mr={12}>
                                    <AntDesign name="star" size={12} color="#F59E0B" />
                                    <Text fontSize={11} color="#F59E0B" ml={2} fontWeight="600">
                                        4.5
                                    </Text>
                                </Div>
                                <Text
                                    fontSize={10}
                                    color={theme === 'light' ? '#9CA3AF' : '#6B7280'}
                                    fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                                >
                                    Added 2 days ago
                                </Text>
                            </Div>
                        </Div>
                    </Div>

                    {/* Quick action button */}
                    {!isSelectionMode && (
                        <TouchableOpacity
                            onPress={() => handle_delete(data.item.id)}
                            activeOpacity={0.7}
                            style={{ marginLeft: 8 }}
                        >
                            <Div
                                h={36}
                                w={36}
                                bg={theme === 'light' ? '#FEF2F2' : '#7F1D1D'}
                                rounded="circle"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <MaterialIcons name="delete-outline" size={18} color="#EF4444" />
                            </Div>
                        </TouchableOpacity>
                    )}
                </Div>
            </TouchableOpacity>
        </Animated.View>
    )
}
