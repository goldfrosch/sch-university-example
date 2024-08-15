import styled from "styled-components";
import { useCart } from "../../hooks/UseCart";
import { getPriceText } from "../../utils/Price";
import { Coupon } from "../../types/CouponType";

const PurchasePriceTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
`;

interface PurchaseProductResultProps {
  coupon: Coupon | undefined;
}

export const PurchaseProductResult = ({
  coupon,
}: PurchaseProductResultProps) => {
  const { totalPrice } = useCart();

  const SaledPrice = (): number => {
    if (!coupon) {
      return 0;
    }
    if (coupon.couponType === "PERCENT") {
      return totalPrice * coupon.value;
    }
    if (coupon.couponType === "ABSOLUTE") {
      return Math.min(totalPrice, coupon.value);
    }
    return 0;
  };

  return (
    <>
      <PurchasePriceTitle>총 결제금액</PurchasePriceTitle>
      <div>
        <p>원 금액: {getPriceText(totalPrice)}</p>
        <p>할인 금액: {getPriceText(SaledPrice())}</p>
        <p>총 금액: {getPriceText(Math.max(totalPrice - SaledPrice(), 0))}</p>
      </div>
    </>
  );
};
