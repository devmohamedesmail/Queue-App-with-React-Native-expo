import React, { useState } from "react";
import { SafeAreaView, StatusBar, FlatList } from "react-native";
import { Div, Button, Icon, Modal, ThemeProvider , Drawer } from "react-native-magnus";

export const Test = () => {
    const [visible, setVisible] = useState(false);
    const drawerRef = React.createRef();
  return (
    <Div>
        <SafeAreaView style={{ flex: 1 }}>
       

        
      </SafeAreaView>





<Drawer ref={drawerRef} >
 <Button block bg="red" m={10} onPress={() => setVisible(true)}>
          Open Modal
        </Button>
        <Modal isVisible={visible}>
          <Button
            bg="gray400"
            h={35}
            w={35}
            position="absolute"
            top={50}
            right={15}
            rounded="circle"
            onPress={() => {
              setVisible(false);
            }}
          >
            <Icon color="black900" name="close" />
          </Button>
        </Modal>
</Drawer>

<Button
  onPress={() => {
    if (drawerRef.current) {
      drawerRef.current.open();
    }
  }}
>
  Open Drawer
</Button>





    </Div>
  )
}

