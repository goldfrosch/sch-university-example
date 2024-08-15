package org.example.testserver.Repository;

import org.example.testserver.Domain.PurchaseLog;
import org.example.testserver.Domain.PurchaseProductLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PurchaseProductLogRepository extends JpaRepository<PurchaseProductLog, Long> {
    List<PurchaseProductLog> findAllByPurchaseLog(PurchaseLog purchaseLog);
}
