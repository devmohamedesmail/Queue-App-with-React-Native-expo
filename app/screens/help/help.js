import { SafeAreaView } from 'react-native'
import React, { useContext, useState } from 'react'
import { Div, Text } from 'react-native-magnus'
import { useTheme } from '../../context/ThemeContext';
import colors from '../../config/colors';
import CustomInput from '../../custom/CustomInput';
import { useTranslation } from 'react-i18next';
import CustomButton from '../../custom/CustomButton';
import axios from 'axios';
import { InfoContext } from '../../context/InfoContext';
import { AuthContext } from '../../context/AuthContext';
import { Toast } from 'toastify-react-native'
import CustomActivityIndicator from '../../custom/CustomActivityIndicator';
import CustomText from '../../custom/CustomText';
import CloseBtn from '../../components/CloseBtn';
import { useNavigation } from '@react-navigation/native';


const Help = () => {
    const { theme } = useTheme();
    const { t, i18n } = useTranslation()
    const [topic, setTopic] = useState('')
    const [message, setMessage] = useState('')
    const { info } = useContext(InfoContext)
    const { auth } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()


    const send_help = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`${info.appUrl}/api/v1/send/help`, {
                userId: auth.user.user._id,
                topic,
                message
            })
            if (response.status === 200) {
                setLoading(false)

                Toast.show({
                    type: 'success',
                    text1: t('help-send-success'),
                    position: 'top',
                    duration: 1000

                })
                setTopic('')
                setMessage('')

                setTimeout(() => {
                    navigation.navigate('Inbox')
                }, 1000)

            }

        } catch (error) {
            Toast.show({
                type: 'error',
                text1: t('send-error'),
                position: 'top',
                duration: 1000

            })

        } finally {
            setLoading(false)
        }
    }





    return (
        <SafeAreaView>
            <Div bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.black} h="100%">
                <CloseBtn />

                <Div px={10} mt={20} position='relative'>

                    <CustomText content={t('send-help')} textAlign='center' fontWeight='bold' fontSize={15} my={15} />
                    <CustomInput placeholder={t('topic')} value={topic} onChange={(text) => setTopic(text)} />
                    <CustomInput
                        multiline
                        numberOfLines={5}
                        placeholder={t('message')} value={message} onChange={(text) => setMessage(text)} />

                    <Div>
                        {loading ? (
                            <CustomActivityIndicator />
                        ) : (
                            <CustomButton onPress={send_help} title={t('send')} w='100%' bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />
                        )}

                    </Div>



                </Div>
                <Div w={"100%"} bottom={50} px={10} position='absolute'>
                    <CustomButton mb={10} title={t('inbox')} w="100%" onPress={() => navigation.navigate('Inbox')} />
                    <CustomButton title={t('home')} w="100%" bg={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.dark} onPress={() => navigation.navigate('Home')} />

                </Div>
            </Div>
        </SafeAreaView>
    )
}

export default Help