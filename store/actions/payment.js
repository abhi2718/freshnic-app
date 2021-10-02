export const REQ_FOR_PAYMENT="REQ_FOR_PAYMENT";
export const REQ_FOR_PAYMENT_SUCCESS="REQ_FOR_PAYMENT_SUCCESS";
export const REQ_FOR_PAYMENT_FAIL="REQ_FOR_PAYMENT_FAIL";

const paymentAction=order=>(dispatch,getState)=>{
    dispatch({type:REQ_FOR_PAYMENT})
    const {authentication}=getState();
    const {userInfo}=authentication;
    const url="https://freshnic-api.herokuapp.com/api/payment";
    fetch(url,{
        method:"POST",
        headers:new Headers({
            'Content-Type':'application/json',
             authorization:`Bearer ${userInfo.token}`
        }),
        body:JSON.stringify({
            order_id:order._id
        })
    })
    .then(res=>{
       let promise=res.json()
       if(res.ok){
         promise.then(order=>{
            console.log(order) 
            dispatch({
              type:REQ_FOR_PAYMENT_SUCCESS,
              payload:order
            })})
       }else{
        promise.then(err=>promise.then(err=>{
            console.log(err);
            dispatch({
            type:REQ_FOR_PAYMENT_FAIL,
            payload:err
          })}))
       }
    });
}

export default paymentAction;