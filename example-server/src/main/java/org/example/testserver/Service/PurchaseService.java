package org.example.testserver.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.testserver.Domain.*;
import org.example.testserver.Entity.CouponDTO;
import org.example.testserver.Entity.PageDataVO;
import org.example.testserver.Entity.PurchaseLogDTO;
import org.example.testserver.Entity.PurchaseLogProductDTO;
import org.example.testserver.Repository.CouponRepository;
import org.example.testserver.Repository.PurchaseLogRepository;
import org.example.testserver.Repository.PurchaseProductLogRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PurchaseService {
    private final PurchaseLogRepository purchaseLogRepository;
    private final PurchaseProductLogRepository purchaseProductLogRepository;
    private final CouponRepository couponRepository;

    @Transactional
    public void Purchase(List<Product> products, Coupon coupon) {
        var totalPrice = products.stream().mapToInt(Product::getPrice).sum();

        if (coupon != null) {
            if (coupon.getCouponType() == CouponType.PERCENT) {
                totalPrice -= (int) (totalPrice * coupon.getValue());
            }

            if (coupon.getCouponType() == CouponType.ABSOLUTE) {
                totalPrice = Math.max(totalPrice - (int) coupon.getValue(), 0);
            }
        }

        var newPurchaseLog = PurchaseLog.builder()
                .totalPrice(totalPrice)
                .usedCoupon(coupon)
                .purchasedDate(LocalDateTime.now())
                .build();

        var productCountMap = new HashMap<Integer, Integer>();
        var productMap = new HashMap<Integer, Product>();

        purchaseLogRepository.save(newPurchaseLog);
        products.forEach((product -> {
            productCountMap.merge(Math.toIntExact(product.getId()), 1, Integer::sum);
            productMap.put(Math.toIntExact(product.getId()), product);
        }));

        productCountMap.forEach(((productId, count) -> {
            var product = productMap.get(productId);
            var newPurchaseProduct = PurchaseProductLog
                    .builder()
                    .price(product.getPrice())
                    .product(product)
                    .productName(product.getProductName())
                    .count(count)
                    .purchaseLog(newPurchaseLog)
                    .build();
            purchaseProductLogRepository.save(newPurchaseProduct);
        }));
    }

    @Transactional(readOnly = true)
    public PageDataVO<PurchaseLogDTO> getPurchasePage(Long offset, int limit) {
        List<PurchaseLogDTO> list = new ArrayList<>();
        if (offset == 0L) {
            purchaseLogRepository.findAll(limit).forEach((purchaseLog -> {
                var productList = purchaseProductLogRepository.findAllByPurchaseLog(purchaseLog);
                List<PurchaseLogProductDTO> logProductDTOS = new ArrayList<>();
                productList.forEach((purchaseProductLog -> {
                    logProductDTOS.add(PurchaseLogProductDTO.builder()
                            .id(purchaseProductLog.getId())
                            .count(purchaseProductLog.getCount())
                            .price(purchaseProductLog.getPrice())
                            .productName(purchaseProductLog.getProductName())
                            .build());
                }));

                list.add(PurchaseLogDTO.builder()
                        .id(purchaseLog.getId())
                        .totalPrice(purchaseLog.getTotalPrice())
                        .purchasedDate(purchaseLog.getPurchasedDate())
                        .usedCoupon(
                                purchaseLog.getUsedCoupon() == null ? null : CouponDTO
                                        .builder()
                                        .id(purchaseLog.getUsedCoupon().getId())
                                        .couponType(purchaseLog.getUsedCoupon().getCouponType())
                                        .value(purchaseLog.getUsedCoupon().getValue())
                                        .build())
                        .productList(logProductDTOS)
                        .build());
            }));
        } else {
            purchaseLogRepository.findAll(offset, limit).forEach((purchaseLog -> {
                var productList = purchaseProductLogRepository.findAllByPurchaseLog(purchaseLog);
                List<PurchaseLogProductDTO> logProductDTOS = new ArrayList<>();
                productList.forEach((purchaseProductLog -> {
                    logProductDTOS.add(PurchaseLogProductDTO.builder()
                            .id(purchaseProductLog.getId())
                            .count(purchaseProductLog.getCount())
                            .price(purchaseProductLog.getPrice())
                            .productName(purchaseProductLog.getProductName())
                            .build());
                }));

                list.add(PurchaseLogDTO.builder()
                        .id(purchaseLog.getId())
                        .totalPrice(purchaseLog.getTotalPrice())
                        .purchasedDate(purchaseLog.getPurchasedDate())
                        .usedCoupon(
                                purchaseLog.getUsedCoupon() == null ? null : CouponDTO
                                        .builder()
                                        .id(purchaseLog.getUsedCoupon().getId())
                                        .couponType(purchaseLog.getUsedCoupon().getCouponType())
                                        .value(purchaseLog.getUsedCoupon().getValue())
                                        .build())
                        .productList(logProductDTOS)
                        .build());
            }));
        }

        var lastIndex = list.get(list.size() - 1).getId();

        return PageDataVO.<PurchaseLogDTO>builder().list(list).hasNext(limit == list.size()).lastOffset(lastIndex).build();
    }
}
