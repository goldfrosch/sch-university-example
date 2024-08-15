import { AxiosResponse } from "axios";
import { instance } from "./Instance";
import { GetCouponsResponse } from "../types/CouponType";

export const getCoupons = (): Promise<AxiosResponse<GetCouponsResponse>> =>
  instance.get("/coupons");
