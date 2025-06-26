import React from 'react'
import { Div } from 'react-native-magnus'
import FavouriteItem from './favouriteItem'
import { FlatList, SafeAreaView } from 'react-native'
import colors from '../../config/colors'




import CloseBtn from '../../components/CloseBtn'
import { useTheme } from '../../context/ThemeContext'
import { SwipeListView } from 'react-native-swipe-list-view'
import { useDispatch, useSelector } from 'react-redux'
import { remove_From_wishlist } from '../../redux/reducers/wishlistSlice'
import Custom_delete_swipe_btn from '../../custom/Custom_delete_swipe_btn'
import Custom_favourite_item from '../../custom/Custom_favourite_item'

export default function Favourite() {
  const { theme } = useTheme();
  const favourites = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch();


  const handle_delete = (id) => {
    dispatch(remove_From_wishlist({ id }))
  }



  return (
    <SafeAreaView>

      <Div bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.black} h="100%">

        <CloseBtn />

        <SwipeListView
          data={favourites}
          keyExtractor={(item, index) => (item?.id ? item.id.toString() : index.toString())}
          renderItem={({ item, index, rowMap }) => (
            <Custom_favourite_item
              item={item} rowMap={rowMap}
              index={index} />
          )}

          renderHiddenItem={({ item }, rowMap) => (
            <Div h={100} my={10} mx={10} flexDir="row" justifyContent="space-between">
              {/* Left button */}
              <Div w={50} justifyContent="center" alignItems="center">
                <Custom_delete_swipe_btn onPress={() => {
                  rowMap[item.id]?.closeRow();
                  handle_delete(item.id);
                }} />
              </Div>

              {/* Spacer */}
              <Div flex={1} />

              {/* Right button */}
              <Div w={50} justifyContent="center" alignItems="center">
                <Custom_delete_swipe_btn onPress={() => {
                  rowMap[item.id]?.closeRow();
                  handle_delete(item.id);
                }} />
              </Div>
            </Div>
          )}

          leftOpenValue={75}
          rightOpenValue={-75}
        />


      </Div>
    </SafeAreaView>
  )
}
