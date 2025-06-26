import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Div, Button, Modal } from "react-native-magnus";
import colors from '../config/colors';

interface CustomModalProps {
    onPressClose?: () => void;
    isVisible?: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
    animationIn?: any;
    animationOut?: any;
    h?: number | string;
    [key: string]: any;
}

export default function Custom_Modal(
    {
        onPressClose,
        isVisible = false,
        onClose,
        children,
        animationIn = "lightSpeedIn",
        animationOut = "lightSpeedOut",
        h = 350,
        ...props
    }: CustomModalProps
) {
    const { theme } = useTheme();
    return (
        <Modal
            isVisible={isVisible}
            animationIn={animationIn}
            animationOut={animationOut}
            animationInTiming={500}
            animationOutTiming={500}
            onBackdropPress={onClose}
            h={h}
            bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.dark}
            {...props}
        >
            <Button
                bg="gray400"
                h={35}
                w={35}
                p={0}
                position="absolute"
                top={20}
                right={15}
                rounded="circle"
                onPress={onPressClose}
            >
                <AntDesign name="close" size={20} color="black" />
            </Button>
            <Div mt={50}>
                {children}
            </Div>
        </Modal>
    )
}
