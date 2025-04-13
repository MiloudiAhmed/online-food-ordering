package com.FoodRush.OnlineFoodOrdering.Service;

import com.FoodRush.OnlineFoodOrdering.Repository.FoodRepository;
import com.FoodRush.OnlineFoodOrdering.Repository.IngredientItemRepository;
import com.FoodRush.OnlineFoodOrdering.Request.CreateFoodRequest;
import com.FoodRush.OnlineFoodOrdering.model.Category;
import com.FoodRush.OnlineFoodOrdering.model.Food;
import com.FoodRush.OnlineFoodOrdering.model.IngredientsItem;
import com.FoodRush.OnlineFoodOrdering.model.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FoodServiceImp implements FoodService{

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private IngredientItemRepository ingredientItemRepository; // ← Ajoutez cette ligne

    @Override
    public Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant) {
        Food food = new Food();
        food.setFoodCategory(category);
        food.setRestaurant(restaurant);
        food.setDescription(req.getDescription());
        food.setImages(req.getImages());
        food.setName(req.getName());
        food.setPrice(req.getPrice());
        food.setSeasonal(req.isSeasonal());
        food.setVegetarian(req.isVegetarian());
        food.setAvailable(true);

        if (req.getIngredients() != null) {
            List<IngredientsItem> managedIngredients = req.getIngredients().stream()
                    .map(ingredient -> {
                        if (ingredient.getId() != null) {
                            // Utilisez le bon repository
                            return ingredientItemRepository.findById(ingredient.getId())
                                    .orElseThrow(() -> new RuntimeException("Ingredient not found with id: " + ingredient.getId()));
                        }
                        // Pour les nouveaux ingrédients
                        ingredient.setRestaurant(restaurant);
                        return ingredient;
                    })
                    .collect(Collectors.toList());
            food.setIngredients(managedIngredients);
        }

        return foodRepository.save(food);
    }

    @Override
    public void deleteFood(Long foodId) throws Exception {

        Food food = findFoodById(foodId);
        food.setRestaurant(null);
        foodRepository.save(food);

    }

    @Override
    public List<Food> getRestaurantsFood(Long restaurantId,
                                         boolean isVegetarian,
                                         boolean isNonveg,
                                         boolean isSeasonal,
                                         String foodCategory) {

        List<Food> foods = foodRepository.findByRestaurantId(restaurantId);

        if (isVegetarian){
            foods = filterByVegetarian(foods,isVegetarian);
        }
        if (isNonveg){
            foods = filterByNonveg(foods,isNonveg);
        }

        if (isSeasonal){
            foods = filterBySeasonal(foods,isSeasonal);
        }

        if (foodCategory != null && !foodCategory.equals("")){
            foods = filterByCategory(foods,foodCategory);
        }

        return foods;
    }

    private List<Food> filterByCategory(List<Food> foods, String foodCategory) {

        return foods.stream().filter(food -> {
            if (food.getFoodCategory() != null){
                return food.getFoodCategory().getName().equals(foodCategory);
            }
            return false;
        }).collect(Collectors.toList());
    }

    private List<Food> filterBySeasonal(List<Food> foods, boolean isSeasonal) {

        return foods.stream().filter(food -> food.isSeasonal()==isSeasonal).collect(Collectors.toList());
    }

    private List<Food> filterByNonveg(List<Food> foods, boolean isNonveg) {

        return foods.stream().filter(food -> food.isVegetarian()==false).collect(Collectors.toList());

    }

    private List<Food> filterByVegetarian(List<Food> foods, boolean isVegetarian) {

        return foods.stream().filter(food -> food.isVegetarian()==isVegetarian).collect(Collectors.toList());
    }

    @Override
    public List<Food> searchFood(String keyword) {
        return foodRepository.searchFood(keyword);
    }

    @Override
    public Food findFoodById(Long foodId) throws Exception {
        Optional<Food> optionalFood = foodRepository.findById(foodId);

        if (optionalFood.isEmpty()){
            throw new Exception("food not exist...");
        }
        return optionalFood.get();
    }

    @Override
    public Food updateAvailibilityStatus(Long foodId) throws Exception {
        Food food = findFoodById(foodId);
        food.setAvailable(!food.isAvailable());
        return foodRepository.save(food);
    }
}
