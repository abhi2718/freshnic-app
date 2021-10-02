export const ADD_TO_CART="ADD_TO_CART";
export const REMOVE_FROM_CART="REMOVE_FROM_CART";
export const UPDATE_QTY_IN_CART="UPDATE_QTY_IN_CART";

const addToCart=item=>({type:ADD_TO_CART,payload:item});
export const removeFromCart=id=>({type:REMOVE_FROM_CART,payload:id});
export const upDateQty=item=>({type:UPDATE_QTY_IN_CART,payload:item});
export default addToCart;