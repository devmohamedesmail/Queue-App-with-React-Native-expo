import React from 'react'
import { Button } from 'react-native-magnus';
import { useTheme } from '../context/ThemeContext';
import colors from '../config/colors';

export default function Custom_Icon_Btn({ icon, onPress, ...props }: any) {
    const { theme } = useTheme();
    return (
        <Button
            h={45}
            w={45}
            p={0}
            bg={theme === 'light' ? colors.lightTheme.white : colors.lightTheme.black}
            rounded="md"
            shadow="sm"
            onPress={onPress}
            {...props}
        >
            {icon}

        </Button>
    )
}
