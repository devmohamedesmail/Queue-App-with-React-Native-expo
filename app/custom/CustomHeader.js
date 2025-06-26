import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Header, Button, Icon, Text, Drawer } from 'react-native-magnus'
import { useTheme } from '../context/ThemeContext';
import colors from '../config/colors';


const CustomHeader = ({ title }) => {
    const navigation = useNavigation();
    const {theme}=useTheme();
    return (

        <Header
            pt={25}
            px={15}
            p="lg"
            bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.dark}
            alignment="left"
            prefix={
                <Button bg="transparent" onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" color={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.light} fontFamily="Feather" fontSize="2xl"  />
                </Button>
            }
            
        >
           <Text color={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.light}>{title}</Text> 
        </Header>
    )
}

export default CustomHeader