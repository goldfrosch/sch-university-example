import { useState } from "react";
import { CouponSelect } from "../components/Purchase/CouponSelect";
import type { Coupon } from "../types/CouponType";
import styled from "styled-components";
import { PurchaseProductList } from "../components/Purchase/PurchaseProductList";
import { BottomDock } from "../components/Common/BottomDock";
import { PurchaseProductResult } from "../components/Purchase/PurchaseProductResult";
import { useCart } from "../hooks/UseCart";
import { postPurchase } from "../api/PurchaseAPI";
import { useNavigate } from "react-router";

const PurchaseLayout = styled.div`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
`;

export const Purchase = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon>();

  const handleChangeSelectedCoupon = (coupon?: Coupon) => {
    setSelectedCoupon(coupon);
  };

  const handlePurchase = () => {
    postPurchase({ products: cart, coupon: selectedCoupon })
      .then(() => {
        clearCart();
        navigate("/", { replace: true });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <>
      <PurchaseLayout>
        <PurchaseProductList />
        <CouponSelect
          selectedCoupon={selectedCoupon}
          changeCoupon={handleChangeSelectedCoupon}
        />
        <PurchaseProductResult coupon={selectedCoupon} />
      </PurchaseLayout>
      <BottomDock onClick={handlePurchase}>구매하기</BottomDock>
    </>
  );
};
