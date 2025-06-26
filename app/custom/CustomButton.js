import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button ,Div,Icon} from 'react-native-magnus'
import { useTheme } from '../context/ThemeContext';
import colors from '../config/colors';

export default function CustomButton({ title, onPress, w, bg,icon, ...props }) {
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
