export const REQ_FOR_UPDATE_IN_ORDER="REQ_FOR_UPDATE_IN_ORDER";
export const REQ_FOR_UPDATE_IN_ORDER_SUCCESS="REQ_FOR_UPDATE_IN_ORDER_SUCCESS";
export const REQ_FOR_UPDATE_IN_ORDER_FAIL="REQ_FOR_UPDATE_IN_ORDER_FAIL";

  const paymentSuccess=(order_id,payment_Id)=>(dispatch,getState)=>{
    dispatch({type:REQ_FOR_UPDATE_IN_ORDER})
      const {authentication}=getState();
      const {userInfo}=authentication;
      const url="https://freshnic-api.herokuapp.com/api/payment/success";
      fetch(url,{
          method:"PUT",
          headers:new Headers({
              'Content-Type':'application/json',
               authorization:`Bearer ${userInfo.token}`
          }),
          body:JSON.stringify({
              order_id,
              payment_Id
          })
      })
      .then(res=>{
         let promise=res.json()
         if(res.ok){
           promise.then(order=>{
            console.log('orders',order) 
            dispatch({
            type: REQ_FOR_UPDATE_IN_ORDER_SUCCESS,
            payload:order
          })})
         }else{
          promise.then(err=>dispatch({
            type:REQ_FOR_UPDATE_IN_ORDER_FAIL,
            payload:err
          }))
         }
      });
  }

  export default paymentSuccess;