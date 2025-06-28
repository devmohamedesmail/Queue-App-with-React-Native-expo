import React from 'react'
import { useTheme } from '../context/ThemeContext'
import colors from '../config/colors'
import { Button, Div, Text } from 'react-native-magnus'

export default function Inbox_Item({ topic, message, reply }) {
    const { theme } = useTheme();
    return (
        <Button h={100} w={"100%"} px={10} py={10} shadow={5} borderWidth={1} borderColor='gray300' rounded={10} my={5} bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.dark}>
            <Div w={"100%"} flexDir='column' alignItems='flex-start'>
                <Text color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} fontWeight='bold' fontSize={15}>{topic}</Text>
                <Text color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.white}>{message}</Text>
                <Text color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.white}>{reply}</Text>
            </Div>
        </Button>
    )
}
