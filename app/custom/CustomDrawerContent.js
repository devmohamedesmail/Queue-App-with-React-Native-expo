import React, { useState } from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useTranslation } from 'react-i18next';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTheme, ThemeProvider } from '../context/ThemeContext';
import colors from '../config/colors';
import { Div, Button, Text } from 'react-native-magnus';
import CustomDrawerBoxIcon from './CustomDrawerBoxIcon';
import CustomDrawerItem from './CustomDrawerItem';
import CustomButton from './CustomButton';
import AccountComponent from '../components/drawer_modals/AccountComponent';
import FavouriteComponent from '../components/drawer_modals/FavouriteComponent';
import HistoryComponent from '../components/drawer_modals/HistoryComponent';
import MyQueueComponent from '../components/drawer_modals/MyQueueComponent';
import SettingComponent from '../components/drawer_modals/SettingComponent';
import NotificationComponent from '../components/drawer_modals/NotificationComponent';

export default function CustomDrawerContent(props) {
    const { t, i18n } = useTranslation();

    const { theme } = useTheme();
    const [accountModalVisible, setAccountModalVisible] = useState(false);
    const [favouriteModalVisible, setFavouriteModalVisible] = useState(false)
    const [historyModalVisible, setHistoryModalVisible] = useState(false)
    const [queueModalVisible, setQueueModalVisible] = useState(false)
    const [settingModalVisible, setSettingModalVisible] = useState(false)
    const [notificationsModalVisible, setNotificationsModalVisible] = useState(false)

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang)
            .then(() => {
                I18nManager.forceRTL(newLang === 'ar');

            })
            .catch(err => console.error('Failed to change language', err));
    };

    return (
        <DrawerContentScrollView  {...props} contentContainerStyle={{ flex: 1, backgroundColor: theme === 'light' ? colors.lightTheme.white : colors.lightTheme.black }}>

            <Div position='relative' h="100%">



                <Div flexDir='row' flexWrap='wrap' justifyContent='space-evenly' mt={50} px={5}>
                    <CustomDrawerBoxIcon icon={<AntDesign name="user" size={27} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />} title={t('account')} onPress={() => setAccountModalVisible(true)} />
                    <CustomDrawerBoxIcon icon={<AntDesign name="hearto" size={24} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />} title={t('favourite')} onPress={() => setFavouriteModalVisible(true)} />
                    <CustomDrawerBoxIcon icon={<MaterialIcons name="history-toggle-off" size={24} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />} title={t('history')} onPress={() => setHistoryModalVisible(true)} />
                    <CustomDrawerBoxIcon icon={<MaterialCommunityIcons name="human-queue" size={24} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />} title={t('my-queue')} onPress={() => setQueueModalVisible(true)} />

                </Div>







                <Div px={10} mt={20}>
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
                            <AntDesign name="bells" size={20} color="black" />
                            <Text mx={5} color='white' fontWeight='bold'>{t('notifications')}</Text>
                        </Div>

                    </Button>
                    <Div flexDir='row' borderWidth={2} borderColor='white' justifyContent='center' position="absolute" right={30} bg={theme === 'light' ? colors.lightTheme.secondary : colors.darkTheme.primary} w={30} h={30} rounded="circle" top={-18}>
                        <Text color='white' >3</Text>
                    </Div>

                </Div>




                {/* ************************************** Items section start ************************************** */}
                <Div flexDir='row' flexWrap='wrap' justifyContent='space-evenly' mt={50} gap={5}>
                    <CustomDrawerItem title={t('home')} icon={<AntDesign name="home" size={20} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />} onPress={() => navigation.navigate('Home')} />
                    <CustomDrawerItem title={t('business')} icon={<MaterialIcons name="business-center" size={20} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />} />
                    <CustomDrawerItem
                        onPress={() => navigation.navigate('Help')}
                        title={t('help')}
                        icon={<Entypo name="help" size={20} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />} />
                    <CustomDrawerItem
                        onPress={() => navigation.navigate('Inbox')}
                        title={t('inbox')}
                        icon={<AntDesign name="message1" size={20} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />} />
                    <CustomDrawerItem title={t('setting')} icon={<AntDesign name="setting" size={24} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />} onPress={() => setSettingModalVisible(true)} />
                    <CustomDrawerItem title={i18n.language === "ar" ? 'English' : ' عربي '} icon={<MaterialIcons name="language" size={20} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />} onPress={toggleLanguage} />
                </Div>
                {/* ************************************** Items section End ************************************** */}




                {/* ************************************** How To use section Start ************************************** */}
                <Div px={10} position='absolute' bottom={20} right={0} left={0}>
                    <CustomButton bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} title={t('how-to-use')} w="98%" />
                </Div>
                {/* ************************************** How To use section End ************************************** */}









            </Div>








            <AccountComponent accountModalVisible={accountModalVisible} setAccountModalVisible={setAccountModalVisible} />
            <FavouriteComponent favouriteModalVisible={favouriteModalVisible} setFavouriteModalVisible={setFavouriteModalVisible} />
            <HistoryComponent historyModalVisible={historyModalVisible} setHistoryModalVisible={setHistoryModalVisible} />
            <MyQueueComponent queueModalVisible={queueModalVisible} setQueueModalVisible={setQueueModalVisible} />
            <SettingComponent settingModalVisible={settingModalVisible} setSettingModalVisible={setSettingModalVisible} />
            <NotificationComponent notificationsModalVisible={notificationsModalVisible} setNotificationsModalVisible={setNotificationsModalVisible} />








        </DrawerContentScrollView>
    );
}
