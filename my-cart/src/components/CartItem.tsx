import { useShopCart } from "../context/ShopCartContext";
import storeItems from "../data/items.json";
import {Stack ,Button} from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps={
    id:number;
    quantity:number;
}

const CartItem = ({id,quantity}:CartItemProps) => {
    const {removeQuantity}= useShopCart();
    const item = storeItems.find(i => i.id ===id)
    if(item == null) return null
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img src={item.imgUrl} 
        style={{width:"125px",height:"75px", objectFit:"cover"}}
      />
      <div className="me-auto">
        {item.name} {quantity > 1 && <span className="text-muted" style={{fontSize:".65rem"}}>x{quantity}</span>}
      </div>
      <div className="text-muted" style={{fontSize:".75rem"}}>
         {item.price}
      </div>
      <div>
         {formatCurrency(item.price * quantity )}
      </div>
      <Button variant="outline-danger" size="sm" onClick = { () => removeQuantity(item.id)}>&times;</Button>

    </Stack>
  )
}

export default CartItem