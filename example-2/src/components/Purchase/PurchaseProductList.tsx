import styled from "styled-components";
import { useCart } from "../../hooks/UseCart";
import { getPriceText } from "../../utils/Price";

const PurchaseProductListLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  height: 40vh;
  overflow-y: auto;

  & > .title {
    font-size: 24px;
    font-weight: 700;

    margin-bottom: 16px;
  }
  margin-bottom: 32px;
`;

const PurchaseProductItem = styled.div`
  padding: 16px;
  border: 1px solid #a9a9a9;

  display: flex;
  align-items: center;
  justify-content: space-between;

  & > .name {
    font-size: 20;
    font-weight: 700;
  }

  & > .price {
    font-size: 14;
    gap: 2px;
    color: "#a9a9a9";
  }
`;

export const PurchaseProductList = () => {
  const { cartProductCountData, cartProductDataById } = useCart();

  return (
    <PurchaseProductListLayout>
      <h2 className="title">상품 구매 목록</h2>
      {Object.keys(cartProductDataById).map((key) => {
        const product = cartProductDataById[Number(key)];
        return (
          <PurchaseProductItem key={product.id}>
            <p className="name">
              {product.productName} x{cartProductCountData[product.id]}
            </p>
            <div className="price">
              {getPriceText(product.price * cartProductCountData[product.id])}
            </div>
          </PurchaseProductItem>
        );
      })}
    </PurchaseProductListLayout>
  );
};
