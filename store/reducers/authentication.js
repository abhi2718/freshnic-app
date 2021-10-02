import {REQ_FOR_LOGIN,REQ_FOR_LOGIN_SUCCESS,REQ_FOR_LOGIN_FAIL} from '../actions/signin';
import {REQ_FOR_SIGNUP,REQ_FOR_SIGNUP_SUCCESS,REQ_FOR_SIGNUP_FAIL} from '../actions/signup';
import {REQ_FOR_LOGOUT} from '../actions/logout';
import AsyncStorage from '@react-native-async-storage/async-storage';
const INITIAL_STATE="INITIAL_STATE";
const addUserInfo=async(key,val)=>{
   try{
      await AsyncStorage.setItem(key,JSON.stringify(val));
   }catch(e){
      console.log(e);
   }
}
const logOut=async ()=>{
    try{
      await AsyncStorage.clear();
    }catch(e){
        console.log(e);
    }
}
const authenticationReducer=(state={isLoading:false,userInfo:null,errMsg:null},action)=>{
      switch(action.type){
              case REQ_FOR_LOGIN:
              return {...state,isLoading:true,errMsg:null}
              case REQ_FOR_LOGIN_SUCCESS:
              addUserInfo("userInfo",action.payload);
                 return{
                  ...state,
                  userInfo:action.payload,
                  isLoading:false,
                  errMsg:null
               }
                 case REQ_FOR_LOGIN_FAIL:
                  return{
                      ...state,
                      userInfo:null,
                      isLoading:false,
                      errMsg:action.payload
                  }

                  case REQ_FOR_SIGNUP:
                    return{
                        ...state,
                        isLoading:true,
                        userInfo:null,
                        errMsg:null
                    }
                case REQ_FOR_SIGNUP_SUCCESS:
                    addUserInfo("userInfo",action.payload);
                    return{
                        ...state,
                        isLoading:false,
                        userInfo:action.payload,
                        errMsg:null
                    }
                case REQ_FOR_SIGNUP_FAIL:
                    return{
                        ...state,
                        isLoading:false,
                        userInfo:null,
                        errMsg:action.payload
                    }
                case INITIAL_STATE:
                    return{
                        ...state,
                        errMsg:null
                    } 
                case REQ_FOR_LOGOUT:
                    console.log(action.payload);
                    logOut();
                    return{
                        isLoading:false,
                        userInfo:null,
                        errMsg:null
                    }       
                default :
               return state;
      }
}
export default authenticationReducer;