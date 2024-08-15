import { Coupon } from "./CouponType";

export type PurchaseListResponse = {
  lastOffset: number;
  hasNext: boolean;
  list: PurchaseLog[];
};

export type PurchaseLog = {
  id: number;
  totalPrice: number;
  purchasedDate: string;
  usedCoupon: Coupon;
  productList: {
    id: number;
    price: number;
    count: number;
    productName: string;
  }[];
};
