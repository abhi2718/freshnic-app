import {ADD_TO_WISHLIST,DELETE_FROM_WISHLIST} from '../actions/wishlist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const addToWishList=async(key,val)=>{
    try{
       await AsyncStorage.setItem(key,val);
    }catch(e){
       console.log(e);
    }
 }

const wishlistReducer=(state={wishListItems:[]},action)=>{
    switch(action.type){
        case ADD_TO_WISHLIST:
            const {payload}=action;
            const {id}=payload;
            payload.qty===""?payload.qty="1":null
            const filterningItems=state.wishListItems.filter(item=>item.id!=id);
            addToWishList("wishListItems",JSON.stringify([...filterningItems,payload]));
            return{
                ...state,
                wishListItems:[...filterningItems,payload]
            }
        case DELETE_FROM_WISHLIST:
            const pid=action.payload;
            const remaningItems=state.wishListItems.filter(item=>item.id!=pid);
            addToWishList("wishListItems",JSON.stringify([... remaningItems]));
            return{
                ...state,
                wishListItems:[... remaningItems]
            }
         default:
        return state;
    }
}

export default wishlistReducer;