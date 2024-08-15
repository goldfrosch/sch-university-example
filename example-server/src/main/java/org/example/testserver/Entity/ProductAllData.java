package org.example.testserver.Entity;

import org.example.testserver.Domain.Product;
import org.example.testserver.Domain.ProductImages;

import java.util.List;

public record ProductAllData(Product product, List<ProductImages> productImages, ProductReviewData reviewData) {
}
