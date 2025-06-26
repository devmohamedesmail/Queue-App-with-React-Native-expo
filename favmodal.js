import React, { useCallback } from 'react'
import { Modal, Text, Div, Button, Image } from 'react-native-magnus';
import { useTranslation } from 'react-i18next';
import colors from '../../config/colors';
import { useDispatch, useSelector } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import { remove_From_wishlist } from '../../redux/reducers/wishlistSlice';
import { useTheme } from '../../context/ThemeContext';
import ModalCloseBtn from '../ModalCloseBtn';

import Custom_favourite_item from '../../custom/Custom_favourite_item';
import Custom_delete_swipe_btn from '../../custom/Custom_delete_swipe_btn';


import { View, StyleSheet } from 'react-native';
import CustomText from '../../custom/CustomText';
import { getLimitedWords } from '../../utils/getLimitedWords';
const FavouriteComponent = ({ favouriteModalVisible, setFavouriteModalVisible }) => {
    const { t, i18n } = useTranslation();
    const { theme } = useTheme();
    const favourites = useSelector(state => state.wishlist.items);
    const dispatch = useDispatch();

    const handle_delete = (id) => {
        dispatch(remove_From_wishlist({ id }))
    }



    return (
        <Modal
            isVisible={favouriteModalVisible}
            bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background}>

            <ModalCloseBtn onPress={() => setFavouriteModalVisible(false)} />



            <Div h="100%" position='relative' pb={100}>

                <Div mt={80} >

                    <CustomText content={t('favourite')} textAlign='center' fontWeight='bold' fontSize={20} />

                    <SwipeListView
                        data={favourites}
                        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                        renderItem={(data) => (
                            <Div 
                              bg={theme === 'light' ? colors.lightTheme.light : colors.darkTheme.dark}
                              flexDir='row' 
                              alignItems='center' 
                              justifyContent='flex-start' 
                              p={10} mb={10} borderRadius={10}>
                                <Image
                                    w={70}
                                    h={70}
                                    borderRadius={10}
                                    mr={10}
                                    resizeMode='cover'
                                    source={{ uri: data.item.image }}

                                />

                                <Div>
                                    <Text
                                      fontSize={15}
                                      fontWeight='bold'
                                      fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                                      color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}

                                    >
                                        {getLimitedWords(i18n.language === 'en' ? data.item.name_en : data.item.name_ar, 7)}
                                        
                                       
                                        </Text>
                                    <Text
                                        fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                                        color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white} 
                                        fontSize={10} 
                                        mt={5}>
                                            {getLimitedWords(i18n.language === 'en' ? data.item.address_en : data.item.address_ar, 7)}
                                            
                                    </Text>
                                </Div>
                            </Div>
                        )}
                        renderHiddenItem={({ item }) => (
                            <View style={styles.rowBack}>
                                <Text style={styles.backTextWhite}>
                                    <Custom_delete_swipe_btn onPress={() => handle_delete(item.id)} />
                                </Text>
                                <Text style={styles.backTextWhite}>
                                    <Custom_delete_swipe_btn onPress={() => handle_delete(item.id)} />
                                </Text>
                            </View>
                        )}
                        leftOpenValue={75}
                        rightOpenValue={-75}
                    />








                </Div>
            </Div>
        </Modal>
    )
}








const styles = StyleSheet.create({
    rowFront: {
        backgroundColor: '#FFF',
        borderBottomColor: '#EEE',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 80,
        paddingLeft: 15,
        marginBottom: 5,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
    },
    backTextWhite: {
        color: '#000',
    },
});








export default FavouriteComponent