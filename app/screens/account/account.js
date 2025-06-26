import React from 'react'
import { SafeAreaView } from 'react-native'
import { Div, Text } from 'react-native-magnus'



import DrawerComponent from '../../components/DrawerComponent'
import colors from '../../config/colors'
import CustomAccountButton from '../../custom/CustomAccountButton'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import NotificationComponent from '../../components/drawer_modals/NotificationComponent'



export default function Account() {
  return (
    <SafeAreaView>
      <StatusBarComponent />
      <Div bg={colors.screen} h="100%">


        <Div flexDir='row' justifyContent='space-between' alignItems='center' mt={10} px={10}>
          

          <Div flexDir='row' justifyContent='space-between' alignItems='center'>
            <NotificationComponent />
          
            <DrawerComponent />
          </Div>
        </Div>

        <Text fontWeight='bold' textAlign='center' mt={20} fontSize={20}>My Account</Text>




        <Div mt={50}>
          <CustomAccountButton icon={<FontAwesome name="edit" size={24} color="black" />} title="update your information" />
          <CustomAccountButton icon={<MaterialIcons name="history" size={24} color="black" />} title="Histroy Log" />
          <CustomAccountButton icon={<AntDesign name="hearto" size={24} color="black" />} title="My Favourite" />
          <CustomAccountButton icon={<AntDesign name="videocamera" size={24} color="black" />} title="How to use" />
          <CustomAccountButton icon={<Feather name="help-circle" size={24} color="black" />} title="Need Help" />
        </Div>






         





      </Div>
    </SafeAreaView>
  )
}
