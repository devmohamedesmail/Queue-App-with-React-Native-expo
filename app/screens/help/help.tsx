import { SafeAreaView } from 'react-native'
import React, { useContext, useState } from 'react'
import { Div, Text } from 'react-native-magnus'
import { useTheme } from '../../context/ThemeContext';
import colors from '../../config/colors';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Toast } from 'toastify-react-native'
import { useNavigation } from '@react-navigation/native';
import { api } from '../../config/api';
import Creative_Header from '../../components/creative_header';
import Custom_Input from '../../custom/custom_input';
import Custom_Button from '../../custom/custom_button';
import LoaderSpinner from '../../components/loader_spinner';



const Help = () => {
    const { theme } = useTheme();
    const { t, i18n } = useTranslation()
    const [topic, setTopic] = useState('')
    const [message, setMessage] = useState('')
    const { auth } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation<any>()


    const send_help = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`${api.url}api/v1/send/help`, {
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
                visibilityTime: 3000,
                

            })

        } finally {
            setLoading(false)
        }
    }





    return (
       
            <Div bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.black} h="100%">
              <Creative_Header title={t('help')} />

                <Div px={10} mt={80} position='relative'>

                    <Custom_Input placeholder={t('topic')} value={topic} onChange={(text) => setTopic(text)} />

                    <Custom_Input 
                        multiline
                        numberOfLines={5}
                        placeholder={t('message')} value={message} onChange={(text) => setMessage(text)} />

                   
                   
                

                    <Div>
                        {loading ? (
                            <LoaderSpinner />
                        ) : (   
                            <Custom_Button onPress={send_help} title={t('send')} w='100%' bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />
                        )}

                    </Div>



                </Div>
                <Div w={"100%"} bottom={50} px={10} position='absolute'>
                  <Custom_Button
                    mb={10}
                    title={t('inbox')}
                    w="100%"
                    // icon={<Feather name="inbox" size={22} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />}
                    onPress={() => navigation.navigate('Inbox')}
                  />
                  <Custom_Button
                    title={t('home')}
                    w="100%"
                    bg={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.dark}
                    color={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.white}
                    // icon={<Feather name="home" size={22} color={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.white} />}
                    onPress={() => navigation.navigate('Home')}
                  />
                </Div>
            </Div>
       
    )
}

export default Help