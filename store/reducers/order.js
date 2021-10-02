import {REQ_TO_PLACE_ORDER,REQ_TO_PLACE_ORDER_SUCCESS,REQ_TO_PLACE_ORDER_FAIL} from '../actions/order';

const placeOrderReducer=(state={loading:false,order:null,errMsg:null},action)=>{
    switch(action.type){
        case REQ_TO_PLACE_ORDER:
            return{
                ...state,
                loading:true
            }
        case REQ_TO_PLACE_ORDER_SUCCESS:
            return{
                ...state,
                loading:false,
                order:action.payload
            }
        case REQ_TO_PLACE_ORDER_FAIL:
            return{
                ...state,
                loading:false,
                order:null,
                errMsg:action.payload
            }
        case "INITIAL_STATE_OF_ORDER":
            return{
                ...state,
                loading:false,
                order:null,
                errMsg:null
            }
        default :
         return state;
    }
}

export default  placeOrderReducer;