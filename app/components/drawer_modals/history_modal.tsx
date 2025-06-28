import React, { useContext, useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from 'react-i18next';
import { Modal, Div, Text, ScrollDiv } from 'react-native-magnus';
import colors from '../../config/colors';
import axios from 'axios';
import { InfoContext } from '../../context/InfoContext';
import { AuthContext } from '../../context/AuthContext';
import ModalCloseBtn from '../model_close_btn';
import { api } from '../../config/api';
import { Feather } from '@expo/vector-icons';
import History_Item from '../../items/history_item';
import Empty_Histoty from '../empty_histoty';

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


            <Div h="100%" position='relative'>

                <ModalCloseBtn onPress={() => setHistoryModalVisible(false)} />



                <Div
                    h={56}
                    row
                    alignItems="center"
                    bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.surface}
                    rounded={16}
                    shadow="md"
                    shadowColor={theme === 'light' ? '#00000010' : '#00000030'}
                    mx={8}
                    mt={8}
                    px={18}
                >
                    <Div
                        bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                        h={36}
                        w={36}
                        rounded="circle"
                        alignItems="center"
                        justifyContent="center"
                        shadow="sm"
                        shadowColor={theme === 'light' ? '#00000010' : '#00000030'}
                    >
                        <Feather
                            name="clock"
                            size={20}
                            color={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.background}
                        />
                    </Div>
                    <Text
                        fontSize={20}
                        ml={14}
                        fontWeight="bold"
                        color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                        fontFamily={i18n.language === 'en' ? 'poppins-bold' : 'cairo'}
                        letterSpacing={0.5}
                    >
                        {t('history')}
                    </Text>
                </Div>


                <Div mt={30}>
                    <ScrollDiv pb={100} mb={60}>
                        {history.length > 0 ? (
                            history.map((item) => (
                                <History_Item key={item._id}
                                    item={item} />
                            ))
                        ) : (
                            <Empty_Histoty />
                        )}
                    </ScrollDiv>
                </Div>
            </Div>
        </Modal>
    )
}

export default History_Modal