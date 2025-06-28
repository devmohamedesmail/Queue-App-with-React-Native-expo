import React, { useState, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { api } from '../config/api';
import { Div,  Skeleton } from 'react-native-magnus';
import Carousel from 'react-native-reanimated-carousel';
import { Dimensions } from 'react-native';
import CustomText from '../custom/CustomText';
import Queue_User_Item from '../items/queue_user_item';
import No_Queues from './no_queues';





export default function User_Queues() {
    const { width } = Dimensions.get('window');
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
                                    <Queue_User_Item queue={item} fetch_today_queues_for_user={fetch_today_queues_for_user} />
                                )}
                            />

                        </Div>


                    ) : (
                        
                        <No_Queues />
                    )}
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
