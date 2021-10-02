export  const REQ_FOR_ORDER_HISTORY="REQ_FOR_ORDER_HISTORY";
export  const REQ_FOR_ORDER_HISTORY_SUCESS="REQ_FOR_ORDER_HISTORY_SUCESS";
export  const REQ_FOR_ORDER_HISTORY_FAIL="REQ_FOR_ORDER_HISTORY_FAIL";

const orderHistory=()=>(dispatch,getState)=>{
    dispatch({type:REQ_FOR_ORDER_HISTORY})
    const {authentication}=getState();
    const {userInfo}=authentication;
    console.log(userInfo)
    const url="https://freshnic-api.herokuapp.com/api/myorders";
    fetch(url,{
        method:"POST",
        headers:new Headers({
            'Content-Type':'application/json',
             authorization:`Bearer ${userInfo.token}`
        }),
        body:JSON.stringify({
          "id":userInfo.id
        })
    })
    .then(res=>{
       let promise=res.json()
       if(res.ok){
         promise.then(orders=>dispatch({
           type:REQ_FOR_ORDER_HISTORY_SUCESS,
           payload:orders
         }))
       }else{
        promise.then(err=>dispatch({
          type:REQ_FOR_ORDER_HISTORY_FAIL,
          payload:err
        }))
       }
    });
}
export default orderHistory;