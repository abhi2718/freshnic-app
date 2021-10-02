import {REQ_FOR_PRODUCTS,REQ_SUCCESS,REQ_FAIL} from '../actions/products';
const initialState={
    availableProducts:[],
    isLoading:false
   }


const productReducer=(state=initialState,action)=>{
    
    switch(action.type){
        case REQ_FOR_PRODUCTS:
         return{
             ...state,
             isLoading:true
         }
         case REQ_SUCCESS:
         return {
             isLoading:false,
             availableProducts:action.payload
         }
         case REQ_FAIL:
             return{
                isLoading:false,
                errMsg:action.payload
             }
        default:
            return state;
    }
}

export default productReducer;