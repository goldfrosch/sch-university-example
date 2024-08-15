import styled from "styled-components";
import type {
  Product,
  ProductResponse,
  ReviewInfo,
} from "../../types/ProductType";
import { Hairline } from "../Common/Hairline";
import { getPriceText } from "../../utils/Price";

interface ProductInfoProps {
  product: Product;
  productImage: ProductResponse["productImages"];
  reviewInfo: ReviewInfo;
}

export const ProductInfo = ({
  product,
  productImage,
  reviewInfo,
}: ProductInfoProps) => {
  return (
    <ProductInfoLayout>
      <ProductInfoThumbnail src={productImage[0].imageUrl} />
      <ProductInfoItem>
        <p className="title">{product.productName}</p>
        <span className="price">{getPriceText(product.price)}</span>
        <div className="reviewInfo">
          <span className="reviewScore reviewText">
            <img
              className="reviewIcon"
              src="https://www.iconpacks.net/icons/5/free-icon-yellow-star-15589.png"
            />
            {reviewInfo.totalScore.toFixed(1)}
          </span>
          <span className="reviewText">/</span>
          <span className="reviewCount reviewText">
            {reviewInfo.totalCount}개
          </span>
        </div>
      </ProductInfoItem>
      <Hairline />
    </ProductInfoLayout>
  );
};

const ProductInfoLayout = styled.section``;

const ProductInfoThumbnail = styled.img`
  width: 100%;
`;

const ProductInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 16px;
  & > .title {
    font-size: 20px;
    font-weight: 700;
    color: #000000;
  }
  & > .price {
    font-size: 14px;
    font-weight: 400;
    color: #a9a9a9;
  }
  & > .reviewInfo {
    display: flex;
    align-items: center;
    gap: 4px;
    & > .reviewScore {
      display: flex;
      align-items: center;
      gap: 4px;
      & > .reviewIcon {
        width: 20px;
        height: 20px;
      }
    }
    & > .reviewText {
      font-size: 12px;
      color: #a9a9a9;
    }
  }
`;
