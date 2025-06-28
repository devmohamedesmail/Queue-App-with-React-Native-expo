import React, { useState } from 'react';
import { Input, Div, Text } from 'react-native-magnus';
import colors from '../config/colors';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { Feather } from '@expo/vector-icons';

interface CustomInputProps {
  placeholder?: string;
  icon?: React.ReactNode;
  value?: string;
  onChange?: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  [key: string]: any;
}

const Custom_Input: React.FC<CustomInputProps> = ({
  placeholder,
  icon,
  value,
  onChange,
  error,
  secureTextEntry = false,
  ...props
}) => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = secureTextEntry;

  return (
    <Div mb={15}>
      <Input
        {...props}
        value={value}
        cursorColor={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
        placeholder={placeholder}
        bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.black}
        h={55}
        color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}
        fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
        secureTextEntry={isPassword && !showPassword}
        focusBorderColor={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
        suffix={
          isPassword ? (
            <Feather
              name={showPassword ? 'eye' : 'eye-off'}
              size={20}
              color="gray"
              onPress={() => setShowPassword(!showPassword)}
            />
          ) : (
            icon
          )
        }
        onChangeText={onChange}
        borderWidth={1}
        borderColor="gray400"
        textAlign={i18n.language === 'ar' ? 'right' : 'left'}
      />
      {error && (
        <Text mx={10} color={theme === 'light' ? 'red600' : 'white'}>
          {error}
        </Text>
      )}
    </Div>
  );
};

export default Custom_Input;
