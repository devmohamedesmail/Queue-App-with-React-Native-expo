import React, { useRef, useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { Div } from 'react-native-magnus';
import { useTheme } from '../context/ThemeContext';
import { darkMapStyle, lightMapStyle } from '../config/mapStyles';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Place_Select_Modal from './place_select_modal';
import colors from '../config/colors';
import * as Location from 'expo-location';
import Custom_Icon_Btn from '../custom/custom_icon_btn';

export default function Map_Home({ places }) {
    const mapRef = useRef(null);
    const { theme } = useTheme();
    const [userRegion, setUserRegion] = useState<{
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
    } | null>(null);
    const [loading, setLoading] = useState(false)
    const [selectedPlace, setSelectedPlace] = useState()
    const [isModalVisible, setModalVisible] = useState(false);





    const openModalWithPlace = (place: any) => {
        setSelectedPlace(place);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };



   

    const goToMyLocation = async () => {
        try {
            setLoading
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {

                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;


            if (mapRef.current) {
                mapRef.current.animateCamera({
                    center: {
                        latitude,
                        longitude,
                    },
                    zoom: 15,
                    pitch: 0,
                    heading: 0,
                    altitude: 0,
                });
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log('Error getting location:', error);
        } finally {
            setLoading(false)
        }
    };




    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            setUserRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        })();
    }, []);













    return (
        <Div position='relative' h="100%">


            <MapView
                ref={mapRef}

                camera={{
                    center: {
                        latitude: 25.276987,
                        longitude: 55.296249,
                    },
                    pitch: 0,
                    heading: 0,
                    altitude: 0,
                    zoom: 10,
                }}

                showsScale={true}
                showsCompass={true}
                showsUserLocation={true}
                userLocationUpdateInterval={1000}
                followsUserLocation={true}
                userInterfaceStyle='light'
                zoomControlEnabled={true}
                showsMyLocationButton={false}
                showsIndoors={true}
                style={{
                    height: '100%',
                }}
                customMapStyle={theme === 'dark' ? darkMapStyle : lightMapStyle}
                initialRegion={userRegion || {
                    latitude: 25.276987,
                    longitude: 55.296249,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}

            >
                {places && places.length > 0 && places.map((place, index) => (
                    <Marker
                        key={place._id}
                        title={place.nameAr}
                        coordinate={{ latitude: parseFloat(place.location.lat), longitude: parseFloat(place.location.lng) }}

                        onPress={() => openModalWithPlace(place)}
                        style={{ width: 200, height: 200 }}
                    >


                    </Marker>

                ))}
            </MapView>


            <Div position="absolute" bottom={300} right={20}>
                <Custom_Icon_Btn icon={<FontAwesome6 name="location-arrow" size={24} color={theme === 'light' ? colors.lightTheme.black : colors.lightTheme.white} />} onPress={goToMyLocation} />
               
            </Div>






            <Place_Select_Modal
                toggleModal={closeModal}
                isModalVisible={isModalVisible} selectedPlace={selectedPlace} />



        </Div>
    )
}
