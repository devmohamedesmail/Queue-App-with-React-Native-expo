import React, { useState } from 'react'
import { Div, Text, Button } from 'react-native-magnus'
import { useTheme } from '../../context/ThemeContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from '../../config/colors';
import { useNavigation } from '@react-navigation/native';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
}

export default function Notifications() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const navigation = useNavigation<any>();

  // Example notifications (replace with real data or Redux selector)
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: '1', title: 'Welcome!', message: 'Thank you for joining our app.' },
    { id: '2', title: 'Booking Confirmed', message: 'Your queue booking is confirmed.' },
    { id: '3', title: 'Reminder', message: 'Don’t forget your appointment tomorrow.' },
  ]);

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Div flex={1} bg={isLight ? colors.lightTheme.white : colors.darkTheme.dark}>
      {/* Header with Back Button */}
      <Div flexDir="row" alignItems="center" justifyContent="space-between" px={24} py={24}>
        <Button bg="transparent" p={0} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={26} color={isLight ? colors.lightTheme.primary : colors.darkTheme.primary} />
        </Button>
        <Text fontSize={22} fontWeight="bold" color={isLight ? colors.lightTheme.primary : colors.darkTheme.primary}>
          Notifications
        </Text>
        <Button bg="transparent" p={0}>
          <AntDesign name="bells" size={28} color={isLight ? colors.lightTheme.primary : colors.darkTheme.primary} />
        </Button>
      </Div>
      {/* Notifications List or Empty State */}
      {notifications.length === 0 ? (
        <Div flex={1} alignItems="center" justifyContent="center" px={32}>
          <Div bg={isLight ? colors.lightTheme.primary : colors.darkTheme.primary} rounded="circle" h={80} w={80} alignItems="center" justifyContent="center" mb={24}>
            <AntDesign name="notification" size={40} color="#fff" />
          </Div>
          <Text fontSize={18} fontWeight="bold" color={isLight ? colors.lightTheme.primary : colors.darkTheme.primary} mb={8}>
            No Notifications
          </Text>
          <Text fontSize={14} color={isLight ? colors.lightTheme.black : colors.darkTheme.light} textAlign="center">
            You're all caught up! When you receive notifications, they will appear here.
          </Text>
        </Div>
      ) : (
        <Div flex={1} px={18}>
          {notifications.map((item) => (
            <Div
              key={item.id}
              flexDir="row"
              alignItems="center"
              bg={isLight ? '#F3F4F6' : '#23243a'}
              rounded={14}
              p={16}
              my={8}
              shadow="sm"
              shadowColor={isLight ? '#00000010' : '#00000030'}
              justifyContent="space-between"
            >
              <Div flex={1} mr={12}>
                <Text fontWeight="bold" fontSize={15} color={isLight ? colors.lightTheme.primary : colors.darkTheme.primary} mb={4}>
                  {item.title}
                </Text>
                <Text fontSize={13} color={isLight ? colors.lightTheme.black : colors.darkTheme.light}>
                  {item.message}
                </Text>
              </Div>
              <Button
                bg={isLight ? 'red600' : 'red800'}
                h={36}
                w={36}
                rounded="circle"
                p={0}
                onPress={() => handleDelete(item.id)}
                alignItems="center"
                justifyContent="center"
              >
                <AntDesign name="delete" size={18} color="#fff" />
              </Button>
            </Div>
          ))}
        </Div>
      )}
    </Div>
  )
}
