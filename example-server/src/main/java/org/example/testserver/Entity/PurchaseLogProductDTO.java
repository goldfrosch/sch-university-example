package org.example.testserver.Entity;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PurchaseLogProductDTO {

    private Long id;

    private int price;

    private int count;

    private String productName;
}
