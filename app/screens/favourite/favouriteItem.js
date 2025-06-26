import React from 'react';
import { Text, Div } from 'react-native-magnus';
import { Swipeable } from 'react-native-gesture-handler';
import { useTheme } from '../../context/ThemeContext';
import colors from '../../config/colors';
import { useTranslation } from 'react-i18next';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
 // adjust path as needed
import { Pressable } from 'react-native';
import { remove_From_wishlist } from '../../redux/reducers/wishlistSlice';

export default function FavouriteItem({ item }) {
    const { theme } = useTheme();
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    remove_From_wishlist

    const renderRightActions = () => (
        <Pressable
        
            onPress={() => dispatch(remove_From_wishlist(item.id))}
            style={{
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
                width: 80,
                height: '100%',
            }}
        >
            <Ionicons name="trash" size={24} color="white" />
        </Pressable>
    );

    return (
        <Swipeable renderRightActions={renderRightActions}>
            <Div
                flexDir='row'
                w="98%"
                m="auto"
                my={5}
                py={30}
                bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.dark}
                rounded="md"
                borderColor='gray300'
                overflow='hidden'
                pr={10}
                borderWidth={theme === 'light' ? 1 : 0}
            >
                <Div flexDir='column' justifyContent="center" flex={1} px={10}>
                    <Text
                        fontWeight='bold'
                        fontSize={17}
                        mx={10}
                        color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary}
                    >
                        {i18n.language === 'ar' ? item.name_ar : item.name_en}
                    </Text>

                    <Div flexDir='row' alignItems='center' mt={5}>
                        <Ionicons name="location-outline" size={14}
                            color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary} />
                        <Text
                            color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}
                            numberOfLines={3} pr={20} ellipsizeMode='tail' fontSize={10} ml={5}>
                            {i18n.language === 'ar' ? item.address_ar : item.address_en}
                        </Text>
                    </Div>
                </Div>
            </Div>
        </Swipeable>
    );
}
