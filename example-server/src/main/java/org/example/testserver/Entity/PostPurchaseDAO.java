package org.example.testserver.Entity;

import org.example.testserver.Domain.Coupon;
import org.example.testserver.Domain.Product;

import java.util.List;

public record PostPurchaseDAO(List<Product> products, Coupon coupon) {
}
