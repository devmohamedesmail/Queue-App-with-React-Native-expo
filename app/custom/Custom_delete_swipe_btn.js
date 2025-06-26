import React from 'react'
import { Button } from 'react-native-magnus';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
const Custom_delete_swipe_btn = ({ onPress}) => {
    return (
        <Button
            rounded={"md"}
            bg="transparent"
            onPress={onPress}
        >
            <FontAwesome5 name="trash" size={24} color="red" />
        </Button>
    )
}

export default Custom_delete_swipe_btn