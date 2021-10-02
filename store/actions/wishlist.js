export const ADD_TO_WISHLIST="ADD_TO_WISHLIST";
export const DELETE_FROM_WISHLIST="DELETE_FROM_WISHLIST";
const addToWishList=item=>({type:ADD_TO_WISHLIST,payload:item});
export const deleteFromWishList=id=>({type:DELETE_FROM_WISHLIST,payload:id});
export default addToWishList;