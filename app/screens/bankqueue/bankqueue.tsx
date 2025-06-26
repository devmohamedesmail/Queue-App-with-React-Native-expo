import React, { useContext, useEffect, useState } from 'react'
import { Div, Text, Dropdown, Button } from 'react-native-magnus'
import colors from '../../config/colors'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { InfoContext } from '../../context/InfoContext'
import { fetch_place_services, get_all_waiting_queues } from '../../utils/bankQueuesFunctions'
import { AuthContext } from '../../context/AuthContext'
import Toast from 'toastify-react-native';
import Place_Info from '../../components/place_info'
import Waiting_Status from '../../components/waiting_status'
import Creative_Header from '../../components/creative_header'
import Book_Queue_Btn from '../../components/book_queue_btn'
import Select_Service_Menu from '../../components/select_service_menu'
import { Alert } from 'react-native'



export default function BankQueue({ route }) {
    const navigation = useNavigation<any>()
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
    const dropdownRef = React.createRef<any>();



   


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
           Alert.alert(
                t('error'),
                t('queue-book-error'),
                [
                    {
                        text: t('ok'),
                        onPress: () => console.log('OK Pressed'),
                    },
                ],
                { cancelable: false }
            );
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }



    // const dropdownRef = React.createRef();
    

    useEffect(() => {
        if (place.services.length > 0 && dropdownRef.current) {
            dropdownRef.current.open();
        }
    }, [place.services]);




    return (
        <>
            
            <Div bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background} h="100%">

                 <Creative_Header title={t('book-queue')} />
            

                <Div h="90%" flexDir='column' justifyContent='flex-start' >
                    {/* <PlaceDetails place={place} /> */}
                   <Place_Info place={place} />



                    {placeServices !== null && placeServices.length > 0 ? (
                        <>
                           
                            <Waiting_Status waitingQueues={waitingQueues} loading={loading}  />
                        </>) : (
                        <>
                            
                            <Waiting_Status waitingQueues={waitingQueues} loading={loading}  />
                        </>)}


                    <Div flexDir='row' justifyContent='center' alignItems='center'   >

                        {
                            loading ? (
                                <Book_Queue_Btn onPress={() => {}} title={t('book...')} bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />
                            ) : (
                                <Book_Queue_Btn onPress={() => book_new_queue()} title={t('book')} bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />
                               
                            )
                        }
                    </Div>


                </Div>


            </Div>

            {/* <Dropdown
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
                        value={service._id}
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
                
                
            </Dropdown> */}



                 <Select_Service_Menu dropdownRef={dropdownRef} place={place} setServiceId={setServiceId} get_all_waiting_queues={get_all_waiting_queues} setServicesModalVisible={setServicesModalVisible} />


        </>

    )
}





