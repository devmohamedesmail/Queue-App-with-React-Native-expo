import React, { useState } from 'react'
import { Dropdown, Button, Text, Div, Input, Icon, ScrollDiv } from "react-native-magnus";
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from '../config/colors';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import Custom_Icon_Btn from '../custom/custom_icon_btn';
import Place_Item_Search from '../items/place_item_search';

export default function Search_Component({ places }) {
    const dropdownRef = React.createRef<any>();
    const { theme } = useTheme();
    const { t, i18n } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    

    // Function to filter places based on the search query
    const filteredPlaces = places.filter((place:any) => {
        const name = i18n.language === 'ar' ? place.nameAr : place.nameEn;
        return name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <>
            <Custom_Icon_Btn
                icon={<AntDesign name="search1" size={24} color={theme === 'light' ? colors.lightTheme.black : colors.lightTheme.white} />}
                onPress={() => dropdownRef.current.open()}

            />

            <Dropdown
                ref={dropdownRef}
                bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.background}
                mt="md"
                pb="2xl"
                h="90%"
                showSwipeIndicator={true}
                roundedTop="xl">
                <Dropdown.Option value={searchQuery} py="md" px="xl" block bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.background}>
                    <Div
                        flexDir="row"
                        alignItems="center"
                        bg={theme === 'light' ? '#F3F4F6' : '#23243a'}
                        borderWidth={1}
                        borderColor={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                        rounded={10}
                        px={16}
                        py={6}
                        mb={8}
                        shadow="sm"
                        shadowColor={theme === 'light' ? '#00000010' : '#00000030'}
                    >
                        <AntDesign name="search1" size={22} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} style={{ marginRight: 10 }} />
                        <Input
                            flex={1}
                           
                            fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                            placeholder={t('search')}
                            placeholderTextColor={theme === 'light' ? '#9CA3AF' : '#6B7280'}
                            bg="transparent"
                            borderWidth={0}
                            color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light}
                            fontSize={16}
                            p={0}
                            pt={15}
                            // h={48}
                            w="100%"
                            onChangeText={(text) => setSearchQuery(text)}
                            value={searchQuery}
                            focusBorderColor={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                        />
                    </Div>
                </Dropdown.Option>

                <Div >
                    <ScrollDiv>
                        {filteredPlaces.length > 0 ? (
                            filteredPlaces.map((place:any, index:any) => (
                                <Place_Item_Search place={place} key={index} />
                            ))
                        ) : (
                            <Text color="gray900">{t('noResults')}</Text>
                        )}
                    </ScrollDiv>
                </Div>





            </Dropdown>

        </>
    )
}
