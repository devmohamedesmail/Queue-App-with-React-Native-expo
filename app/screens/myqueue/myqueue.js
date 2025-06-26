import React from 'react'
import { Div, Text } from 'react-native-magnus'
import colors from '../../config/colors'
import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import MyQueues from './parts/MyQueues';
import CloseBtn from '../../components/CloseBtn'
import Queues_component from '../../components/Queues_component'


export default function MyQueue({route}) {
    const navigation = useNavigation();
    const { theme } = useTheme()
    const { t ,i18n} = useTranslation()
    const { queue, place } = route.params;
    return (
        <SafeAreaView>

            <Div bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.black} h="100%" >

                <CloseBtn /> 
                {/* <Text
                    textAlign='center'
                    fontWeight='bold'
                    fontSize={25}
                    mt={20}
                    fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                    color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary}>{t('my-queues')} 
                </Text> */}

              {/* <MyQueues /> */}
              <Queues_component />
            </Div>
        </SafeAreaView>
    )
}
