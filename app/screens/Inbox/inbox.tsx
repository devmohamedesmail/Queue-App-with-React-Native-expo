
import React, { useContext, useEffect, useState } from 'react'
import { Div, Text} from 'react-native-magnus'
import { useTheme } from '../../context/ThemeContext';
import colors from '../../config/colors';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { InfoContext } from '../../context/InfoContext';
import { AuthContext } from '../../context/AuthContext';
import { Collapse } from "react-native-magnus";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { api } from '../../config/api';
import Creative_Header from '../../components/creative_header';
import Empty_Inbox from '../../components/empty_inbox';

const Inbox = () => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const [helpMessages, setHelpmessages] = useState([]);
  const { auth } = useContext(AuthContext)


  const fetch_help_replies = async () => {
    try {
      const response = await axios.get(`${api.url}api/v1//show/help/replies/${auth.user.user._id}`)
      setHelpmessages(response.data.help)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch_help_replies()
  }, [])

  return (
    
      <Div bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.black} h="100%">
        <Creative_Header title={t('inbox')} />
        <Div px={10} mt={20}>


          





          {helpMessages.length > 0 ? (
            helpMessages.map((msg, index) => (
              <Collapse key={index}>
                <Collapse.Header
                  bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                  color={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.white}
                  fontSize="md"
                  p="xl"
                  px={5}
                  prefix={<MaterialIcons name="support-agent" size={24} color="black" />}
                >
                  {msg.topic}
                </Collapse.Header>
                <Collapse.Body bg="gray100" py={10} h={100}  >
                  <Text color="black">
                    {msg.reply ? msg.reply : t('no-reply')}
                  </Text>
                </Collapse.Body>
              </Collapse>
            ))
          ) : (
          
            <Empty_Inbox />
          )}





        </Div>
      </Div>
    
  )
}

export default Inbox