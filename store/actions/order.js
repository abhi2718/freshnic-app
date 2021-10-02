export const REQ_TO_PLACE_ORDER="REQ_TO_PLACE_ORDER";
export const REQ_TO_PLACE_ORDER_SUCCESS="REQ_TO_PLACE_ORDER_SUCCESS";
export const REQ_TO_PLACE_ORDER_FAIL="REQ_TO_PLACE_ORDER_FAIL";

const placeOrder=(taxPrice,itemsPrice,totalPrice,path)=>(dispatch,getState)=>{
    dispatch({type:REQ_TO_PLACE_ORDER})
    const {authentication,cart,shipping,orderNow}=getState();
    const {userInfo}=authentication;
    const {cartItem}=cart;
    const {shipTo}=shipping;
    const ordernow=orderNow.orderNow;
    const itemInBasket=path=="orderNow"?[{...ordernow}]:cartItem;
    const orderItems=itemInBasket.map(item=>({
        name:item.title,
        qty:item.qty,
        image:item.imageUrl,
        price:item.price,
        product_Id:item.id
    }))
    const url="https://freshnic-api.herokuapp.com/api/order";
    fetch(url,{
        method:"POST",
        headers:new Headers({
            'Content-Type':'application/json',
             authorization:`Bearer ${userInfo.token}`
        }),
        body:JSON.stringify({
            orderItems,
            shippingAddress:shipTo,
            user:userInfo.id,
            taxPrice,
            itemsPrice,
            totalPrice
        })
    })
    .then(res=>{
       let promise=res.json()
       if(res.ok){
         if(path!="orderNow"){
          dispatch({type:"INITIAL_STATE_OF_CART"});
         }
         promise.then(order=>dispatch({
           type:REQ_TO_PLACE_ORDER_SUCCESS,
           payload:order
         }))
       }else{
        promise.then(err=>dispatch({
          type:REQ_TO_PLACE_ORDER_FAIL,
          payload:err
        }))
       }
    });
}
export default placeOrder;