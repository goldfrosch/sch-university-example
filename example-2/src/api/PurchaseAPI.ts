import { AxiosResponse } from "axios";
import { Coupon } from "../types/CouponType";
import { Product } from "../types/ProductType";
import { instance } from "./Instance";
import { PurchaseListResponse } from "../types/PurchaseType";

export const postPurchase = ({
  products,
  coupon,
}: {
  products: Product[];
  coupon: Coupon | undefined;
}) => instance.post("/purchase", { products, coupon });

export const getPurchaseList = ({
  offset,
  limit = 15,
}: {
  offset: number;
  limit?: number;
}): Promise<AxiosResponse<PurchaseListResponse>> =>
  instance.get(`/purchase/list?offset=${offset}&limit=${limit}`);
