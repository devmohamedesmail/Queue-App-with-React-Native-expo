
import React from 'react'
import { Button } from 'react-native-magnus'
import AntDesign from '@expo/vector-icons/AntDesign';

const ModalCloseBtn = ({onPress}) => {
    return (
        <Button
            bg="gray400"
            h={35}
            w={35}
            flexDir='row'
            justifyContent='center'
            alignItems='center'
            position="absolute"
            top={30}
            right={15}
            p={0}
            rounded="circle"
            onPress={onPress}
        >
            <AntDesign name="close" size={20} color="black" />
        </Button>
    )
}

export default ModalCloseBtn