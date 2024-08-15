import { useParams } from "react-router";
import { getProductById } from "../api/ProductAPI";
import { useEffect, useState } from "react";
import { ProductResponse } from "../types/ProductType";
import { ProductInfo } from "../components/Product/ProductInfo";
import { ProductBuyDock } from "../components/Product/ProductBuyDock";

export const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductResponse>();

  useEffect(() => {
    getProductById(Number(id))
      .then((res) => {
        setProduct(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [id]);

  if (!product) {
    return <div>잠시만 기달려주세요</div>;
  }

  return (
    <>
      <ProductInfo
        product={product.product}
        productImage={product.productImages}
        reviewInfo={product.reviewData}
      />
      <ProductBuyDock product={product.product} />
    </>
  );
};
