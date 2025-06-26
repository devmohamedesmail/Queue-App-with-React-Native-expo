import React from 'react'
import { Modal, Div, Text, Icon } from 'react-native-magnus'
import { TouchableOpacity, useColorScheme } from 'react-native'

export interface CustomDrawerModalProps {
  visible?: boolean
  onClose?: () => void
  children?: React.ReactNode
  title?: string
  modalProps?: Partial<React.ComponentProps<typeof Modal>>
  style?: any
}

export default function CustomDrawerModal({
  visible = false,
  onClose,
  children,
  title,
  modalProps = {},
  style = {},
}: CustomDrawerModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      p={0}
      bg={isDark ? 'gray900' : 'white'}
      rounded={"xl"}
      {...modalProps}
      style={style}
    >
      <Div p="lg" bg={isDark ? 'gray900' : 'white'} rounded="xl">
        {/* Close Button */}
        <TouchableOpacity
          onPress={onClose}
          style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon
            name="close"
            fontFamily="MaterialIcons"
            color={isDark ? 'gray300' : 'gray700'}
            fontSize={24}
          />
        </TouchableOpacity>
        {/* Title */}
        {title && (
          <Text
            fontWeight="bold"
            fontSize={20}
            color={isDark ? 'gray100' : 'gray900'}
            mb="md"
            textAlign="center"
          >
            {title}
          </Text>
        )}
        {/* Content */}
        <Div>{children}</Div>
      </Div>
    </Modal>
  )
}
