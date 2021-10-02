import {ADD_TO_CART,REMOVE_FROM_CART,UPDATE_QTY_IN_CART} from '../actions/cart';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState={
    cartItem:[],
  }

const addToCart=async(key,val)=>{
   try{
      await AsyncStorage.setItem(key,val);
   }catch(e){
      console.log(e);
   }
}
const clearCartArray=async(key,val)=>{
    try{
      await AsyncStorage.setItem(key,val)
    }catch(e){
        console.log(e);
    }
}
const cartReducer=(state=initialState,action)=>{
    switch(action.type){
        case ADD_TO_CART:
            const {payload}=action;
            const {id}=payload;
            payload.qty===""?payload.qty="1":null
            const filterningItems=state.cartItem.filter(item=>item.id!=id);
            addToCart("cartItem",JSON.stringify([...filterningItems,payload]));
            return{
                ...state,
                cartItem:[...filterningItems,payload]
            }

            case REMOVE_FROM_CART:
                const pid=action.payload;
                const reamaningItems=state.cartItem.filter(item=>item.id!=pid);
                addToCart("cartItem",JSON.stringify([...reamaningItems]));
                return{
                    ...state,
                    cartItem:[...reamaningItems]
                }
           
             case UPDATE_QTY_IN_CART:
                const updateQtyOfItem=state.cartItem.map(item=>item.id==action.payload.id?action.payload:item);
                addToCart("cartItem",JSON.stringify([...updateQtyOfItem]));
                return {
                         ...state,
                         cartItem:[...updateQtyOfItem]
                }
             case "INITIAL_STATE_OF_CART":
                clearCartArray("cartItem",JSON.stringify([]));
                 return{
                     ...initialState
                 }
            default :
            return state;
    }
}
export default cartReducer;