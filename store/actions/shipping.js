export const SHIPPING_ADDRESS="SHIPPING_ADDRESS";
const shipping=shipTo=>dispatch=>{
    dispatch({
    type:SHIPPING_ADDRESS,
    payload:shipTo
})}
export default shipping;