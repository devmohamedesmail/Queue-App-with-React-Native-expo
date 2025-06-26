import React, { useState } from 'react';
import { Modal, Text, Div, Button, Image } from 'react-native-magnus';
import { useTranslation } from 'react-i18next';
import colors from '../../config/colors';
import { useDispatch, useSelector } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import { remove_From_wishlist } from '../../redux/reducers/wishlistSlice';
import { useTheme } from '../../context/ThemeContext';
import ModalCloseBtn from '../ModalCloseBtn';
import { View, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';
import { getLimitedWords } from '../../utils/getLimitedWords';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Favourite_Empty from '../favourite_empty';
import Favourite_Item from '../../items/favourite_item';

const Favourite_Modal = ({ favouriteModalVisible, setFavouriteModalVisible }) => {
    const { t, i18n } = useTranslation();
    const { theme } = useTheme();
    const favourites = useSelector((state:any) => state.wishlist.items);
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [isSelectionMode, setIsSelectionMode] = useState(false);

   

    const handleBulkDelete = () => {
        Alert.alert(
            t('remove_selected'),
            `${t('remove')} ${selectedItems.length} ${t('items')}?`,
            [
                {
                    text: t('cancel'),
                    style: 'cancel',
                },
                {
                    text: t('remove'),
                    style: 'destructive',
                    onPress: () => {
                        selectedItems.forEach(id => {
                            dispatch(remove_From_wishlist({ id }));
                        });
                        setSelectedItems([]);
                        setIsSelectionMode(false);
                    }
                }
            ]
        );
    };

    const toggleSelection = (id:any) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    const filteredFavourites = favourites.filter(item => {
        const name = i18n.language === 'en' ? item.name_en : item.name_ar;
        return name.toLowerCase().includes(searchQuery.toLowerCase());
    });

   

    return (
        <Modal
             p={10}
            isVisible={favouriteModalVisible}
            bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background}
        >
            <ModalCloseBtn onPress={() => setFavouriteModalVisible(false)} />

            <Div h="100%" pt={60} pb={20}>
                {/* Header */}
                <Div px={20} mb={20}>
                    <Div row alignItems="center" justifyContent="space-between" mb={16}>
                        <Div row alignItems="center">
                            <Div
                                h={40}
                                w={40}
                                bg={theme === 'light' ? '#FEF2F2' : '#7F1D1D'}
                                rounded="circle"
                                justifyContent="center"
                                alignItems="center"
                                mr={12}
                            >
                                <AntDesign
                                    name="heart"
                                    size={20}
                                    color="#EF4444"
                                />
                            </Div>
                            <Text
                                fontSize={22}
                                fontWeight="bold"
                                color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}
                                fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                            >
                                {t('favourite')}
                            </Text>
                        </Div>

                        {favourites.length > 0 && (
                            <Div
                                bg={theme === 'light' ? '#F3F4F6' : '#374151'}
                                rounded={20}
                                px={12}
                                py={6}
                            >
                                <Text
                                    fontSize={12}
                                    fontWeight="600"
                                    color={theme === 'light' ? '#4B5563' : '#D1D5DB'}
                                    fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                                >
                                    {favourites.length} {t('items')}
                                </Text>
                            </Div>
                        )}
                    </Div>

                    {/* Selection mode header */}
                    {isSelectionMode && (
                        <Div
                            row
                            alignItems="center"
                            justifyContent="space-between"
                            bg={theme === 'light' ? '#EFF6FF' : '#1E3A8A'}
                            rounded={12}
                            p={12}
                            mb={16}
                        >
                            <Text
                                fontSize={14}
                                fontWeight="600"
                                color={theme === 'light' ? '#1D4ED8' : '#93C5FD'}
                                fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                            >
                                {selectedItems.length} {t('selected')}
                            </Text>
                            <Div row>
                                <TouchableOpacity
                                    onPress={() => {
                                        setIsSelectionMode(false);
                                        setSelectedItems([]);
                                    }}
                                    style={{ marginRight: 12 }}
                                >
                                    <Text
                                        fontSize={14}
                                        color={theme === 'light' ? '#6B7280' : '#9CA3AF'}
                                        fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                                    >
                                        {t('cancel')}
                                    </Text>
                                </TouchableOpacity>
                                {selectedItems.length > 0 && (
                                    <TouchableOpacity onPress={handleBulkDelete}>
                                        <Text
                                            fontSize={14}
                                            color="#EF4444"
                                            fontWeight="600"
                                            fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                                        >
                                            {t('delete')}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </Div>
                        </Div>
                    )}
                </Div>

                {/* Content */}
                <Div flex={1} px={20}>
                    {filteredFavourites.length > 0 ? (
                        <SwipeListView
                            data={filteredFavourites}
                            keyExtractor={(item:any, index:any) => item.id?.toString() || index.toString()}
                            renderItem={(data) => <Favourite_Item data={data} selectedItems={selectedItems} isSelectionMode={isSelectionMode} toggleSelection={toggleSelection} setIsSelectionMode={setIsSelectionMode} setSelectedItems={setSelectedItems}  />}
                            renderHiddenItem={({ item }) => (
                                // <View style={[
                                //     styles.rowBack,
                                //     {
                                //         backgroundColor: theme === 'light' ? '#FEE2E2' : '#7F1D1D',
                                //         borderRadius: 16,
                                //         marginBottom: 12,
                                //     }
                                // ]}>
                                //     <TouchableOpacity
                                //         style={styles.deleteButton}
                                //         onPress={() => handle_delete(item.id)}
                                //     >
                                //         <MaterialIcons name="delete" size={24} color="#EF4444" />
                                //         <Text style={styles.deleteText}>{t('delete')}</Text>
                                //     </TouchableOpacity>
                                //     <TouchableOpacity
                                //         style={styles.deleteButton}
                                //         onPress={() => handle_delete(item.id)}
                                //     >
                                //         <MaterialIcons name="delete" size={24} color="#EF4444" />
                                //         <Text style={styles.deleteText}>{t('delete')}</Text>
                                //     </TouchableOpacity>
                                // </View>
                                <></>
                            )}
                            leftOpenValue={100}
                            rightOpenValue={-100}
                            showsVerticalScrollIndicator={false}
                        />
                    ) : (
                       
                        <Favourite_Empty />
                    )}
                </Div>

                {/* Footer actions */}
                {favourites.length > 0 && !isSelectionMode && (
                    <Div px={20} pt={16}>
                        <Button
                            bg="transparent"
                            borderWidth={1}
                            borderColor={theme === 'light' ? '#E5E7EB' : '#4B5563'}
                            color={theme === 'light' ? '#6B7280' : '#9CA3AF'}
                            rounded={12}
                            py={14}
                            onPress={() => setIsSelectionMode(true)}
                        >
                            <Div row alignItems="center">
                                <MaterialIcons
                                    name="checklist"
                                    size={20}
                                    color={theme === 'light' ? '#6B7280' : '#9CA3AF'}
                                />
                                <Text
                                    fontSize={14}
                                    fontWeight="600"
                                    color={theme === 'light' ? '#6B7280' : '#9CA3AF'}
                                    fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                                    ml={8}
                                >
                                    {t('select_multiple')}
                                </Text>
                            </Div>
                        </Button>
                    </Div>
                )}
            </Div>
        </Modal>
    );
};

const styles = StyleSheet.create({
    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    deleteButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: '100%',
    },
    deleteText: {
        color: '#EF4444',
        fontSize: 12,
        fontWeight: '600',
        marginTop: 4,
    },
});

export default Favourite_Modal;