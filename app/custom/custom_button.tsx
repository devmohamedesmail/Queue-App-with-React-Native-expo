import React from 'react'
import { Button } from 'react-native-magnus';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import colors from '../config/colors';

interface CustomButtonProps {
  title?: string;
  onPress?: () => void;
  w?: any;
  bg?: string;
  icon?: React.ReactNode;
  [key: string]: any;
}

export default function Custom_Button({ title, onPress, w, bg, icon, ...props }: CustomButtonProps) {
    const { t, i18n } = useTranslation();
    const { theme } = useTheme();
    const backgroundColor = bg || (theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary);
    return (
        <Button
            {...props}
            onPress={onPress}
            w={w}
            h={50}
            p={0}
            fontWeight='bold'
            alignSelf='center'
            rounded={10}
            bg={backgroundColor}
            fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
            suffix={icon}
        >

            {title}
        </Button>
    )
}
