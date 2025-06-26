import React, { useState, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { api } from '../config/api';
import { Div, Text, Skeleton, Image } from 'react-native-magnus';
import QueueItem from '../screens/myqueue/parts/QueueItem';
import Carousel from 'react-native-reanimated-carousel';
import { Dimensions } from 'react-native';
import CustomText from '../custom/CustomText';



const { width } = Dimensions.get('window');
function Queues_component() {
    const [queues, setQueues] = useState(null)
    const { t } = useTranslation();
    const { auth } = useContext(AuthContext);



    const fetch_today_queues_for_user = async () => {
        try {

            const response = await axios.get(`${api.url}api/v1/queues/user/queues/${auth.user.user._id}`)
            const data = response.data.queues;
            if (data.length > 0) {
                setQueues(data)
            } else {
                setQueues([])
            }
        } catch (error) {
            console.log("Error Fetching user queues" + error)

        }
    }


    useEffect(() => {
        fetch_today_queues_for_user()
    }, [auth, queues])









    return (
        <Div>
            {queues ? (
                <>
                    {queues && queues.length > 0 ? (
                        <Div >
        
                            <CustomText textAlign='center' fontWeight='bold' mt={30} fontSize={20} content={`${t('my-queues')} - ${queues.length} `} />
                            <Carousel
                                
                                width={width}
                                height={600}
                                loop={false}
                                autoPlayReverse={false}
                                data={queues}
                                scrollAnimationDuration={500}
                                renderItem={({ item }) => (
                                    <QueueItem
                                        queue={item}
                                        fetch_today_queues_for_user={fetch_today_queues_for_user}
                                    />
                                )}
                            />

                        </Div>


                    ) : (
                        <Div>
                            <Image
                                h={350}
                                w='80%'
                                m={10}
                                alignSelf='center'
                                rounded="md"
                                source={require('../../assets/queue.png')}
                            />
                            
                            <CustomText textAlign='center' fontWeight='bold' mt={30} fontSize={20} content={t('no-queues')} />
                        </Div>)}
                </>
            ) : (
                <Div flexDir="row" mt="md">
                    <Div flex={1} flexDir='column' justifyContent='center' w="100%" px={10}>
                        <Skeleton.Box mt="sm" alignSelf='center' w={300} h={30} />
                        <Skeleton.Box mt="md" h={400} />
                        <Skeleton.Box mt="md" h={30} />
                        <Skeleton.Box mt="md" h={30} />
                    </Div>
                </Div>)}
        </Div>
    )
}

export default Queues_component