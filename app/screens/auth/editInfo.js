import { SafeAreaView } from 'react-native'
import React, { useContext, useState } from 'react'
import { Div, Text } from 'react-native-magnus'
import { useTheme } from '../../context/ThemeContext'
import colors from '../../config/colors'
import CustomInput from '../../custom/CustomInput'
import { AuthContext } from '../../context/AuthContext'
import CustomButton from '../../custom/CustomButton'
import { useTranslation } from 'react-i18next'
import { InfoContext } from '../../context/InfoContext'
import { Toast } from 'toastify-react-native'
import CustomActivityIndicator from '../../custom/CustomActivityIndicator'
import axios from 'axios'
import CloseBtn from '../../components/CloseBtn'
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditInfo = () => {
  const { theme } = useTheme()
  const { auth, setAuth, login, register, logout } = useContext(AuthContext)
  const { t } = useTranslation()
  const { info } = useContext(InfoContext)
  const [name, setName] = useState(auth?.user?.user?.name || '');
  const [email, setEmail] = useState(auth?.user?.user?.email || '');
  const [phone, setPhone] = useState(auth?.user?.user?.phone || '');
  const [address, setAddress] = useState(auth?.user?.user?.address || '');
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);




  const update_user_info = async () => {
    try {

      setLoading(true);
      const response = await axios.post(`${info.appUrl}/api/v1/auth/edit/user/${auth.user.user._id}`, {
        name: name,
        email: email,
        password: password,
        phone: phone,
        address: address
      })
      if (response.status === 200 || response.status === 'success') {



        const updatedUser = {
          ...auth,
          user: {
            ...auth.user,
            user: {
              ...auth.user.user,
              name: name,
              email: email,
              phone: phone,
              address: address
            }
          }
        };

        Toast.show({
          type: 'success',
          text1: t('your-info-updated-successfully'),
          visibilityTime: 3000,
          position: 'top',
        })


        setAuth(updatedUser);
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.log(error)
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: t('error-in-updating-info'),
        text2: t('try-again'),
        visibilityTime: 3000,
        position: 'top',
        autoHide: true,
      })
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView>
      <Div bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background} h="100%">
        <CloseBtn />

        <Div px={20} py={30} h={'70%'}  >
          <Text textAlign='center' fontWeight='bold' mb={30} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary}>{t('update-your-information')}</Text>
          <CustomInput placeholder={t('name')} value={name} onChange={(text) => setName(text)} />
          <CustomInput placeholder={t('email')} value={email} onChange={(text) => setEmail(text)} />
          <CustomInput placeholder={t('phone')} value={phone} onChange={(text) => setPhone(text)} />
          <CustomInput placeholder={t('address')} value={address} onChange={(text) => setAddress(text)} />


        </Div>
        <Div px={10} w={'100%'}>

          {loading ? <CustomActivityIndicator /> : <CustomButton w={'100%'} title={t('update')} onPress={update_user_info} />}
        </Div>

      </Div>
    </SafeAreaView>
  )
}

export default EditInfo