import React, { useState } from 'react'
import { Div , Text,Button } from 'react-native-magnus'
import colors from '../../config/colors'
import { useTheme } from '../../context/ThemeContext'
import { useDispatch, useSelector } from 'react-redux'
import { remove_From_wishlist } from '../../redux/reducers/wishlistSlice'
import Creative_Header from '../../components/creative_header'
import { SwipeListView } from 'react-native-swipe-list-view';
import { useTranslation } from 'react-i18next'
import Favourite_Empty from '../../components/favourite_empty'
import Favourite_Item from '../../items/favourite_item'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function Favourite() {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const favourites = useSelector((state:any) => state.wishlist.items);
  const dispatch = useDispatch();
   const [searchQuery, setSearchQuery] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [isSelectionMode, setIsSelectionMode] = useState(false);

  const handle_delete = (id:number) => {
    dispatch(remove_From_wishlist({ id }))
  }




  const toggleSelection = (id:any) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };



   const filteredFavourites = favourites.filter((item:any) => {
        const name = i18n.language === 'en' ? item.name_en : item.name_ar;
        return name.toLowerCase().includes(searchQuery.toLowerCase());
    });


  return (
  

      <Div bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.black} h="100%">

        <Creative_Header title={t('favourites')} />

      
       {/* Content */}
                <Div flex={1} px={20} mt={100}>
                    {filteredFavourites.length > 0 ? (
                        <SwipeListView
                            data={filteredFavourites}
                            keyExtractor={(item:any, index:any) => item.id?.toString() || index.toString()}
                            renderItem={(data) => <Favourite_Item data={data} selectedItems={selectedItems} isSelectionMode={isSelectionMode} toggleSelection={toggleSelection} setIsSelectionMode={setIsSelectionMode} setSelectedItems={setSelectedItems}  />}
                            renderHiddenItem={({ item }) => (
                                // <View style={[
                                //     styles.rowBack,
                                //     {
                                //         backgroundColor: theme === 'light' ? '#FEE2E2' : '#7F1D1D',
                                //         borderRadius: 16,
                                //         marginBottom: 12,
                                //     }
                                // ]}>
                                //     <TouchableOpacity
                                //         style={styles.deleteButton}
                                //         onPress={() => handle_delete(item.id)}
                                //     >
                                //         <MaterialIcons name="delete" size={24} color="#EF4444" />
                                //         <Text style={styles.deleteText}>{t('delete')}</Text>
                                //     </TouchableOpacity>
                                //     <TouchableOpacity
                                //         style={styles.deleteButton}
                                //         onPress={() => handle_delete(item.id)}
                                //     >
                                //         <MaterialIcons name="delete" size={24} color="#EF4444" />
                                //         <Text style={styles.deleteText}>{t('delete')}</Text>
                                //     </TouchableOpacity>
                                // </View>
                                <></>
                            )}
                            leftOpenValue={100}
                            rightOpenValue={-100}
                            showsVerticalScrollIndicator={false}
                        />
                    ) : (
                       
                        <Favourite_Empty />
                    )}
                </Div>

                {/* Footer actions */}
                {favourites.length > 0 && !isSelectionMode && (
                    <Div px={20} pt={16}>
                        <Button
                            bg="transparent"
                            borderWidth={1}
                            borderColor={theme === 'light' ? '#E5E7EB' : '#4B5563'}
                            color={theme === 'light' ? '#6B7280' : '#9CA3AF'}
                            rounded={12}
                            py={14}
                            onPress={() => setIsSelectionMode(true)}
                        >
                            <Div row alignItems="center">
                                <MaterialIcons
                                    name="checklist"
                                    size={20}
                                    color={theme === 'light' ? '#6B7280' : '#9CA3AF'}
                                />
                                <Text
                                    fontSize={14}
                                    fontWeight="600"
                                    color={theme === 'light' ? '#6B7280' : '#9CA3AF'}
                                    fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                                    ml={8}
                                >
                                    {t('select_multiple')}
                                </Text>
                            </Div>
                        </Button>
                    </Div>
                )}


      </Div>
 
  )
}
