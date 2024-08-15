import styled from "styled-components";
import type { Product } from "../../types/ProductType";
import { useCart } from "../../hooks/UseCart";
import { MouseEventHandler } from "react";
import { useNavigate } from "react-router";

interface ProductBuyDockProps {
  product: Product;
}

export const ProductBuyDock = ({ product }: ProductBuyDockProps) => {
  const { cart, addCart } = useCart();
  const navigate = useNavigate();

  const handleClickAddCart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    addCart(product);
  };

  const handleClickPurchase: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    navigate("/purchase");
  };

  return (
    <ProductBuyDockLayout>
      <DockButton onClick={handleClickAddCart}>
        장바구니 담기 {cart.length > 0 && `(${cart.length})`}
      </DockButton>
      <DockButton onClick={handleClickPurchase}>구매하기</DockButton>
    </ProductBuyDockLayout>
  );
};

const ProductBuyDockLayout = styled.div`
  position: fixed;
  bottom: 0;

  width: 100%;
  max-width: 400px;

  background-color: #01abff;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const DockButton = styled.button`
  border: 0;
  background-color: white;
  flex: 1;
  height: 100%;
  margin: 8px;
  padding: 12px;

  font-size: 16px;
  font-weight: 700;
  color: black;

  cursor: pointer;
`;
