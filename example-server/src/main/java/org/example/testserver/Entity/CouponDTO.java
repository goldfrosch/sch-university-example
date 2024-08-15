package org.example.testserver.Entity;

import lombok.Builder;
import lombok.Getter;
import org.example.testserver.Domain.CouponType;

@Getter
@Builder
public class CouponDTO {

    private Long id;

    private CouponType couponType;

    private float value;
}
