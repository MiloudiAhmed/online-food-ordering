package com.FoodRush.OnlineFoodOrdering.Repository;

import com.FoodRush.OnlineFoodOrdering.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {


}
