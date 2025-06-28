
import React from 'react'
import { Button ,Div} from 'react-native-magnus'
import AntDesign from '@expo/vector-icons/AntDesign';

const ModalCloseBtn = ({onPress}) => {
    return (
       
        <Div flexDir='row' justifyContent='flex-end' alignItems='center'  top={0} right={0} zIndex={100} >
             <Button
            bg="gray400"
            h={35}
            w={35}
            flexDir='row'
            justifyContent='center'
            alignItems='center'
            // position="absolute"
            // top={30}
            right={15}
            p={0}
            rounded="circle"
            onPress={onPress}
        >
            <AntDesign name="close" size={20} color="black" />
        </Button>
        </Div>
    )
}

export default ModalCloseBtn