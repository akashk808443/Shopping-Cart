import { Offcanvas, Stack } from "react-bootstrap";
import { useShopCart } from "../context/ShopCartContext";
import CartItem from "./CartItem";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

type ShopCartProps = {
  isOpen: boolean;
};
const ShopCart = ({ isOpen }: ShopCartProps) => {
  const { closeCart, cartItems } = useShopCart();
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            { formatCurrency (cartItems.reduce((Total, CartItem) => {
              const item = storeItems.find((i) => i.id === CartItem.id);
              return Total + (item?.price || 0) * CartItem.quantity;
            }, 0))}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShopCart;
