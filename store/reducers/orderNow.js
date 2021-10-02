import { ORDER_NOW } from '../actions/orderNow';

const orderNowReducer=(state={},action)=>{
   switch(action.type){
       case ORDER_NOW:
           
         return {
             orderNow:action.payload
         }
       default:
           return state;
   }
}
export default orderNowReducer