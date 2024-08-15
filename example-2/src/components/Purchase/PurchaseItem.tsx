import styled from "styled-components";
import type { PurchaseLog } from "../../types/PurchaseType";
import { getPriceText } from "../../utils/Price";

interface PurchaseItemProps {
  item: PurchaseLog;
}

export const PurchaseItem = ({ item }: PurchaseItemProps) => {
  const getPurchasedTitle = (): string => {
    if (item.productList.length === 0) {
      return "유실된 거래 내역";
    }

    return `${item.productList[0].productName}${
      item.productList.length >= 2 ? ` 외 ${item.productList.length - 1}개` : ""
    }`;
  };

  return (
    <PurchaseItemLayout>
      <PurchaseItemTitle>{getPurchasedTitle()}</PurchaseItemTitle>
      <PurchaseItemPriceText>
        {getPriceText(item.totalPrice)}
      </PurchaseItemPriceText>
    </PurchaseItemLayout>
  );
};

const PurchaseItemLayout = styled.div`
  padding: 16px;

  border-radius: 8px;
  border: 1px solid #a9a9a9;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PurchaseItemTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
`;

const PurchaseItemPriceText = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #a9a9a9;
`;
