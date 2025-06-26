import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Div, Text } from 'react-native-magnus'
import { useTheme } from '../context/ThemeContext'
import colors from '../config/colors'
import { useTranslation } from 'react-i18next'
export default function Custom_Tab_Button({ title, value, count ,onPress,selectedTab}:any) {
    const { theme } = useTheme()
    const { i18n } = useTranslation()
  return (
    <TouchableOpacity
         onPress={onPress}
         activeOpacity={0.7}
         style={{ flex: 1 }}
       >
         <Div
           bg={selectedTab === value ? (theme === 'light' ? colors.lightTheme.primary : colors.lightTheme.primary) : 'transparent'}
           rounded={8}
           py={8}
           px={12}
           mx={4}
           alignItems="center"
           position="relative"
         >
           <Text
             fontSize={14}
             fontWeight={selectedTab === value ? 'bold' : '500'}
             color={selectedTab === value ? 'white' : (theme === 'light' ? '#6B7280' : '#9CA3AF')}
             fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
           >
             {title}
           </Text>
           {count > 0 && (
             <Div
               position="absolute"
               top={-4}
               right={-4}
               h={16}
               w={16}
               bg="#EF4444"
               rounded="circle"
               justifyContent="center"
               alignItems="center"
             >
               <Text fontSize={10} color="white" fontWeight="bold">
                 {count > 9 ? '9+' : count}
               </Text>
             </Div>
           )}
         </Div>
       </TouchableOpacity>
  )
}
