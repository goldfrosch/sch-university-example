package org.example.testserver.Entity;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class PurchaseLogDTO {
    private Long id;

    private int totalPrice;

    private LocalDateTime purchasedDate;

    private CouponDTO usedCoupon;

    private List<PurchaseLogProductDTO> productList;
}
