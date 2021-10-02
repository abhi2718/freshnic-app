import {REQ_FOR_ORDER_HISTORY,REQ_FOR_ORDER_HISTORY_SUCESS,REQ_FOR_ORDER_HISTORY_FAIL} from '../actions/orderHistory';
const OrderHistoryReducer=(state={loading:false,errMsg:null,myOrders:[]},action)=>{
    switch(action.type){
        case REQ_FOR_ORDER_HISTORY:
            return{
                ...state,
                loading:true
            }
        case REQ_FOR_ORDER_HISTORY_SUCESS:
            return{
                ...state,
                loading:false,
                myOrders:action.payload
            }
        case REQ_FOR_ORDER_HISTORY_FAIL:
            return{
                ...state,
                loading:false,
                errMsg:action.payload
            }
        default:
         return state;
    }
}
export default OrderHistoryReducer;