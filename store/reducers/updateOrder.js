import {REQ_FOR_UPDATE_IN_ORDER,REQ_FOR_UPDATE_IN_ORDER_SUCCESS,REQ_FOR_UPDATE_IN_ORDER_FAIL} from '../actions/updateOrder';

const updateOrderReducer=(state={loading:false,updatedOrder:null,errMsg:null},action)=>{
    switch(action.type){
        case REQ_FOR_UPDATE_IN_ORDER:
            return{
                ...state,
                loading:true
            }
        case REQ_FOR_UPDATE_IN_ORDER_SUCCESS:
            return{
                ...state,
                loading:false,
                updatedOrder:action.payload
            }
        case REQ_FOR_UPDATE_IN_ORDER_FAIL:
            return{
                ...state,
                loading:false,
                updatedOrder:null,
                errMsg:action.payload
            }
        case "INITIAL_STATE_OF_UPDATED_ORDER":
            return{
                ...state,
                loading:false,
                updatedOrder:null,
                errMsg:null
            }
        default :
         return state;
    }
}

export default updateOrderReducer;