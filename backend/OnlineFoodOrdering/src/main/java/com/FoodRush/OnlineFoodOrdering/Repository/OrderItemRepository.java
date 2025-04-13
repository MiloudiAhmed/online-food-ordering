package com.FoodRush.OnlineFoodOrdering.Repository;

import com.FoodRush.OnlineFoodOrdering.model.Order;
import com.FoodRush.OnlineFoodOrdering.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem,Long> {
}
