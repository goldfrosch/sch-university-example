package org.example.testserver.Repository;

import org.example.testserver.Domain.Product;
import org.example.testserver.Domain.ProductImages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductImageRepository extends JpaRepository<ProductImages, Long> {
    List<ProductImages> findProductImagesByProduct(Product product);
}
