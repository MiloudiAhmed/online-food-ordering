package com.FoodRush.OnlineFoodOrdering.Service;

import com.FoodRush.OnlineFoodOrdering.Repository.UserRepository;
import com.FoodRush.OnlineFoodOrdering.config.JwtProvider;
import com.FoodRush.OnlineFoodOrdering.dto.RestaurantDto;
import com.FoodRush.OnlineFoodOrdering.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public User findUserByJwtToken(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        User user = findUserByEmail(email);
          return user;
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email);

        if(user == null){
            throw new Exception("user not found");
        }
        return user;
    }
}
