package org.example.testserver.Repository;

import org.example.testserver.Domain.Product;
import org.example.testserver.Domain.ProductReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductReviewRepository extends JpaRepository<ProductReview, Long> {
    List<ProductReview> findProductReviewsByProduct(Product product);
}
