import React, { useContext, useEffect, useState } from 'react'
import { Div, Text, Dropdown, Button } from 'react-native-magnus'
import colors from '../../config/colors'

import { useNavigation } from '@react-navigation/native'
import CloseBtn from '../../components/CloseBtn'
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import PlaceDetails from './parts/PlaceDetails'
import { InfoContext } from '../../context/InfoContext'
import QueueDetails from './parts/QueueDetails'


// functions
import { fetch_place_services, get_all_waiting_queues } from '../../utils/bankQueuesFunctions'
import { AuthContext } from '../../context/AuthContext'
import Toast from 'toastify-react-native';
import CustomActivityIndicator from '../../custom/CustomActivityIndicator'
import Book_btn from '../../components/Book_btn'
import CustomText from '../../custom/CustomText'
import { StatusBar } from 'expo-status-bar'
import CustomHeader from '../../custom/CustomHeader';




export default function BankQueue({ route }) {
    const navigation = useNavigation()
    const { theme } = useTheme()
    const { t, i18n } = useTranslation();
    const { place } = route.params;
    const [placeServices, setPlaceServices] = useState(null)
    const [loading, setLoading] = useState(false)

    const { info } = useContext(InfoContext)

    const [serviceId, setServiceId] = useState(null)
    const [servicesModalVisible, setServicesModalVisible] = useState(false)
    const [loadingFetchData, setLoadingFetchData] = useState(false)
    const [waitingQueues, setWaitingQueues] = useState(null);
    const { auth, setAuth, login, register, logout } = useContext(AuthContext);



   


    // ********************************* Fetch Place Services Start **********************************
    useEffect(() => {
        fetch_place_services(place._id, info.appUrl, setPlaceServices, setLoadingFetchData, setServicesModalVisible)
    }, [])


    // ******************************** Get All Waiting Queues Start ********************************
    useEffect(() => {
        get_all_waiting_queues(info.appUrl, place._id, serviceId, setWaitingQueues)
    }, [serviceId, place._id, loadingFetchData])

    // ******************************** Get All Waiting Queues End ********************************


    // *********************************  book_new_queue Start *******************************************
    const book_new_queue = async () => {
        try {
            if (auth === null) {
                
                navigation.navigate("Login")
                return
            }

             if(serviceId === null && place.services.length > 0){
                dropdownRef.current.open();
                return
             }


            setLoading(true)
            let url = `${info.appUrl}/api/v1/queues/book/new/queue/${auth.user.user._id}/${place._id}`;
            if (serviceId) {
                url += `/${serviceId}`;
            }
            const response = await axios.post(url);
            setLoading(false);
            const queue = response.data
            navigation.navigate("MyQueue", { queue: queue, place: place })
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: t('error'),
                text2: t('try-again'),
                visibilityTime: 3000,
                position: 'top',
                autoHide: true,

            })
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }



    // const dropdownRef = React.createRef();
    const dropdownRef = React.useRef(null);

    useEffect(() => {
        if (place.services.length > 0 && dropdownRef.current) {
            dropdownRef.current.open();
        }
    }, [place.services]);




    return (
        <>
            


            <Div bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background} h="100%">

                {/* <CloseBtn /> */}
                <CustomHeader title={t('book-queue')} />

                <Div h="80%" flexDir='column' justifyContent='space-evenly'>
                    <PlaceDetails place={place} />


                    {placeServices !== null && placeServices.length > 0 ? (
                        <>
                            <QueueDetails waitingQueues={waitingQueues} loading={loading} book_new_queue={book_new_queue} />
                        </>) : (
                        <>
                            <QueueDetails waitingQueues={waitingQueues} loading={loading} book_new_queue={book_new_queue} />
                        </>)}


                    <Div flexDir='row' justifyContent='center' alignItems='center'   >

                        {
                            loading ? (

                                <Book_btn  title={t('booking....')} />
                            ) : (

                                <Book_btn onPress={() => book_new_queue()} title={t('book')} />
                            )
                        }
                    </Div>


                </Div>


            </Div>

            <Dropdown
                ref={dropdownRef}
                zIndex={10}
                title={
                    
                    <CustomText 
                     color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.white}
                     mb={30} textAlign="center" content={t('select-your-service')} fontSize={18} fontWeight="extrabold" />
                }
                mt="md"
                pb="2xl"
                bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background}
                h={500}
                showSwipeIndicator={true}
                roundedTop="xl">
                
                {place && place.services && place.services.map((service) => (
                    <Dropdown.Option
                        key={service._id}
                        mb={5}
                        px="xl"
                        block
                        bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.dark}
                        borderBottomColor={theme === 'light' ? colors.lightTheme.light : colors.darkTheme.primary}
                        borderBottomWidth={theme === 'light' ? 1 : 0}
                        h={75}
                        onPress={() => {
                            setServiceId(service._id)
                            get_all_waiting_queues()
                            setServicesModalVisible(false)
                            dropdownRef.current.close();
                        }}>
                       
                        <CustomText 
                        textTransform="uppercase"
                        fontWeight="bold" 
                        fontSize={15} 
                        w="100%" 
                        textAlign="center" 
                        content={i18n.language === "ar" ? service.nameAr : service.nameEn} />
                    </Dropdown.Option>
                ))}
                
                
            </Dropdown>






        </>

    )
}





