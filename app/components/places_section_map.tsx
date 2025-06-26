import React, { useContext, useEffect, useState } from 'react'
import { useMemo } from 'react'
import { ScrollDiv, Div } from 'react-native-magnus'
import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from '../context/ThemeContext';

import AntDesign from '@expo/vector-icons/AntDesign';
import { getLimitedWords } from '../utils/getLimitedWords';
import Place_Item_Map from '../items/place_item_map';
import { useSelector } from 'react-redux';
import colors from '../config/colors';









export default function Places_Section_Map({ places }) {
  const snapPoints = useMemo(() => ['30%', '50%', '80%'], [])
  const { theme } = useTheme()

 

  return (
    <BottomSheet snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor: theme === 'light' ? colors.lightTheme.white : colors.darkTheme.dark, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
    >

      <ScrollDiv  >

        {places && places.length > 0 ? (<>
          {places.map((place: any) => (
            <Place_Item_Map place={place} key={place._id} />
          ))}</>) : (
          <Div px={20} py={20}>
            <AntDesign name="search1" size={40} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />
          </Div>)}

      </ScrollDiv>
    </BottomSheet>
  )
}
