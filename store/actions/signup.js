export const REQ_FOR_SIGNUP="REQ_FOR_SIGNUP";
export const REQ_FOR_SIGNUP_SUCCESS="REQ_FOR_SIGNUP_SUCCESS";
export const REQ_FOR_SIGNUP_FAIL="REQ_FOR_SIGNUP_FAIL";

const register=userInfo=>dispatch=>{
    dispatch({type:REQ_FOR_SIGNUP})
    const url="https://freshnic-api.herokuapp.com/api/register";
    fetch(url,{
        method:"POST",
        headers:new Headers({
            'Content-type':'application/json'
        }),
        body:JSON.stringify(userInfo)
    }).then(res=>{
        let promise=res.json();
        if(res.ok){
           promise.then(info=>dispatch({
               type:REQ_FOR_SIGNUP_SUCCESS,
               payload:info
           }))
        }else{
            promise.then(err=>dispatch({
                type:REQ_FOR_SIGNUP_FAIL,
                payload:err
            }))
        }
    })
}

export default register;