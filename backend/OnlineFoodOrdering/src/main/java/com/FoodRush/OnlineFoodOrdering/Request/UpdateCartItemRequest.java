package com.FoodRush.OnlineFoodOrdering.Request;

import lombok.Data;

@Data
public class UpdateCartItemRequest {

    private Long cartItemId;

    private int quantity;
}
