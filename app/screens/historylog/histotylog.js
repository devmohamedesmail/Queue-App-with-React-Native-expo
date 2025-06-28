import React, { useContext, useEffect, useState } from 'react'

import { Div, Text } from 'react-native-magnus'
import {  ScrollView } from 'react-native'
import colors from '../../config/colors'
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import Creative_Header from '../../components/creative_header'
import History_Item from '../../items/history_item'
import { api } from '../../config/api'
import Empty_Histoty from '../../components/empty_histoty'

export default function HistotyLog() {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const [history, setHistory] = useState([]);
  const { auth } = useContext(AuthContext)





  const fetch_user_history = async () => {
    try {
      const response = await axios.get(`${api.url}api/v1/queues/user/queues/history/${auth?.user?.user?._id}`)
      setHistory(response.data)
    } catch (error) {
      console.log("Error in history log Screen", error)
    }
  }


  useEffect(() => {
    fetch_user_history()
  }, [])




  return (



    <Div bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.black} h="100%">

      <Creative_Header title={t('history')} />

      <Div pt={50}>
        <ScrollView>
          {history.length > 0 ? (
            history.map((item) => (
              <History_Item key={item._id} item={item} />
            ))
          ) : (
           
            <Empty_Histoty />
          )}

        </ScrollView>
      </Div>


    </Div>

  )
}
