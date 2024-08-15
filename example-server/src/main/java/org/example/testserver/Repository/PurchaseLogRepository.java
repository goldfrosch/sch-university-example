package org.example.testserver.Repository;

import org.example.testserver.Domain.PurchaseLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PurchaseLogRepository extends JpaRepository<PurchaseLog, Long> {
    @Query(value = "select pl from PurchaseLog pl where pl.id < :offset order by pl.id desc limit :limit")
    List<PurchaseLog> findAll(@Param("offset") Long offset, @Param("limit") int limit);

    @Query(value = "select pl from PurchaseLog pl order by pl.id desc limit :limit")
    List<PurchaseLog> findAll(@Param("limit") int limit);
}
