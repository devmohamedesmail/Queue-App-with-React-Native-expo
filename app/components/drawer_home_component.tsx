import React, { useContext, useState } from 'react'
import { Drawer, Button, Div, Text, ScrollDiv, Modal, Icon } from 'react-native-magnus'
import Octicons from '@expo/vector-icons/Octicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from '../config/colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { I18nManager } from 'react-native';
import { useTheme } from '../context/ThemeContext';


import CustomButton from '../custom/CustomButton';

import AccountComponent from './drawer_modals/account_modal';
import FavouriteComponent from './drawer_modals/favourite_modal';
import History_Modal from './drawer_modals/history_modal';
import MyQueueComponent from './drawer_modals/queues_modal';
import SettingComponent from './drawer_modals/SettingComponent';
import Notification_Modal from './drawer_modals/notifications_modal';
import { AuthContext } from '../context/AuthContext';
import { Dimensions, Platform } from 'react-native';
import Custom_Icon_Btn from '../custom/custom_icon_btn';
import Drawer_Item_Box from '../custom/drawer_item_box';
import Notification_Btn from './notification_btn';
import Drawer_Item_Button from '../custom/drawer_item_button';






export default function Drawer_Home_Component() {
    const drawerRef = React.createRef<any>();
    const { t, i18n } = useTranslation()
    const navigation = useNavigation<any>();
    const [accountModalVisible, setAccountModalVisible] = useState(false);
    const [favouriteModalVisible, setFavouriteModalVisible] = useState(false)
    const [historyModalVisible, setHistoryModalVisible] = useState(false)
    const [queueModalVisible, setQueueModalVisible] = useState(false)
    const [settingModalVisible, setSettingModalVisible] = useState(false)
    const [notificationsModalVisible, setNotificationsModalVisible] = useState(false)
    const [notifications_modal_visible, set_notifications_modal_visible] = useState(false)
    const { theme } = useTheme()
    const { auth } = useContext(AuthContext)



    const [visible, setVisible] = useState(false);

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang)
            .then(() => {
                I18nManager.forceRTL(newLang === 'ar');

            })
            .catch(err => console.error('Failed to change language', err));
    };


    const screenHeight = Dimensions.get('window').height;
    const isSmallDevice = screenHeight < 750;
    return (
        <>
            <Custom_Icon_Btn
                icon={<Octicons name="three-bars" size={24} color={theme === 'light' ? colors.lightTheme.black : colors.lightTheme.white} />}
                onPress={() => drawerRef.current?.open()}

            />


            <Drawer
                backdropColor='rgba(178, 172, 172, 0.5)'
                h={'100%'}
                ref={drawerRef}
                direction={i18n.language === 'ar' ? 'left' : 'right'}
                bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background}
                animationTime={700}
                drawerPercentage={90}

            >
                <ScrollDiv

                    contentContainerStyle={{
                        paddingTop: isSmallDevice ? 2 : 10,
                        paddingBottom: 50,
                    }}>
                    <Div
                        flex={1}
                    // pt={'10%'} 
                    >



                        {/* ************************************** Boxes section start ************************************** */}
                        <Div flexDir='row' flexWrap='wrap' justifyContent='space-evenly' mt={30} px={5}>

                            <Drawer_Item_Box
                                icon={<AntDesign name="user" size={27} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />}
                                title={t('account')}
                                onPress={() => {
                                    if (auth !== null) {
                                        setAccountModalVisible(true)
                                    } else {

                                        drawerRef.current?.close();
                                        setTimeout(() => {
                                            navigation.navigate("Login")
                                        }, 300);
                                    }
                                }}

                            />


                            <Drawer_Item_Box
                                icon={<AntDesign name="hearto" size={24} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />}
                                title={t('favourite')}
                                onPress={() => setFavouriteModalVisible(true)}

                            />




                            <Drawer_Item_Box
                                icon={<MaterialIcons name="history-toggle-off" size={24} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />}
                                title={t('history')}
                                onPress={() => {
                                    if (auth !== null) {
                                        setHistoryModalVisible(true)
                                    } else {
                                        drawerRef.current?.close();
                                        setTimeout(() => {
                                            navigation.navigate("Login")
                                        }, 300);
                                    }
                                }}

                            />



                            <Drawer_Item_Box
                                icon={<MaterialCommunityIcons name="human-queue" size={24} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />}
                                title={t('my-queue')}
                                onPress={() => {
                                    if (auth !== null) {
                                        setQueueModalVisible(true)
                                    } else {
                                        drawerRef.current?.close();
                                        setTimeout(() => {
                                            navigation.navigate("Login")
                                        }, 300);
                                    }
                                }}

                            />



                        </Div>
                        {/* ************************************** Boxes section End ************************************** */}


                        <Div mt={30}>
                            {/* <Notification_Btn onPress={() => navigation.navigate("Notifications")} /> */}
                            <Notification_Btn onPress={() => {
                                setNotificationsModalVisible(true);
                            }
                            } />
                        </Div>



                        {/* ************************************** Items section start ************************************** */}
                        <Div flexDir='row' flexWrap='wrap' justifyContent='space-evenly' mt={30} >

                            <Drawer_Item_Button
                                onPress={() => {

                                    if (auth !== null) {
                                        navigation.navigate('Help');
                                    } else {
                                        drawerRef.current?.close();
                                        setTimeout(() => {
                                            navigation.navigate("Login")
                                        }, 300);
                                    }
                                }}
                                title={t('help')}
                                icon={<Entypo name="help" size={20} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />}

                            />


                            <Drawer_Item_Button
                                onPress={() => {

                                    if (auth !== null) {
                                        navigation.navigate('Inbox');
                                    } else {
                                        drawerRef.current?.close();
                                        setTimeout(() => {
                                            navigation.navigate("Login")
                                        }, 300);
                                    }

                                }}
                                title={t('inbox')}
                                icon={<AntDesign name="message1" size={20} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />}
                            />



                            <Drawer_Item_Button
                                title={t('setting')}
                                icon={<AntDesign name="setting" size={24} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />}
                                onPress={() => setSettingModalVisible(true)}
                            />



                            <Drawer_Item_Button
                                title={i18n.language === "ar" ? 'English' : ' عربي '}
                                icon={<MaterialIcons name="language" size={20} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />}
                                onPress={toggleLanguage}
                            />






                        </Div>
                        
                    </Div>
                </ScrollDiv>




                <AccountComponent
                    drawerRef={drawerRef}
                    accountModalVisible={accountModalVisible} setAccountModalVisible={setAccountModalVisible} />
                <FavouriteComponent favouriteModalVisible={favouriteModalVisible} setFavouriteModalVisible={setFavouriteModalVisible} />
                <History_Modal historyModalVisible={historyModalVisible} setHistoryModalVisible={setHistoryModalVisible} />
                <MyQueueComponent queueModalVisible={queueModalVisible} setQueueModalVisible={setQueueModalVisible} />
                <SettingComponent settingModalVisible={settingModalVisible} setSettingModalVisible={setSettingModalVisible} />
                <Notification_Modal notificationsModalVisible={notificationsModalVisible} setNotificationsModalVisible={setNotificationsModalVisible} />



            

            </Drawer>
        </>
    )
}
