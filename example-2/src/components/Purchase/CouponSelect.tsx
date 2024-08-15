import { MouseEvent, useEffect, useState } from "react";
import type { Coupon } from "../../types/CouponType";
import { getCoupons } from "../../api/CouponAPI";
import styled from "styled-components";
import { getPriceText } from "../../utils/Price";

const PurchaseCouponTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;

  margin-bottom: 16px;
`;

const PurchaseCurrentCoupon = styled.div`
  padding: 16px;
  width: 100%;

  border: 1px solid #a9a9a9;
  position: relative;
  box-sizing: border-box;

  margin-bottom: 32px;
`;

const PurchaseCouponSelector = styled.div`
  width: 100%;
  border: 1px solid #a9a9a9;
  background-color: #ffffff;
  position: absolute;

  top: 60px;
  left: -1px;
  z-index: 1;
`;

const PurchaseCouponSelectOption = styled.div`
  padding: 16px;
  border-bottom: 1px solid #eaeaea;
`;

interface CouponSelectProps {
  selectedCoupon: Coupon | undefined;
  changeCoupon: (coupon?: Coupon) => void;
}

export const CouponSelect = ({
  selectedCoupon,
  changeCoupon,
}: CouponSelectProps) => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isOpenSelector, setIsOpenSelector] = useState(false);

  const handleToggleSelect = () => {
    setIsOpenSelector(!isOpenSelector);
  };

  const handleChangeSelectCoupon =
    (e: MouseEvent<HTMLDivElement>) => (coupon?: Coupon) => {
      e.stopPropagation();
      changeCoupon(coupon);
      setIsOpenSelector(false);
    };

  const getCouponTitle = (coupon: Coupon | undefined) => {
    if (!coupon) return "쿠폰 미선택";
    if (coupon.couponType === "PERCENT") return `${coupon.value * 100}% 할인`;
    if (coupon.couponType === "ABSOLUTE")
      return `${getPriceText(coupon.value)} 할인`;

    return "알수없는 쿠폰";
  };

  useEffect(() => {
    getCoupons()
      .then((res) => {
        setCoupons(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <>
      <PurchaseCouponTitle>쿠폰 선택란</PurchaseCouponTitle>
      <PurchaseCurrentCoupon onClick={handleToggleSelect}>
        {getCouponTitle(selectedCoupon)}
        {isOpenSelector && (
          <PurchaseCouponSelector>
            <PurchaseCouponSelectOption
              onClick={(e) => handleChangeSelectCoupon(e)()}
            >
              쿠폰 미선택
            </PurchaseCouponSelectOption>
            {coupons.map((coupon) => (
              <PurchaseCouponSelectOption
                key={coupon.id}
                onClick={(e) => handleChangeSelectCoupon(e)(coupon)}
              >
                {getCouponTitle(coupon)}
              </PurchaseCouponSelectOption>
            ))}
          </PurchaseCouponSelector>
        )}
      </PurchaseCurrentCoupon>
    </>
  );
};
