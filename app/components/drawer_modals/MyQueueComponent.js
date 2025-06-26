import { Modal, Div} from 'react-native-magnus'
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import colors from '../../config/colors'
import ModalCloseBtn from '../ModalCloseBtn'
import Queues_component from '../Queues_component'

const MyQueueComponent = ({ queueModalVisible, setQueueModalVisible }) => {
    const { theme } = useTheme();
    const { t,i18n } = useTranslation();
    return (
        <Modal isVisible={queueModalVisible} bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background}>
            <ModalCloseBtn onPress={() => setQueueModalVisible(false)} />
            <Div h="100%" position='relative' pointerEvents="box-none">
                <Div mt={80}>
                    <Queues_component />
                </Div>
            </Div>
        </Modal>
    )
}






export default MyQueueComponent