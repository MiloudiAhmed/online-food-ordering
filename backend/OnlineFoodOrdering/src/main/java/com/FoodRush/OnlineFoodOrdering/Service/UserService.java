package com.FoodRush.OnlineFoodOrdering.Service;

import com.FoodRush.OnlineFoodOrdering.dto.RestaurantDto;
import com.FoodRush.OnlineFoodOrdering.model.User;

import java.util.List;

public interface UserService {

    public User findUserByJwtToken(String jwt) throws Exception;

    public User findUserByEmail(String email) throws Exception;


}
