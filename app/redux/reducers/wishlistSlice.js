import { createSlice } from '@reduxjs/toolkit'
import { Toast } from 'toastify-react-native'
import i18n from 'i18next';

const initialState = {
  items: [],
};


export const wishlistSlice = createSlice({

  

  name: 'wishlist',
  initialState,
  reducers: {
    add_To_wishlist: (state, action) => {
      const itemToAdd = action.payload;
      

      // Check if the item already exists in the wishlist
      const isItemAlreadyInWishlist = state.items.some(
        (item) => item.id === itemToAdd.id
      );

      if (isItemAlreadyInWishlist) {
        state.items = state.items.filter((item) => item.id !== itemToAdd.id);

       
        Toast.show({
          type: 'info',
          text1: i18n.t('removed-from-favourite'),
          position: 'bottom',
          duration: 1000
        });
      } else {
        // Add item to the wishlist if it's not already there
        state.items.push(itemToAdd);

        
        Toast.show({
          type: 'success',
          text1: i18n.t('added-to-favourite'),
          position: 'bottom',
          duration: 1000
        });
      }
    },
    // add_To_wishlist: (state, action) => {
    //   const itemToAdd = action.payload;

    //   // Check if the item already exists in the wishlist
    //   const isItemAlreadyInWishlist = state.items.some(
    //     (item) => item.id === itemToAdd.id 
    //   );


    //   if (!isItemAlreadyInWishlist) {
    //     state.items.push(itemToAdd);

    //   } else {
    //     console.log("Item already exists in the wishlist")
    //   }
    // },

    // Remove item from wishlist
    remove_From_wishlist: (state, action) => {

      state.items = state.items.filter(
        (item) => item.id !== action.payload.id
      );

    }

  },
})


export const { add_To_wishlist, remove_From_wishlist } = wishlistSlice.actions

export default wishlistSlice.reducer