import React, { useContext, useState } from 'react'
import { Drawer, Button, Div, Text, ScrollDiv, Modal, Icon } from 'react-native-magnus'
import Octicons from '@expo/vector-icons/Octicons';
import CustomDrawerBoxIcon from '../custom/CustomDrawerBoxIcon';
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomDrawerItem from '../custom/CustomDrawerItem';
import colors from '../config/colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { I18nManager } from 'react-native';
import { useTheme } from '../context/ThemeContext';




import AccountComponent from './drawer_modals/AccountComponent';
import FavouriteComponent from './drawer_modals/favourite_modal';
import HistoryComponent from './drawer_modals/HistoryComponent';
import MyQueueComponent from './drawer_modals/MyQueueComponent';
import SettingComponent from './drawer_modals/SettingComponent';
import NotificationComponent from './drawer_modals/notifications_modal';
import { AuthContext } from '../context/AuthContext';
import { Dimensions, Platform } from 'react-native';





export default function DrawerComponent() {
    const drawerRef = React.createRef();
    const { t, i18n } = useTranslation()
    const navigation = useNavigation();
    const [accountModalVisible, setAccountModalVisible] = useState(false);
    const [favouriteModalVisible, setFavouriteModalVisible] = useState(false)
    const [historyModalVisible, setHistoryModalVisible] = useState(false)
    const [queueModalVisible, setQueueModalVisible] = useState(false)
    const [settingModalVisible, setSettingModalVisible] = useState(false)
    const [notificationsModalVisible, setNotificationsModalVisible] = useState(false)
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
        < >


            {/* <CustomIconBtn
                icon={<Octicons name="three-bars" size={24} color={theme === 'light' ? colors.lightTheme.black : colors.lightTheme.white} />}
                onPress={() => drawerRef.current?.open()}
            /> */}

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
                            <CustomDrawerBoxIcon
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
                                }} />
                            <CustomDrawerBoxIcon
                                icon={<AntDesign name="hearto" size={24} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />}
                                title={t('favourite')}
                                onPress={() => setFavouriteModalVisible(true)} />
                            <CustomDrawerBoxIcon
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
                                }} />
                            <CustomDrawerBoxIcon
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
                                }} />

                        </Div>
                        {/* ************************************** Boxes section End ************************************** */}

                        {/* <Div px={10} mt={20}>
                        <Button
                            w="100%"
                            h={50}
                            rounded="lg"
                            bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                            fontWeight='bold'
                            fontFamily={i18n.language === 'en' ? 'poppins-bold' : 'cairo'}
                            onPress={() => setNotificationsModalVisible(true)}
                        >
                            <Div flexDir='row'>
                                <AntDesign name="bells" size={20} color="white" />
                                <Text mx={5} color='white' fontWeight='bold'>{t('notifications')}</Text>
                            </Div>

                        </Button>
                        <Div flexDir='row' borderWidth={2} borderColor='white' justifyContent='center' position="absolute" right={30} bg={theme === 'light' ? colors.lightTheme.secondary : colors.darkTheme.primary} w={30} h={30} rounded="circle" top={-18}>
                            <Text color='white' >3</Text>
                        </Div>

                    </Div> */}




                        {/* ************************************** Items section start ************************************** */}
                        <Div flexDir='row' flexWrap='wrap' justifyContent='space-evenly' mt={50} gap={5}>


                            <CustomDrawerItem
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

                            <CustomDrawerItem
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


                            {/* <CustomDrawerItem
                            title={t('business')}
                            icon={<MaterialIcons name="business-center" size={20}
                                color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />}
                        /> */}

                            <CustomDrawerItem
                                title={t('setting')}
                                icon={<AntDesign name="setting" size={24} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />}
                                onPress={() => setSettingModalVisible(true)}
                            />
                            <CustomDrawerItem
                                title={i18n.language === "ar" ? 'English' : ' عربي '}
                                icon={<MaterialIcons name="language" size={20} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />}
                                onPress={toggleLanguage} />


                        </Div>
                        {/* ************************************** Items section End ************************************** */}




                        {/* ************************************** How To use section Start ************************************** */}
                        {/* <Div px={10} position='absolute' bottom={50} right={0} left={0}>
                        <CustomButton bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} title={t('how-to-use')} w="98%" />
                    </Div> */}
                        {/* ************************************** How To use section End ************************************** */}




                    </Div>
                </ScrollDiv>




                <AccountComponent 
                    drawerRef={drawerRef}
                    accountModalVisible={accountModalVisible} setAccountModalVisible={setAccountModalVisible} />
                <FavouriteComponent favouriteModalVisible={favouriteModalVisible} setFavouriteModalVisible={setFavouriteModalVisible} />
                <HistoryComponent historyModalVisible={historyModalVisible} setHistoryModalVisible={setHistoryModalVisible} />
                <MyQueueComponent queueModalVisible={queueModalVisible} setQueueModalVisible={setQueueModalVisible} />
                <SettingComponent settingModalVisible={settingModalVisible} setSettingModalVisible={setSettingModalVisible} />
                <NotificationComponent notificationsModalVisible={notificationsModalVisible} setNotificationsModalVisible={setNotificationsModalVisible} />

            </Drawer>











        </>

    )
}
