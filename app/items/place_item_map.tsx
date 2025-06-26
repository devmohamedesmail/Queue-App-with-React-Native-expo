import React, { useState, useEffect } from 'react'
import { Div, Image, Button,Text } from 'react-native-magnus'
import { useTheme } from '../context/ThemeContext'
import CustomText from '../custom/CustomText';
import colors from '../config/colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import { useSelector, useDispatch } from 'react-redux';
import { add_To_wishlist } from '../redux/reducers/wishlistSlice';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { getLimitedWords } from '../utils/getLimitedWords';

interface PlaceItemMapProps {
  place: any;
}

export default function Place_Item_Map({ place }: PlaceItemMapProps) {
  const { theme } = useTheme();
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const navigation = useNavigation<any>();
  const {t,i18n}=useTranslation();
  const items = useSelector((state: any) => state.wishlist.items);
  const dispatch = useDispatch();
  const isFavorite = items.some((item: any) => item.id === place._id);
  const placeLat = parseFloat(place.location.lat);
  const placeLng = parseFloat(place.location.lng);
  const distance = userLocation
    ? (getDistance(userLocation, { latitude: placeLat, longitude: placeLng }) / 1000).toFixed(1)
    : null;

  // Theme-based styling
  const isLight = theme === 'light';
  const cardBg = isLight ? '#FFFFFF' : '#1F1F2E';
  const cardBorder = isLight ? '#E5E7EB' : '#374151';
  const shadowColor = isLight ? '#00000010' : '#00000030';
  const textPrimary = isLight ? colors.lightTheme.black : colors.darkTheme.light;
  const textSecondary = isLight ? colors.lightTheme.primary : colors.darkTheme.primary;
  const distanceColor = isLight ? '#10B981' : '#34D399';
  const heartColor = isLight ? colors.lightTheme.primary : colors.darkTheme.primary;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const handle_add_to_favorites = (place: any) => {
    dispatch(add_To_wishlist({
      id: place._id,
      image: place.image,
      name_en: place.nameEn,
      name_ar: place.nameAr,
      address_en: place.addressEn,
      address_ar: place.addressAr,
    }));
  }

  return (
    <Button
      bg='transparent'
      w="100%"
      onPress={() => navigation.navigate("BankQueue", { place })}
      p={0}
      my={6}
    >
      <Div
        bg={cardBg}
        borderWidth={1}
        borderColor={cardBorder}
        rounded={16}
        p={16}
        w="95%"
        alignSelf="center"
        shadow={30}
        shadowColor={shadowColor}
      >
        <Div flexDir='row' alignItems='center'>
          {/* Place Image with Overlay */}
          <Div position="relative">
            <Image
              rounded={12}
              h={80}
              w={80}
              source={{
                uri: place.image,
              }}
            />
            {/* Status Indicator */}
            <Div
              position="absolute"
              top={8}
              right={8}
              bg={distanceColor}
              rounded="circle"
              h={12}
              w={12}
              borderWidth={2}
              borderColor={cardBg}
            />
          </Div>

          {/* Content Section */}
          <Div flex={1} ml={16}>
            {/* Header with Title and Favorite */}
            <Div flexDir='row' justifyContent='space-between' alignItems='flex-start' mb={8}>
              <Div flex={1} mr={8}>
                <CustomText 
                  fontSize={13}
                  fontWeight="bold"
                  color={textPrimary}
                  content={getLimitedWords(i18n.language === 'en' ? place.nameEn : place.nameAr, 4)}
                />
              </Div>
              
              <Button 
                bg='transparent' 
                p={8}
                rounded="circle"
                onPress={() => handle_add_to_favorites(place)}
              >
                {isFavorite ? (
                  <AntDesign name="heart" size={22} color={heartColor} />
                ) : (
                  <AntDesign name="hearto" size={22} color={heartColor} />
                )}
              </Button>
            </Div>

            {/* Address */}
            <Div mb={12}>
              <Div flexDir="row" alignItems="center" mb={4}>
                <AntDesign name="enviromento" size={14} color={textSecondary} />
                <CustomText 
                  ml={6}
                  fontSize={10}
                  color={textSecondary}
                  content={getLimitedWords(i18n.language === 'en' ? place.addressEn : place.addressAr, 6)}
                />
              </Div>
            </Div>

            {/* Footer with Distance and Rating */}
            <Div flexDir='row' justifyContent='space-between' alignItems='center'>
              {distance && (
                <Div flexDir="row" alignItems="center" bg={isLight ? '#F0FDF4' : '#064E3B'} px={8} py={4} rounded={8}>
                  <AntDesign name="clockcircleo" size={12} color={distanceColor} />
                  <CustomText 
                    ml={4}
                    fontSize={12}
                    fontWeight="600"
                    color={distanceColor}
                    content={`${distance} km away`}
                  />
                </Div>
              )}
              
              {/* Queue Status Indicator */}
              <Div flexDir="row" alignItems="center">
                <Div 
                  bg={isLight ? '#FEF3C7' : '#92400E'} 
                  px={8} 
                  py={4} 
                  rounded={8}
                >
                  <CustomText 
                    fontSize={11}
                    fontWeight="600"
                    color={isLight ? '#92400E' : '#FEF3C7'}
                    content={t('available')}
                  />
                </Div>
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
    </Button>
  )
}
