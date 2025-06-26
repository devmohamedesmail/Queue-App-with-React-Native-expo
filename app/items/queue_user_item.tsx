import React, { useState, useContext } from 'react'
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next'
import axios from 'axios';
import { Toast } from 'toastify-react-native';
import Custom_Modal from '../custom/custom_modal';
import CustomText from '../custom/CustomText';
import colors from '../config/colors';

import { Div, Button, Icon, Text } from 'react-native-magnus';
import CustomActivityIndicator from '../custom/CustomActivityIndicator';
import { api } from '../config/api';

export default function Queue_User_Item({ queue, fetch_today_queues_for_user }: any) {
    const [queueModalVisible, setQueueModalVisible] = useState(false);
    const [existModalVisible, setExistModalVisible] = useState(false);
    const { theme } = useTheme()
    const { t, i18n } = useTranslation()
    const [queueId, setQueueId] = useState(null)
    const [loading, setLoading] = useState(false)
    // const { info } = useContext(InfoContext)

    // ************************************ Move queue Start function ******************************
    const queueToggleModal = () => {
        setQueueModalVisible(!queueModalVisible);
    };
    // ************************************ Move queue End function ******************************





    // ************************************ Exit queue Start function ******************************
    const exitToggleModal = () => {
        setExistModalVisible(!existModalVisible);
    };
    // ************************************ Exit queue End function ******************************



    // ************************************ Cancel queue Start function ******************************

    const cancel_queue = async (queueId: any) => {
        try {

            setLoading(true)
            const response = await axios.get(`${api.url}api/v1/queues/cancel/queue/${queueId}`)
            const data = response.status
            if (data === 200) {
                setExistModalVisible(false)
                Toast.show({
                    type: 'success',
                    text1: t('queue-cancel-success'),
                    visibilityTime: 3000,
                    position: 'bottom',
                })
                setQueueId(null)
                setLoading(false)



            }
            fetch_today_queues_for_user()
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: t('queue-cancel-error'),
                visibilityTime: 3000,
                position: 'top',
            })
            setLoading(false)
            setExistModalVisible(false)
            setQueueId(null)

            console.log(error)
        } finally {
            setLoading(false)
            setExistModalVisible(false)
            setQueueId(null)
        }
    }

    // ****************************** Cancel queue End function *************************************


    // move queue function 
    const move_queue = async (queueId) => {
        try {

            setLoading(true)
            const response = await axios.get(`${api.url}api/v1/queues/move/queue/${queueId}`)
            const data = response.status
            if (data === 200) {
                setQueueModalVisible(false)
                Toast.show({
                    type: 'success',
                    text1: t('queue-move-success'),
                    visibilityTime: 3000,
                    position: 'top',
                })
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: t('queue-move-error'),
                visibilityTime: 3000,
                position: 'top',
            })
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }










    return (
        <Div borderColor={theme === 'light' ? colors.lightTheme.light : colors.darkTheme.dark} borderWidth={1} bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.voilet} m='auto' rounded={24} mx={10} my={16}>
            {/* Place Info */}
            <Div flexDir='column' alignItems='center' mt={28} px={8}>
                <Icon name="bank" fontFamily="MaterialCommunityIcons" color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} fontSize={32} mb={8} />
                <CustomText
                    fontSize={17}
                    fontWeight="bold"
                    textAlign="center"
                    content={i18n.language === "ar" ? queue.queue.place.nameAr : queue.queue.place.nameEn}
                />
                <CustomText
                    color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.white}
                    fontSize={12}
                    textAlign="center"
                    content={i18n.language === "ar" ? queue.queue.place.addressAr : queue.queue.place.addressEn}
                />
            </Div>

            {/* Queue Status */}
            <Div
                bg={theme === 'light' ? colors.lightTheme.light : colors.darkTheme.dark}
                mt={24}
                py={22}
                rounded={22}
                mx={10}
                alignItems="center"

            >
                {/* Head of Queue */}
                <Div flexDir="row" alignItems="center" mb={10}>
                    <Icon
                        name="users"
                        fontFamily="Feather"
                        color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                        fontSize={22}
                        mr={8}
                    />
                    <CustomText fontSize={18} fontWeight="bold" content={t('head-of-queue')} />
                </Div>
                <Div
                    bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                    px={18}
                    py={8}
                    rounded={16}
                    mb={14}
                    shadow="xs"
                    flexDir='row'
                    alignItems='center'
                    justifyContent='center'
                >

                    <Text
                        fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                        fontSize={18}
                        fontWeight="bold"
                        textAlign="center"
                        color={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.white}
                    >{queue.aheadOfYou > 1 ? queue.aheadOfYou : t('your-turn-now')}</Text>
                </Div>

                {/* Numbers Row */}
                <Div
                    flexDir="row"
                    justifyContent="center"
                    alignItems="center"
                    w="100%"
                    mb={10}
                >
                    <Div flex={1} alignItems="center" borderRightWidth={1} borderRightColor={theme === 'light' ? 'gray300' : 'gray700'}>
                        <CustomText fontSize={15} fontWeight="bold" content={t('your-number')} />

                        <Div
                            mt={6}
                            bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                            px={16}
                            py={6}
                            rounded={12}
                            shadow="xs"
                        >

                            <Text
                                fontSize={17}
                                fontWeight="bold" color={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.white}>{queue.queue.queue}</Text>
                        </Div>
                    </Div>
                    <Div flex={1} alignItems="center">
                        <CustomText fontSize={15} fontWeight="bold" content={t('now-serving')} />
                        <Div
                            mt={6}
                            bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                            px={16}
                            py={6}
                            rounded={12}
                            shadow="xs"
                        >

                            <Text
                                color={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.white}
                                fontSize={17}
                                fontWeight="bold"

                            >{queue.nowServingQueue ? queue.nowServingQueue : t('---')}</Text>
                        </Div>
                    </Div>
                </Div>

                {/* Estimate Time */}
                <Div flexDir="row" alignItems="center" mt={6}>
                    <Icon
                        name="clock"
                        fontFamily="Feather"
                        color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                        fontSize={18}
                        mr={6}
                    />
                    <CustomText fontWeight="bold" content={t('estimate-time')} />
                    <CustomText
                        ml={8}
                        color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                        fontWeight="bold"
                        content={queue.estimatedTime === 0 ? t('no-time-to-wait') : queue.estimatedTime}
                    />
                </Div>
            </Div>

            {/* Action Buttons */}
            <Div flexDir='column' justifyContent='space-evenly' alignItems='center' w="100%" my={16} px={5}>
                <Button
                    mb={10}
                    block
                    h={55}
                    bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                    color={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.white}
                    rounded={16}
                    shadow="md"
                    prefix={<Icon name="redo" fontFamily="MaterialIcons" color={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.white} fontSize={20} />}
                    onPress={() => {
                        setQueueId(queue.queue._id);
                        setQueueModalVisible(true);
                    }}
                >
                    {t('moveQueue')}
                </Button>
                <Button
                    block
                    h={55}
                    bg="red600"
                    color={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.white}
                    rounded={16}
                    shadow="md"
                    prefix={<Icon name="exit-to-app" fontFamily="MaterialIcons" color={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.white} fontSize={20} />}
                    onPress={() => {
                        setQueueId(queue.queue._id);
                        setExistModalVisible(true);
                    }}
                >
                    {t('exitQueue')}
                </Button>
            </Div>

            {/* Move Queue Modal */}
            <Custom_Modal
                isVisible={queueModalVisible}
                onPressClose={() => setQueueModalVisible(false)}
                onClose={() => setQueueModalVisible(false)}
            >
                <Div alignItems="center" px={10} py={10}>
                    <Div
                        bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                        rounded="circle"
                        w={60}
                        h={60}
                        alignItems="center"
                        justifyContent="center"
                        mb={18}
                        shadow="md"
                    >
                        <Icon
                            name="redo"
                            fontFamily="MaterialIcons"
                            color={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.white}
                            fontSize={32}
                        />
                    </Div>
                    <CustomText
                        content={t('move-alert')}
                        textAlign="center"
                        mb={24}
                        fontSize={17}
                        fontWeight="bold"
                        color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}
                    />
                    {loading ? (
                        <CustomActivityIndicator />
                    ) : (
                        <Div w="100%" flexDir="row" justifyContent="space-between" mt={8}>
                            <Button
                                flex={1}
                                mr={8}
                                h={50}
                                bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                                color={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.white}
                                rounded={14}
                                shadow="md"
                                prefix={
                                    <Icon
                                        name="check-circle"
                                        fontFamily="Feather"
                                        color={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.white}
                                        fontSize={20}
                                        mr={4}
                                    />
                                }
                                onPress={() => move_queue(queueId)}
                            >
                                {t('ok')}
                            </Button>
                            <Button
                                flex={1}
                                ml={8}
                                h={50}
                                bg="red600"
                                color={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.white}
                                rounded={14}
                                shadow="md"
                                prefix={
                                    <Icon
                                        name="x-circle"
                                        fontFamily="Feather"
                                        color={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.white}
                                        fontSize={20}
                                        mr={4}
                                    />
                                }
                                onPress={() => setQueueModalVisible(false)}
                            >
                                {t('close')}
                            </Button>
                        </Div>
                    )}
                </Div>
            </Custom_Modal>

            {/* Exit Queue Modal */}
            <Custom_Modal
                isVisible={existModalVisible}
                onPressClose={() => setExistModalVisible(false)}
                onClose={() => setExistModalVisible(false)}
            >
                <Div alignItems="center" px={10} py={10}>
                    <Div
                        bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                        rounded="circle"
                        w={60}
                        h={60}
                        alignItems="center"
                        justifyContent="center"
                        mb={18}
                        shadow="md"
                    >
                        <Icon
                            name="error-outline"
                            fontFamily="MaterialIcons"
                            color={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.white}
                            fontSize={32}
                        />
                    </Div>
                    <CustomText
                        content={t('exist-alert')}
                        textAlign="center"
                        mb={24}
                        fontSize={17}
                        fontWeight="bold"
                        color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}
                    />
                    {loading ? (
                        <CustomActivityIndicator />
                    ) : (
                        <Div w="100%" flexDir="row" justifyContent="space-between" mt={8}>
                            <Button
                                flex={1}
                                mr={8}
                                h={50}
                                bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                                color={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.white}
                                rounded={14}
                                shadow="md"
                                prefix={
                                    <Icon
                                        name="check-circle"
                                        fontFamily="Feather"
                                        color={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.white}
                                        fontSize={20}
                                        mr={4}
                                    />
                                }
                                onPress={() => cancel_queue(queueId)}
                            >
                                {t('ok')}
                            </Button>
                            <Button
                                flex={1}
                                ml={8}
                                h={50}
                                bg="red600"
                                color={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.white}
                                rounded={14}
                                shadow="md"
                                prefix={
                                    <Icon
                                        name="x-circle"
                                        fontFamily="Feather"
                                        color={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.white}
                                        fontSize={20}
                                        mr={4}
                                    />
                                }
                                onPress={() => setExistModalVisible(false)}
                            >
                                {t('close')}
                            </Button>
                        </Div>
                    )}
                </Div>
            </Custom_Modal>
        </Div>
    )
}
