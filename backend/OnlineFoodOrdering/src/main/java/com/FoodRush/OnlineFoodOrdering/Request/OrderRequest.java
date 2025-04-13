package com.FoodRush.OnlineFoodOrdering.Request;

import com.FoodRush.OnlineFoodOrdering.model.Address;
import lombok.Data;

@Data
public class OrderRequest {
    private Long restaurantId;

    private Address deliveryAddress;
}
