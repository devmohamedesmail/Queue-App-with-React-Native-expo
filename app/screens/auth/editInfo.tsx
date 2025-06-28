
import React, { useContext, useState } from 'react'
import { Div, Text } from 'react-native-magnus'
import { useTheme } from '../../context/ThemeContext'
import colors from '../../config/colors'
import { AuthContext } from '../../context/AuthContext'
import { useTranslation } from 'react-i18next'
import { InfoContext } from '../../context/InfoContext'
import { Toast } from 'toastify-react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Creative_Header from '../../components/creative_header'
import Custom_Input from '../../custom/custom_input'
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Custom_Button from '../../custom/custom_button'
import { api } from '../../config/api'
import LoaderSpinner from '../../components/loader_spinner'
const EditInfo = () => {
  const { theme } = useTheme()
  const { auth, setAuth } = useContext(AuthContext)
  const { t } = useTranslation()
  const [name, setName] = useState(auth?.user?.user?.name || '');
  const [email, setEmail] = useState(auth?.user?.user?.email || '');
  const [phone, setPhone] = useState(auth?.user?.user?.phone || '');
  const [address, setAddress] = useState(auth?.user?.user?.address || '');
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);




  const update_user_info = async () => {
    try {

      setLoading(true);
      const response = await axios.post(`${api.url}api/v1/auth/edit/user/${auth.user.user._id}`, {
        name: name,
        email: email,
        password: password,
        phone: phone,
        address: address
      })
      if (response.status === 200) {



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

    <Div bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background} h="100%">

      <Creative_Header title={t('edit-info')} />

      <Div px={20} py={30} h={'70%'} pt={50}  >




      

        <Custom_Input
          icon={<AntDesign name="user" size={20} color="black" />}
          placeholder={t('name')}
          value={name}
          onChange={(text) => setName(text)}
        />

        <Custom_Input
          icon={<Fontisto name="email" size={20} color="black" />}
          placeholder={t('email')}
          value={email}
          onChange={(text) => setEmail(text)}
        />

        <Custom_Input
          icon={<AntDesign name="phone" size={20} color="black" />}
          placeholder={t('phone')}
          value={phone}
          onChange={(text) => setPhone(text)}
        />

        <Custom_Input
          icon={<FontAwesome5 name="address-card" size={20} color="black" />}
          placeholder={t('address')}
          value={phone}
          onChange={(text) => setAddress(text)}
        />


      </Div>
      <Div px={10} w={'100%'}>

        {loading ? <LoaderSpinner /> : 
        
        
        <Custom_Button w={'100%'} title={t('update')} onPress={update_user_info} />}
      </Div>

    </Div>

  )
}

export default EditInfo