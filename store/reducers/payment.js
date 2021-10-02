import {REQ_FOR_PAYMENT,REQ_FOR_PAYMENT_SUCCESS,REQ_FOR_PAYMENT_FAIL} from '../actions/payment';

const paymentReducer=(state={payment:null,errMsg:null,loading:false},action)=>{
    switch(action.type){
        case REQ_FOR_PAYMENT:
            return{
                ...state,
                loading:true
            }
        case REQ_FOR_PAYMENT_SUCCESS:
            return{
                ...state,
                loading:false,
                payment:action.payload
            }
        case REQ_FOR_PAYMENT_FAIL:
            return{
                ...state,
                loading:false,
                errMsg:action.payload
            }
        case "INITIAL_STATE_OF_PAYMENT":
            return{
                payment:null,
                errMsg:null,
                loading:false
            }
        default :
         return state;
    }
}

export default paymentReducer;