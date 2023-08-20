import { ReactNode, createContext, useContext, useState } from "react";
import ShopCart from "../components/ShopCart";
import {UseLocalStorage} from "../hooks/UseLocalStorage";

type ShopCartContextProps = {
  children: ReactNode;
};
type CartItem = {
  id: number;
  quantity: number;
};

type ShopCartContext = {
  openCart:()=>void;
  closeCart:()=>void;  
  getQuantity: (id: number) => number;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeQuantity: (id: number) => void;
  cartQuantity:number;
  cartItems:CartItem[];
};
const ShopCartContext = createContext({} as ShopCartContext);

export const useShopCart = () => useContext(ShopCartContext);

export default function ShopCartProvider({ children }: ShopCartContextProps) {
  
  const [isOpen, setIsOpen]= useState(false);  
  const [cartItems, setCartItems] = UseLocalStorage<CartItem[]>("shop-cart",[]);

  const cartQuantity = cartItems.reduce(
    (quantity,item)=> item.quantity + quantity,0
  )
  
  const openCart= () => setIsOpen(true);
  const closeCart= () => setIsOpen(false);
  function getQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }
  function increaseQuantity(id: number) {
    setCartItems((curritems) => {
      if (curritems.find((item) => item.id === id) == null) {
        return [...curritems, { id, quantity: 1 }];
      } else {
        return curritems.map((item) => {
          if (item.id !== id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decreaseQuantity(id: number) {
    setCartItems((curritems) => {
      if (curritems.find((item) => item.id === id)?.quantity  === 1) {
        return curritems.filter(item => item.id !==id)
      } else {
        return curritems.map((item) => {
          if (item.id !== id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeQuantity (id:number){
    setCartItems(currItems =>{
        return currItems.filter(item => item.id !==id)
    })
  }
  return (
    <ShopCartContext.Provider
      value={{
        getQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeQuantity,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <ShopCart isOpen={isOpen}/>
    </ShopCartContext.Provider>
  );
}
