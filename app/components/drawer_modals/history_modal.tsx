
import React, { useContext, useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from 'react-i18next';
import { Modal, Div, Text, ScrollDiv } from 'react-native-magnus';
import colors from '../../config/colors';
import HistoryItem from '../../screens/historylog/historyitem';
import axios from 'axios';
import { InfoContext } from '../../context/InfoContext';
import { AuthContext } from '../../context/AuthContext';
import ModalCloseBtn from '../../components/ModalCloseBtn';
import { api } from '../../config/api';
import { Feather } from '@expo/vector-icons';

const History_Modal = ({ historyModalVisible, setHistoryModalVisible }) => {
    const { theme } = useTheme();
    const { t, i18n } = useTranslation();
    const [history, setHistory] = useState([]);
    const { info } = useContext(InfoContext);
    const { auth, setAuth, login, register, logout } = useContext(AuthContext)




    const fetch_user_history = async () => {
        try {
            const response = await axios.get(`${api.url}api/v1/queues/user/queues/history/${auth.user.user._id}`)
            setHistory(response.data)
        } catch (error) {
            console.log("Error in history log Screen", error)
        }
    }


    useEffect(() => {
        fetch_user_history()
    }, [auth])


    return (
        <Modal
            p={10}
            isVisible={historyModalVisible} bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background}>

            <ModalCloseBtn onPress={() => setHistoryModalVisible(false)} />
            <Div h="100%" position='relative'>





                <Div
                    h={40}
                    row
                    justifyContent="flex-start"
                    alignItems="center"
                    mr={12}
                    px={10}
                >
                    <Feather
                        name="clock"
                        size={22}
                        color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                    />
                    <Text
                        fontSize={18}
                        ml={10}
                        fontWeight="bold"
                        color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}
                        fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                    >
                        {t('history')}
                    </Text>
                </Div>


                <Div mt={80}>




                    <ScrollDiv pb={100} mb={60}>
                        {history.length > 0 ? (
                            history.map((item) => (
                                <HistoryItem
                                    key={item._id}
                                    item={item}
                                />
                            ))
                        ) : (
                            <Text
                                color={theme === 'light' ? colors.lightTheme.gray : colors.darkTheme.primary}
                                fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                                textAlign="center"
                                mt={20}
                            >
                                {t('noHistoryFound')}
                            </Text>
                        )}

                    </ScrollDiv>

                </Div>

            </Div>

        </Modal>
    )
}

export default History_Modal