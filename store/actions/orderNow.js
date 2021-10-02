export const ORDER_NOW="ORDER_NOW";

const orderNow=item=>({type:ORDER_NOW,payload:item});
export default orderNow;