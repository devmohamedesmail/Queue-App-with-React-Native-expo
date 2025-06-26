import { Div, Text} from 'react-native-magnus'
import colors from '../../../config/colors'
import React from 'react'
import { useTheme } from '../../../context/ThemeContext'
import { useTranslation } from 'react-i18next'


const QueueDetails = ({waitingQueues,loading,book_new_queue}) => {

  const {theme}=useTheme();
  const {t,i18n}=useTranslation()



  return (
    <>
      <Div bg={theme === 'light' ? colors.lightTheme.light : colors.darkTheme.dark} py={20} my={60} w="100%" m="auto" rounded={10}>


        <Div flexDir='column' justifyContent='center' alignItems='center'>
          <Text 
            fontWeight='bold' 
            fontSize={20} 
            color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
            fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
            >{t('clients-in-queue')}
          </Text>

          {waitingQueues && waitingQueues.length > 0 ? 
           <Text my={10} fontWeight='bold' fontSize={18} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}>{waitingQueues.length}</Text>
          :
          <Text my={10} fontWeight='bold' fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}  fontSize={13} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}>{t('no-clients')}</Text>
          }
         
        </Div>



        <Div w="100%" h={2} bg='white'></Div>



        <Div flexDir='row' justifyContent='space-between' alignItems='center' pt={20} px={20}>
          <Text 
            fontWeight='bold'
            fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'} 
            fontSize={16} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}>
              {t('estimate-time')}
            </Text>

          <Text 
          fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
          fontWeight='bold' fontSize={20} color={theme === 'light' ? colors.lightTheme.primary : colors.lightTheme.white}>
              {`${Math.floor((waitingQueues ? waitingQueues.length : 0) * 15 / 60)}:${((waitingQueues ? waitingQueues.length : 0) * 15) % 60} H`}
          </Text>
        </Div>
      </Div>


     
    </>
  )
}

export default QueueDetails