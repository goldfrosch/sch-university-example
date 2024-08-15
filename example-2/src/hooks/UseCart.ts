import { useEffect, useMemo, useState } from "react";
import { Product } from "../types/ProductType";

export const useCart = () => {
  const [cart, setCart] = useState<Product[]>([]);

  const addCart = (product: Product) => {
    setCart((prev) => {
      const NewData = [...prev, product];
      localStorage.setItem("cart-list", JSON.stringify(NewData));
      return NewData;
    });
  };

  const clearCart = () => {
    setCart(() => []);
    localStorage.setItem("cart-list", JSON.stringify([]));
  };

  const cartProductCountData: { [key: number]: number } = useMemo(() => {
    let countData: { [key: number]: number } = {};
    cart.forEach((product) => {
      countData[product.id] = countData[product.id]
        ? countData[product.id] + 1
        : 1;
    });
    return countData;
  }, [cart]);

  const cartProductDataById: { [key: number]: Product } = useMemo(() => {
    let cartData: { [key: number]: Product } = {};
    cart.forEach((product) => {
      if (cartData[product.id]) {
        return;
      }
      cartData[product.id] = product;
    });
    return cartData;
  }, [cart]);

  const totalPrice: number = useMemo(() => {
    return Object.keys(cartProductCountData).reduce((acc, cur) => {
      return (
        acc +
        cartProductCountData[Number(cur)] *
          cartProductDataById[Number(cur)].price
      );
    }, 0);
  }, [cart]);

  useEffect(() => {
    const newData: Product[] = JSON.parse(
      localStorage.getItem("cart-list") ?? "[]"
    );
    setCart(newData);
  }, []);

  return {
    cart,
    cartProductCountData,
    cartProductDataById,
    totalPrice,
    addCart,
    clearCart,
  };
};
