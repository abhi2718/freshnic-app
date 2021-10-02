export const REQ_FOR_PRODUCTS="REQ_FOR_PRODUCTS";
export const REQ_SUCCESS="REQ_SUCCESS";
export const REQ_FAIL="REQ_FAIL";

const getProducts=()=>dispatch=>{
    dispatch({type:REQ_FOR_PRODUCTS})
    const url="https://freshnic-api.herokuapp.com/api/products";
    fetch(url)
    .then(res=>{
       let promise=res.json()
       if(res.ok){
         promise.then(products=>dispatch({
           type:REQ_SUCCESS,
           payload:products
         }))
       }else{
        promise.then(err=>dispatch({
          type:REQ_FAIL,
          payload:err
        }))
       }
    });
}

export default getProducts;