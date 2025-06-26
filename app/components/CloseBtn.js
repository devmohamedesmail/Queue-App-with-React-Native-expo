
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button, Div } from 'react-native-magnus'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTheme } from '../context/ThemeContext';
import colors from '../config/colors';

const CloseBtn = () => {
  const navigation = useNavigation()
  const { theme } = useTheme()

  return (
    <Div  flexDir='row' justifyContent='flex-end' px={20} mt={50} mb={10}>
      <Button 
      
      onPress={() => navigation.navigate("Home")} 
      // onPress={() => navigation.navigate('MainDrawer', { screen: 'Home' })} 
      bg='transparent'>
        <AntDesign name="close" size={24} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light} />
      </Button>
    </Div>
  )
}

export default CloseBtn