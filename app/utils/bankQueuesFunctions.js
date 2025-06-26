import axios from "axios";



// ********************************* Fetch Place Services Start **********************************
export const fetch_place_services = async (placeId, appUrl, setPlaceServices, setLoadingFetchData, setServicesModalVisible) => {
    try {
        setLoadingFetchData(true);
        const response = await axios.get(`${appUrl}/api/v1/services/place/services/${placeId}`)
        const data = response.data.services
        if (data.length > 0) {
            setPlaceServices(data)
            setServicesModalVisible(true)
        } else {
            setPlaceServices([]);
        }
    } catch (error) {
        console.log("Error Fetching Place Services" + error)
    } finally {
        setLoadingFetchData(false);
    }
}




// ********************************* Get all waiting queues **********************************
export const get_all_waiting_queues = async (appUrl, placeId, serviceId, setWaitingQueues) => {
    try {
        const url = serviceId
            ? `${appUrl}/api/v1/queues/all/queue/${placeId}/${serviceId}`
            : `${appUrl}/api/v1/queues/all/queue/${placeId}`;
        const response = await axios.get(`${url}`);

        setWaitingQueues(response.data)

    } catch (error) {
        console.log("Error Fetching Place Services" + error)
    }
}




// Book new Queue 
export const book_new_queue = async (userId,appUrl,placeId,serviceId,setLoading, navigation,place) => {
    try {
        if (!userId) {
            console.log("User ID is not available yet. Fetching...");
            
            // await fetchDeviceId(); 
        }
        setLoading(true)
        fetchDeviceId()
        const response = await axios.post(`${appUrl}/api/v1/queues/book/new/queue/${userId}/${placeId}/${serviceId}`)
        setLoading(false)
        const queue = response.data

        navigation.navigate("MyQueue", { queue: queue, place: place })
    } catch (error) {
        console.log(error)
        setLoading(false)
    } finally {
        setLoading(false)
    }
}