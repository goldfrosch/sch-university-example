import { AxiosResponse } from "axios";
import { ProductResponse } from "../types/ProductType";
import { instance } from "./Instance";

export const getProductById = (
  id: number
): Promise<AxiosResponse<ProductResponse>> => instance.get(`/product/${id}`);
