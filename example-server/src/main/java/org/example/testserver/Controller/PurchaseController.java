package org.example.testserver.Controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.testserver.Entity.PageDataVO;
import org.example.testserver.Entity.PostPurchaseDAO;
import org.example.testserver.Entity.PurchaseLogDTO;
import org.example.testserver.Service.PurchaseService;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequiredArgsConstructor
public class PurchaseController {
    private final PurchaseService purchaseService;

    @GetMapping("/purchase/list")
    public PageDataVO<PurchaseLogDTO> getPurchaseList(
            @RequestParam Long offset, @RequestParam(defaultValue = "10") int limit) {
        return purchaseService.getPurchasePage(offset, limit);
    }

    @PostMapping("/purchase")
    public void purchaseProducts(@RequestBody PostPurchaseDAO postPurchaseDAO) {
        purchaseService.Purchase(postPurchaseDAO.products(), postPurchaseDAO.coupon());
    }
}
