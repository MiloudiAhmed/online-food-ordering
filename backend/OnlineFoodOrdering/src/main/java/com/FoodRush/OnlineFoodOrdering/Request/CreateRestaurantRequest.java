package com.FoodRush.OnlineFoodOrdering.Request;

import com.FoodRush.OnlineFoodOrdering.model.Address;
import com.FoodRush.OnlineFoodOrdering.model.ContactInformation;
import lombok.Data;

import java.util.List;

@Data
public class CreateRestaurantRequest {

    private Long id;
    private String name;
    private String description;
    private String cuisineType;
    private Address address;
    private ContactInformation contactInformation;
    private String opningHours;
    private List<String> images;

}
