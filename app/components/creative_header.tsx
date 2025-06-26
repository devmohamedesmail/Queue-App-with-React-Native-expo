import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

import { useTheme } from '../context/ThemeContext';
import colors from '../config/colors';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Button, Text, Div } from 'react-native-magnus';
import { useNavigation } from '@react-navigation/native';

export default function Creative_Header({ title = '' }: { title?: string }) {
    const { theme } = useTheme();
    const { t, i18n } = useTranslation();
    const navigation = useNavigation<any>();
    return (

        <Div h={80} w="100%">
            <LinearGradient
                colors={
                    theme === 'light'
                        ? [colors.lightTheme.primary, colors.lightTheme.secondary]
                        : [colors.darkTheme.primary, colors.darkTheme.secondary]
                }
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 100,
                    borderBottomLeftRadius: 24,
                    borderBottomRightRadius: 24,
                    zIndex: 0,
                }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />
            <Button
                onPress={() => navigation.goBack()}
                bg={theme === 'light' ? '#fff' : colors.darkTheme.dark}
                position="absolute"
                left={20}
                top={44}
                rounded="circle"
                shadow="md"
                zIndex={2}
                w={44}
                h={44}
                alignItems="center"
                justifyContent="center"
            >
                <Ionicons
                    name="arrow-back"
                    size={20}
                    color={theme === 'light' ? colors.lightTheme.primary : '#fff'}
                />
            </Button>
            <Div
                position="absolute"
                left={0}
                right={0}
                top={44}
                alignItems="center"
                zIndex={1}
            >
                <Text
                    fontSize={22}
                    fontWeight="bold"
                    color={theme === 'light' ? '#fff' : colors.darkTheme.white}
                    fontFamily={i18n.language === 'en' ? 'poppins-bold' : 'cairo'}
                    letterSpacing={1}
                    
                >
                   
                    {title}
                </Text>
            </Div>
        </Div>
    )
}
