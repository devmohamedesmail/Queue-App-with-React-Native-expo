import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import React, { useContext, useState } from 'react'
import { Modal, Div, Text, Button } from 'react-native-magnus';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import colors from '../../config/colors';
import { useTheme } from '../../context/ThemeContext';
import CustomButton from '../../custom/CustomButton';
import { AuthContext } from '../../context/AuthContext';
import ModalCloseBtn from '../ModalCloseBtn';
import CustomAccountButton from '../../custom/CustomAccountButton';
import { Alert } from 'react-native';
import { api } from '../../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'toastify-react-native'

import axios from 'axios';
import CustomActivityIndicator from '../../custom/CustomActivityIndicator';


const AccountComponent = ({ accountModalVisible, setAccountModalVisible, drawerRef }) => {
    const { theme } = useTheme();
    const { t, i18n } = useTranslation();
    const { auth, setAuth, login, register, logout } = useContext(AuthContext);
    const navigation = useNavigation();
    const [loadingDelete, setLoadingDelete] = useState(false);










    const handleDeleteAccount = async () => {

        Alert.alert(
            t('delete-account'),
            t('delete-account-confirm'),
            [
                {
                    text: t('cancel'),
                    style: 'cancel',
                },
                {
                    text: t('delete'),
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            setLoadingDelete(true);
                            const res = await axios.get(`${api.url}api/v1/auth/delete/user/${auth?.user?.user?._id}`);
                            if (res.data && res.data.status === 200) {

                                setAuth(null);
                                await AsyncStorage.removeItem('user');
                                
                                Alert.alert(
                                    t('delete-success'),
                                    '', // You can add a message here if needed
                                    [
                                        {
                                            text: 'OK',
                                            onPress: () => 
                                                
                                                {
                                                    setAccountModalVisible(false);
                                                    drawerRef?.current?.close();
                                                    setTimeout(() => {
                                                        navigation.navigate('Home')
                                                    },1000)
                                                    
                                                }
                                                
                                        },
                                    ]
                                );


                            } else {
                                Alert.alert(t('delete-error'), t('delete-error-message'));
                            }
                            setLoadingDelete(false);
                        } catch (error) {
                            Alert.alert(t('delete-error'), t('delete-error-message'));
                            setLoadingDelete(false);
                            console.log('Error in deleting account', error);
                        } finally {
                            setLoadingDelete(false);
                        }
                    },
                },
            ]
        );
    };






    return (
        <>
            <Modal
                onBackdropPress={() => setAccountModalVisible(false)}
                h="100%"
                w="100%"
                isVisible={accountModalVisible}
                bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background}
            >

                <ModalCloseBtn onPress={() => setAccountModalVisible(false)} />
                <Div h="100%" position='relative'>

                    <Div mt={100}>
                        <Text
                            color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary}
                            fontWeight='bold'
                            fontSize={20}
                            textAlign='center'
                            mb={20}
                            fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}>

                            {t('account')}

                        </Text>





                        <CustomAccountButton
                            icon={<FontAwesome name="edit" size={24} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />}
                            title={t('update-your-information')}
                            onPress={() => {
                                if (auth !== null) {
                                    setAccountModalVisible(false)
                                    drawerRef.current.close()
                                    setTimeout(() => {
                                        navigation.navigate('EditInfo')
                                    }, 1000)


                                } else {
                                    navigation.navigate('Login')
                                }

                            }}

                        />

                        <CustomAccountButton

                            icon={<MaterialIcons name="history" size={24} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />}
                            title={t('history')}
                            onPress={() => {
                                if (auth !== null) {
                                    setAccountModalVisible(false)
                                    drawerRef.current.close()
                                    setTimeout(() => {
                                        navigation.navigate('History')

                                    }, 1000)
                                } else {
                                    navigation.navigate('Login')
                                }
                                // auth ? navigation.navigate('History') : navigation.navigate('Login')
                            }}
                        />


                        <CustomAccountButton
                            icon={<AntDesign name="hearto" size={24} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />}
                            title={t('favourite')}
                            onPress={() => {
                                // auth ? navigation.navigate('Favourite') : navigation.navigate('Login')
                                if (auth !== null) {
                                    setAccountModalVisible(false)
                                    drawerRef.current.close()
                                    setTimeout(() => {
                                        navigation.navigate('Favourite')
                                    }, 1000)
                                } else {
                                    navigation.navigate('Login')
                                }
                            }}

                        />


                        <CustomAccountButton
                            icon={<Feather name="help-circle" size={24} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />}
                            title={t('need-help')}
                            onPress={() => {
                                // auth ? navigation.navigate('Help') : navigation.navigate('Login')
                                if (auth !== null) {
                                    setAccountModalVisible(false)
                                    navigation.navigate('Help')
                                    drawerRef.current.close()
                                    setTimeout(() => {
                                        navigation.navigate('Help')
                                    }, 1000)
                                } else {
                                    navigation.navigate('Login')
                                }
                            }}

                        />
                    </Div>



                    <Div px={10} bottom={20} position='absolute' right={0} left={0}>



                        {auth && auth.user ? (
                            <>
                                <Div mb={10}>
                                    <CustomButton
                                        onPress={() => logout()}
                                        title={t('logout')} w="100%" bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />
                                </Div>

                                <Div mb={20}>
                                    {loadingDelete ?
                                        <CustomActivityIndicator />
                                        :
                                        <CustomButton
                                            title={t('delete-account')}
                                            w="100%" bg="red600"
                                            onPress={handleDeleteAccount} />

                                    }

                                </Div>

                            </>

                        ) : (
                            <Div mb={10}>
                                <CustomButton
                                    onPress={() => navigation.navigate('Login')}
                                    title={t('login')} w="100%" bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />
                            </Div>
                        )}



                    </Div>
                </Div>






            </Modal>





        </>

    )
}

export default AccountComponent