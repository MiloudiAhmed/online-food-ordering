package com.FoodRush.OnlineFoodOrdering.Repository;

import com.FoodRush.OnlineFoodOrdering.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address,Long> {
}
