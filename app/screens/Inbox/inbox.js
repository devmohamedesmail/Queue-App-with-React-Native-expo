import { SafeAreaView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Div, Text, Icon } from 'react-native-magnus'
import { useTheme } from '../../context/ThemeContext';
import colors from '../../config/colors';
import { useTranslation } from 'react-i18next';
import InboxItem from './inboxitem';
import axios from 'axios';
import { InfoContext } from '../../context/InfoContext';
import { AuthContext } from '../../context/AuthContext';
import { Collapse } from "react-native-magnus";
import CloseBtn from '../../components/CloseBtn';
import CustomText from '../../custom/CustomText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Inbox = () => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const [helpMessages, setHelpmessages] = useState([]);
  const { info } = useContext(InfoContext)
  const { auth } = useContext(AuthContext)


  const fetch_help_replies = async () => {
    try {
      const response = await axios.get(`${info.appUrl}/api/v1//show/help/replies/${auth.user.user._id}`)
      setHelpmessages(response.data.help)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch_help_replies()
  }, [])

  return (
    <SafeAreaView>
      <Div bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.black} h="100%">
        <CloseBtn />
        <Div px={10} mt={20}>


          <CustomText content={t('inbox')} textAlign='center' fontWeight='bold' fontSize={20} />





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
            <CustomText content={t('inbox-empty')} textAlign='center' mt={100} />
          )}





        </Div>
      </Div>
    </SafeAreaView>
  )
}

export default Inbox