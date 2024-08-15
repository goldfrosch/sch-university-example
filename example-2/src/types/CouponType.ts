export type GetCouponsResponse = Coupon[];

export type Coupon = {
  id: number;
  couponType: "PERCENT" | "ABSOLUTE";
  value: number;
};
