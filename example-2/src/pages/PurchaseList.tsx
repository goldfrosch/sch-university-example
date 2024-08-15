import { useEffect, useRef, useState } from "react";
import { getPurchaseList } from "../api/PurchaseAPI";
import { PurchaseLog } from "../types/PurchaseType";
import { PurchaseItem } from "../components/Purchase/PurchaseItem";
import styled from "styled-components";

export const PurchaseList = () => {
  const [purchaseList, setPurchaseList] = useState<PurchaseLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const lastOffset = useRef(0);
  const loadingRef = useRef<HTMLDivElement>(null);
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        getPurchaseListData();
      }
    },
    {
      threshold: 0.5,
    }
  );

  const getPurchaseListData = () => {
    if (isEnd || isLoading) {
      return;
    }
    setIsLoading(true);
    getPurchaseList({ offset: lastOffset.current })
      .then((res) => {
        setPurchaseList((prev) => [...prev, ...res.data.list]);
        lastOffset.current = res.data.lastOffset;
        setIsEnd(!res.data.hasNext);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      observer?.disconnect();
    };
  }, [loadingRef]);

  return (
    <PurchaseListLayout>
      {purchaseList.map((log) => (
        <PurchaseItem key={log.id} item={log} />
      ))}
      {!isEnd && <PurchaseLoadingArea ref={loadingRef} />}
    </PurchaseListLayout>
  );
};

const PurchaseListLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 16px;
`;

const PurchaseLoadingArea = styled.div`
  height: 36px;
`;
