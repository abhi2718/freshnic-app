export const REQ_FOR_LOGIN=" REQ_FOR_LOGIN";
export const REQ_FOR_LOGIN_SUCCESS="REQ_FOR_LOGIN_SUCCESS";
export const REQ_FOR_LOGIN_FAIL="REQ_FOR_LOGIN_FAIL";

const logIn=userInfo=>dispatch=>{
 dispatch({type:REQ_FOR_LOGIN});
 const url="https://freshnic-api.herokuapp.com/api/login";
fetch(url,{
    method:"POST",
    headers:new Headers({
        'Content-Type':'application/json'
    }),
    body:JSON.stringify(userInfo)
})
.then(res=>{
    let promise=res.json();
    if(res.ok){
        promise.then(userInfo=>dispatch({type:REQ_FOR_LOGIN_SUCCESS,payload:userInfo}));
    }else{
        promise.then(err=>dispatch({type:REQ_FOR_LOGIN_FAIL,payload:err}));
    }
})
}
export default logIn;