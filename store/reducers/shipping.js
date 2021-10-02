import {SHIPPING_ADDRESS} from '../actions/shipping';
import AsyncStorage from '@react-native-async-storage/async-storage';
const shipTo=async(key,val)=>{
    try{
       await AsyncStorage.setItem(key,val);
    }catch(e){
       console.log(e);
    }
 }
const shippingReducer=(state={shipping:null},action)=>{
    switch(action.type){
        case SHIPPING_ADDRESS:
         shipTo('shipping',JSON.stringify(action.payload))
         return{
             ...state,
             shipTo:action.payload
         }
        default:
        return state
    }
}
export default shippingReducer;