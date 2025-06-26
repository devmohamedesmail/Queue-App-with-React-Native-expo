import React, { useEffect, useState } from 'react'
import { Text, Div, Toggle, Modal } from 'react-native-magnus'
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import colors from '../../config/colors'
import ModalCloseBtn from '../ModalCloseBtn'

const SettingComponent = ({ settingModalVisible, setSettingModalVisible }) => {
    const { theme, toggleTheme } = useTheme();
    const { t, i18n } = useTranslation();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [privateAccount, setPrivateAccount] = useState(false);
    const [language, setLanguage] = useState(i18n.language);

    const handleLanguageSwitch = () => {
        const newLang = language === 'en' ? 'ar' : 'en';
        setLanguage(newLang);
        i18n.changeLanguage(newLang);
    };

    return (
        <Modal
            isVisible={settingModalVisible}
            bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={300}
            animationOutTiming={300}
            backdropOpacity={0.5}
            p="xl"
        >
            <ModalCloseBtn onPress={() => setSettingModalVisible(false)} />
            <Div h="100%" w="100%" position="absolute" top={0} left={0} zIndex={999} pointerEvents="box-none">
                <Div mt={80}>
                    <Text
                        color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary}
                        fontWeight='bold'
                        fontSize={20}
                        textAlign='center'
                        mb={20}
                        fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                    >{t('setting')}
                    </Text>
                    <Div px={10}>
                        {/* Theme Switch */}
                        <Div
                            flexDir='row'
                            alignItems='center'
                            justifyContent='space-between'
                            mb={18}
                            bg={theme === 'light' ? '#F3F4F6' : '#23243a'}
                            px={18}
                            py={10}
                            rounded={14}
                            shadow="sm"
                            shadowColor={theme === 'light' ? '#00000010' : '#00000030'}
                        >
                            <Div flexDir="row" alignItems="center">
                                <Div
                                    bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                                    rounded="circle"
                                    h={32}
                                    w={32}
                                    alignItems="center"
                                    justifyContent="center"
                                    mr={12}
                                >
                                    {/* Theme icon */}
                                    <Text fontSize={18} color="#fff">
                                        {theme === 'light' ? '🌞' : '🌙'}
                                    </Text>
                                </Div>
                                <Text
                                    fontWeight='bold'
                                    color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}
                                    fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                                    fontSize={15}
                                >
                                    {theme === 'light' ? t('change_to_dark') : t('change_to_light')}
                                </Text>
                            </Div>
                            <Toggle
                                on={theme === 'dark'}
                                onPress={toggleTheme}
                                bg="gray200"
                                circleBg={colors.lightTheme.primary}
                                activeBg={colors.lightTheme.primary}
                                h={30}
                                w={60}
                            />
                        </Div>
                        {/* Notifications Toggle */}
                        <Div
                            flexDir='row'
                            alignItems='center'
                            justifyContent='space-between'
                            mb={18}
                            bg={theme === 'light' ? '#F3F4F6' : '#23243a'}
                            px={18}
                            py={10}
                            rounded={14}
                            shadow="sm"
                            shadowColor={theme === 'light' ? '#00000010' : '#00000030'}
                        >
                            <Div flexDir="row" alignItems="center">
                                <Div
                                    bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                                    rounded="circle"
                                    h={32}
                                    w={32}
                                    alignItems="center"
                                    justifyContent="center"
                                    mr={12}
                                >
                                    <Text fontSize={18} color="#fff">
                                        {notificationsEnabled ? '🔔' : '🔕'}
                                    </Text>
                                </Div>
                                <Text
                                    fontWeight='bold'
                                    color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}
                                    fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                                    fontSize={15}
                                >
                                    {t('notifications')}
                                </Text>
                            </Div>
                            <Toggle
                                on={notificationsEnabled}
                                onPress={() => setNotificationsEnabled((v) => !v)}
                                bg="gray200"
                                circleBg={colors.lightTheme.primary}
                                activeBg={colors.lightTheme.primary}
                                h={30}
                                w={60}
                            />
                        </Div>
                        {/* Language Switch */}
                        <Div
                            flexDir='row'
                            alignItems='center'
                            justifyContent='space-between'
                            mb={18}
                            bg={theme === 'light' ? '#F3F4F6' : '#23243a'}
                            px={18}
                            py={10}
                            rounded={14}
                            shadow="sm"
                            shadowColor={theme === 'light' ? '#00000010' : '#00000030'}
                        >
                            <Div flexDir="row" alignItems="center">
                                <Div
                                    bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                                    rounded="circle"
                                    h={32}
                                    w={32}
                                    alignItems="center"
                                    justifyContent="center"
                                    mr={12}
                                >
                                    <Text fontSize={18} color="#fff">
                                        {language === 'ar' ? '🇸🇦' : '🇺🇸'}
                                    </Text>
                                </Div>
                                <Text
                                    fontWeight='bold'
                                    color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}
                                    fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                                    fontSize={15}
                                >
                                    {t('language')}: {language === 'en' ? 'English' : 'العربية'}
                                </Text>
                            </Div>
                            <Toggle
                                on={language === 'ar'}
                                onPress={handleLanguageSwitch}
                                bg="gray200"
                                circleBg={colors.lightTheme.primary}
                                activeBg={colors.lightTheme.primary}
                                h={30}
                                w={60}
                            />
                        </Div>
                        {/* Account Privacy */}
                        <Div
                            flexDir='row'
                            alignItems='center'
                            justifyContent='space-between'
                            mb={18}
                            bg={theme === 'light' ? '#F3F4F6' : '#23243a'}
                            px={18}
                            py={10}
                            rounded={14}
                            shadow="sm"
                            shadowColor={theme === 'light' ? '#00000010' : '#00000030'}
                        >
                            <Div flexDir="row" alignItems="center">
                                <Div
                                    bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                                    rounded="circle"
                                    h={32}
                                    w={32}
                                    alignItems="center"
                                    justifyContent="center"
                                    mr={12}
                                >
                                    <Text fontSize={18} color="#fff">
                                        {privateAccount ? '🔒' : '🔓'}
                                    </Text>
                                </Div>
                                <Text
                                    fontWeight='bold'
                                    color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}
                                    fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                                    fontSize={15}
                                >
                                    {t('private_account')}
                                </Text>
                            </Div>
                            <Toggle
                                on={privateAccount}
                                onPress={() => setPrivateAccount((v) => !v)}
                                bg="gray200"
                                circleBg={colors.lightTheme.primary}
                                activeBg={colors.lightTheme.primary}
                                h={30}
                                w={60}
                            />
                        </Div>
                    </Div>
                </Div>
            </Div>
        </Modal>
    )
}

export default SettingComponent