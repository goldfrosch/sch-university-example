package org.example.testserver.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.testserver.Domain.Product;
import org.example.testserver.Domain.ProductReview;
import org.example.testserver.Entity.ProductAllData;
import org.example.testserver.Entity.ProductReviewData;
import org.example.testserver.Repository.ProductImageRepository;
import org.example.testserver.Repository.ProductRepository;
import org.example.testserver.Repository.ProductReviewRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    private final ProductReviewRepository productReviewRepository;

    @Transactional(readOnly = true)
    public ProductAllData getProductFullDataById(Long id) {
        var product = this.getProductDataById(id);
        var images = productImageRepository.findProductImagesByProduct(product);
        var reviewData = this.getProductReviewTotalScore(product);

        return new ProductAllData(product, images, reviewData);
    }

    @Transactional(readOnly = true)
    public Product getProductDataById(Long id) throws NullPointerException {
        return productRepository.findById(id).orElseThrow(() -> new NullPointerException("해당 상품정보를 찾을 수 없습니다"));
    }

    // TODO: 임시로 처리하지만 추후 캐싱해주는게 좋다.
    @Transactional(readOnly = true)
    public ProductReviewData getProductReviewTotalScore(Product product) {
        var reviews = productReviewRepository.findProductReviewsByProduct(product);
        var totalScore = reviews.stream().mapToDouble(ProductReview::getScore).sum() / reviews.size();

        return new ProductReviewData(Double.isNaN(totalScore) ? 0 : totalScore, reviews.size());
    }
}
