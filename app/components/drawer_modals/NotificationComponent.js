import React, { useState } from 'react'
import { Button, Text, Div, Modal, Icon } from 'react-native-magnus'

import colors from '../../config/colors';
import ModalCloseBtn from '../ModalCloseBtn';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
export default function NotificationComponent({ notificationsModalVisible, setNotificationsModalVisible }) {
const {theme}=useTheme();
const{t,i18n}=useTranslation();
  return (

    <Modal isVisible={notificationsModalVisible} bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background}>
      <ModalCloseBtn onPress={() => setNotificationsModalVisible(false)} />
        <Div mt={80}>
          <Text 
            fontWeight='bold'
            fontSize={20}
            textAlign='center' 
            color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}
            fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
            >{t('notifications')}</Text>
        </Div>




       <ScrollView>
        
       </ScrollView>



    </Modal>
  )
}
