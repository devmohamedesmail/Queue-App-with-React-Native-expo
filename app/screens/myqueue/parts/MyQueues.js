// import Swiper from 'react-native-swiper'
import React, { useContext, useEffect, useState } from 'react'
import colors from '../../../config/colors'
import QueueItem from './QueueItem'
import { InfoContext } from '../../../context/InfoContext'
import axios from 'axios'
import { Text, Div, Skeleton } from 'react-native-magnus'
import { useTheme } from '../../../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../../../context/AuthContext'
import { api } from '../../../config/api'
import Carousel from 'react-native-reanimated-carousel';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const MyQueues = () => {
    const [queues, setQueues] = useState(null)
    const { t } = useTranslation();
    const { auth} = useContext(AuthContext);
    // ********************************* Fetch User Queues Start **********************************
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
    }, [auth])




    // ********************************* Fetch User Queues End **********************************
 if (queues === null) {
        return (
            <Div flexDir="row" mt="md">
                <Div flex={1} flexDir='column' justifyContent='center' w="100%" px={10}>
                    <Skeleton.Box mt="sm" alignSelf='center' w={300} h={30} />
                    <Skeleton.Box mt="md" h={400} />
                    <Skeleton.Box mt="md" h={30} />
                    <Skeleton.Box mt="md" h={30} />
                </Div>
            </Div>
        )
    }

    if (queues.length === 0) {
        return <Text textAlign="center" mt="xl">{t('no-queues')}</Text>
    }


    return (
        // <Swiper
        //     showsButtons={false}
        //     loop={false}
        //     dotColor='gray'
        //     activeDotColor={colors.lightTheme.primary}
        //     key={queues.length} 
        // >
        //     {queues.map((queue, index) => (
        //         <QueueItem
        //             key={queue._id || index}
        //             queue={queue}
        //             fetch_today_queues_for_user={fetch_today_queues_for_user}
        //         />
        //     ))}
        // </Swiper>
        <Carousel
      width={width}
      height={450}
      loop={false}
      data={queues}
      scrollAnimationDuration={500}
      renderItem={({ item }) => (
        <QueueItem
          queue={item}
          fetch_today_queues_for_user={fetch_today_queues_for_user}
        />
      )}
    />
    )
}

export default MyQueues