package com.FoodRush.OnlineFoodOrdering.Service;

import com.FoodRush.OnlineFoodOrdering.Request.CreateFoodRequest;
import com.FoodRush.OnlineFoodOrdering.model.Category;
import com.FoodRush.OnlineFoodOrdering.model.Food;
import com.FoodRush.OnlineFoodOrdering.model.Restaurant;

import java.util.List;

public interface FoodService {

    public Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant);

    void deleteFood(Long foodId) throws Exception;

    public List<Food> getRestaurantsFood(Long restaurantId,
                                         boolean isVegetarian,
                                         boolean isNonveg,
                                         boolean isSeasonal,
                                         String foodCategory
    );

    public List<Food> searchFood(String keyword);

    public Food findFoodById(Long foodId) throws Exception;

    public Food updateAvailibilityStatus(Long foodId) throws Exception;
}
