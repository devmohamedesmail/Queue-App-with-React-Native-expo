import React, { useContext, useEffect, useState } from 'react'

import { Div, Text } from 'react-native-magnus'
import HistoryItem from './historyitem'
import { SafeAreaView, ScrollView } from 'react-native'
import colors from '../../config/colors'
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import CloseBtn from '../../components/CloseBtn'
import { InfoContext } from '../../context/InfoContext'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

export default function HistotyLog() {

  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const [history, setHistory] = useState([]);
  const { info } = useContext(InfoContext);
  const { auth, setAuth, login, register, logout } = useContext(AuthContext)





  const fetch_user_history = async () => {
    try {
      const response = await axios.get(`${info.appUrl}/api/v1/queues/user/queues/history/${auth?.user?.user?._id}`)
      setHistory(response.data)
    } catch (error) {
      console.log("Error in history log Screen", error)
    }
  }


  useEffect(() => {
    fetch_user_history()
  }, [])




  return (
    <SafeAreaView>


      <Div bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.black} h="100%">
        <CloseBtn />

        <Text
          mt={10}
          mb={20}
          color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary}
          textAlign='center'
          fontWeight='bold'
          fontSize={20}>
          {t('history')}
        </Text>


        <ScrollView>
          {history.length > 0 ? (
            history.map((item) => (
              <HistoryItem
                key={item._id}
                item={item}
              />
            ))
          ) : (
            <Text
              color={theme === 'light' ? colors.lightTheme.gray : colors.darkTheme.primary}
              fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
              textAlign="center"
              mt={20}
            >
              {t('noHistoryFound')}
            </Text>
          )}

        </ScrollView>
      </Div>
    </SafeAreaView>
  )
}
