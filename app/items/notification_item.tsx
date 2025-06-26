import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Div, Text } from 'react-native-magnus'
import { AntDesign } from '@expo/vector-icons'
import colors from '../config/colors'
import { useTheme } from '../context/ThemeContext'
import { useTranslation } from 'react-i18next'
export default function Notification_Item({notification, markAsRead, deleteNotification}:any) {
  const { theme } = useTheme()
  const { t,i18n } = useTranslation()
  
    return (
    <TouchableOpacity
      onPress={() => markAsRead(notification.id)}
      activeOpacity={0.7}
    >
      <Div
        bg={theme === 'light' ? 'white' : colors.darkTheme.surface}
        rounded={12}
        mb={12}
        p={16}
        shadow="sm"
        borderWidth={notification.isRead ? 0 : 2}
        borderColor={notification.isRead ? 'transparent' : (theme === 'light' ? '#E5E7EB' : '#374151')}
        position="relative"
      >
        {/* Unread indicator */}
        {!notification.isRead && (
          <Div
            position="absolute"
            top={12}
            right={12}
            h={8}
            w={8}
            bg="#EF4444"
            rounded="circle"
          />
        )}

        <Div row alignItems="flex-start">
          {/* Icon */}
          <Div
            h={44}
            w={44}
            bg={`${notification.iconColor}20`}
            rounded="circle"
            justifyContent="center"
            alignItems="center"
            mr={12}
          >
            <AntDesign
              name={notification.icon}
              size={20}
              color={notification.iconColor}
            />
          </Div>

          {/* Content */}
          <Div flex={1}>
            <Div row alignItems="center" justifyContent="space-between" mb={4}>
              <Text
                fontSize={16}
                fontWeight={notification.isRead ? '500' : 'bold'}
                color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}
                fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                flex={1}
                mr={8}
              >
                {notification.title}
              </Text>
            </Div>

            <Text
              fontSize={14}
              color={theme === 'light' ? '#6B7280' : '#9CA3AF'}
              fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
              lineHeight={20}
              mb={8}
            >
              {notification.message}
            </Text>

            <Div row alignItems="center" justifyContent="space-between">
              <Text
                fontSize={12}
                color={theme === 'light' ? '#9CA3AF' : '#6B7280'}
                fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
              >
                {notification.time}
              </Text>

              {/* Action buttons */}
              <Div row alignItems="center">
                {!notification.isRead && (
                  <TouchableOpacity
                    onPress={() => markAsRead(notification.id)}
                    activeOpacity={0.7}
                  >
                    <Div
                      bg={theme === 'light' ? '#F3F4F6' : '#374151'}
                      rounded={6}
                      px={8}
                      py={4}
                      mr={8}
                    >
                      <Text
                        fontSize={10}
                        color={theme === 'light' ? '#4B5563' : '#D1D5DB'}
                        fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                      >
                        Mark as read
                      </Text>
                    </Div>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  onPress={() => deleteNotification(notification.id)}
                  activeOpacity={0.7}
                >
                  <AntDesign
                    name="delete"
                    size={16}
                    color={theme === 'light' ? '#9CA3AF' : '#6B7280'}
                  />
                </TouchableOpacity>
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
    </TouchableOpacity>
  )
}
