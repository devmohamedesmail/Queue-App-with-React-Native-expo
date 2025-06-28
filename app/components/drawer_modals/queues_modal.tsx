import { Modal, Div,Text} from 'react-native-magnus'
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import colors from '../../config/colors'
import ModalCloseBtn from '../model_close_btn'
import User_Queues from '../user_queues'

const MyQueueComponent = ({ queueModalVisible, setQueueModalVisible }) => {
    const { theme } = useTheme();
    const { t,i18n } = useTranslation();
    return (
        <Modal isVisible={queueModalVisible} bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background} p={10} >
            
                <ModalCloseBtn onPress={() => setQueueModalVisible(false)} />
            <Div h="100%" position='relative' pointerEvents="box-none">
                <Div mt={80}>
                    
                    <User_Queues />
                </Div>
            </Div>
        </Modal>
    )
}






export default MyQueueComponent