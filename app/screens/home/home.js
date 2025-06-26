import React, { useEffect, useState } from 'react'
import { Div,Overlay} from 'react-native-magnus'
import { api } from '../../config/api';
import { ActivityIndicator } from 'react-native'
import CustomText from '../../custom/CustomText';
import { useTranslation } from 'react-i18next';
import Places_Section_Map from '../../components/places_section_map';
import Map_Home from '../../components/map_home';
import Search_Component from '../../components/search_component';
import Drawer_Home_Component from '../../components/drawer_home_component';


export default function Home() {
  const [places, setPlaces] = useState([]);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const {t}=useTranslation();

  const fetchPlaces = async () => {
    try {
      const response = await fetch(`${api.url}api/v1/places`);
      const data = await response.json();
      setPlaces(data.data);
    } catch (error) {
      console.log("Error fetching places", error);
    }
  }

  useEffect(() => {
    fetchPlaces();
  }, [])







  return (
    <Div style={{ flex: 1 }}   >

      {places && places.length > 0 ? (
        <Div style={{ flex: 1 }} >
          <Div mt={30} flexDir='row' justifyContent='space-between' alignItems='center' position='absolute' top={30} zIndex={1000} px={20} w="100%">
            {/* <SearchComponent places={places} /> */}
            <Search_Component places={places}  />
            {/* <DrawerComponent /> */}
            <Drawer_Home_Component />
          </Div>
         
          <Map_Home places={places} />
          <Places_Section_Map places={places} />
          

        </Div>
      ) : (
        <Div style={{ flex: 1 }}>
          <Div mt={30} flexDir='row' justifyContent='space-between' alignItems='center' position='absolute' top={30} zIndex={1000} px={20} w="100%">
            {/* <SearchComponent places={places} /> */}
            <Search_Component places={places}  />
            
            <Drawer_Home_Component />
          </Div>
        
          <Map_Home places={places} />
          <Places_Section_Map places={places} />
          <Overlay visible={overlayVisible} p="xl">
            <ActivityIndicator size={"large"} />
            <CustomText content={t('please-wait')} fontWeight='bold' textAlign='center'  mt={20} />
          </Overlay>
        </Div>
       
       
      )}
    </Div>


  )
}


