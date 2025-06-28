import React, { useState } from 'react';
import { Button, Text, Div, Modal, Icon } from 'react-native-magnus';
import colors from '../../config/colors';
import ModalCloseBtn from '../model_close_btn';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { ScrollView, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Notification_Item from '../../items/notification_item';
import Custom_Tab_Button from '../../custom/custom_tab_button';

export default function Notification_Modal({ notificationsModalVisible, setNotificationsModalVisible }) {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const [selectedTab, setSelectedTab] = useState('all');

  // Sample notification data - replace with your actual data
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Payment Successful',
      message: 'Your payment of $49.99 has been processed successfully',
      time: '2 minutes ago',
      isRead: false,
      icon: 'checkcircle',
      iconColor: '#10B981'
    },
    {
      id: 2,
      type: 'info',
      title: 'New Feature Available',
      message: 'Check out our new dark mode feature in settings',
      time: '1 hour ago',
      isRead: false,
      icon: 'infocirlce',
      iconColor: '#3B82F6'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Security Alert',
      message: 'We detected a new login from a different device',
      time: '3 hours ago',
      isRead: true,
      icon: 'exclamationcircle',
      iconColor: '#F59E0B'
    },
    {
      id: 4,
      type: 'message',
      title: 'Message from John',
      message: 'Hey! Are we still meeting for lunch tomorrow?',
      time: '5 hours ago',
      isRead: true,
      icon: 'message1',
      iconColor: '#8B5CF6'
    },
    {
      id: 5,
      type: 'update',
      title: 'App Update Available',
      message: 'Version 2.1.0 is now available with bug fixes and improvements',
      time: '1 day ago',
      isRead: true,
      icon: 'download',
      iconColor: '#06B6D4'
    }
  ];

  const getFilteredNotifications = () => {
    switch (selectedTab) {
      case 'unread':
        return notifications.filter(n => !n.isRead);
      case 'read':
        return notifications.filter(n => n.isRead);
      default:
        return notifications;
    }
  };

  const markAsRead = (id) => {
    // Implement mark as read functionality
    console.log('Mark as read:', id);
  };

  const deleteNotification = (id) => {
    // Implement delete functionality
    console.log('Delete notification:', id);
  };

 



  const unreadCount = notifications.filter(n => !n.isRead).length;
  const filteredNotifications = getFilteredNotifications();

  return (
    <Modal
      isVisible={notificationsModalVisible}
      bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background}
      pt={30}
      px={10}
    >
      <ModalCloseBtn onPress={() => setNotificationsModalVisible(false)} />

      {/* Header */}
      <Div mt={50} px={20} mb={20}>
        <Div row alignItems="center" justifyContent="space-between" mb={16}>
          <Div row alignItems="center">
            <Div
              h={40}
              w={40}
              bg={theme === 'light' ? '#3B82F620' : '#1D4ED820'}
              rounded="circle"
              justifyContent="center"
              alignItems="center"
              mr={12}
            >
              <AntDesign
                name="bells"
                size={20}
                color={theme === 'light' ? colors.lightTheme.primary : colors.lightTheme.primary}
              />
            </Div>
            <Text
              fontWeight="bold"
              fontSize={20}
              color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}
              fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
            >
              {t('notifications')}
            </Text>
          </Div>

          {unreadCount > 0 && (
            <Div
              bg="#EF4444"
              rounded="circle"
              px={8}
              py={4}
            >
              <Text fontSize={12} color="white" fontWeight="bold">
                {unreadCount} new
              </Text>
            </Div>
          )}
        </Div>

        {/* Tabs */}
        <Div
          row
          bg={theme === 'light' ? '#F9FAFB' : '#1F2937'}
          rounded={12}
          p={4}
        >
          <Custom_Tab_Button title="All"  value="all" count={0} onPress={() => setSelectedTab("all")} selectedTab={selectedTab} />
          <Custom_Tab_Button title="Unread"  value="unread" count={unreadCount} onPress={() => setSelectedTab('unread')} selectedTab={selectedTab} />
          <Custom_Tab_Button title="Read"  value="read" count={0} onPress={() => setSelectedTab('read')} selectedTab={selectedTab} />

        </Div>
      </Div>

      {/* Notifications List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
      >
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            // <NotificationItem key={notification.id} notification={notification} />
            <Notification_Item key={notification.id} notification={notification} />
          ))
        ) : (
          <Div
            justifyContent="center"
            alignItems="center"
            py={40}
          >
            <AntDesign
              name="inbox"
              size={48}
              color={theme === 'light' ? '#D1D5DB' : '#4B5563'}
            />
            <Text
              fontSize={16}
              color={theme === 'light' ? '#6B7280' : '#9CA3AF'}
              fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
              mt={12}
              textAlign="center"
            >
              No notifications found
            </Text>
            <Text
              fontSize={14}
              color={theme === 'light' ? '#9CA3AF' : '#6B7280'}
              fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
              mt={4}
              textAlign="center"
            >
              You're all caught up!
            </Text>
          </Div>
        )}

        {/* Mark all as read button */}
        {unreadCount > 0 && (
          <Div mt={20}>
            <Button
              bg={theme === 'light' ? '#F3F4F6' : '#374151'}
              color={theme === 'light' ? '#4B5563' : '#D1D5DB'}
              borderWidth={0}
              rounded={8}
              py={12}
              onPress={() => console.log('Mark all as read')}
            >
              <Text
                fontSize={14}
                fontWeight="600"
                color={theme === 'light' ? '#4B5563' : '#D1D5DB'}
                fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
              >
                Mark all as read
              </Text>
            </Button>
          </Div>
        )}
      </ScrollView>
    </Modal>
  );
}