package com.FoodRush.OnlineFoodOrdering.controller;

import com.FoodRush.OnlineFoodOrdering.Request.AddCartItemRequest;
import com.FoodRush.OnlineFoodOrdering.Request.OrderRequest;
import com.FoodRush.OnlineFoodOrdering.Service.OrderService;
import com.FoodRush.OnlineFoodOrdering.Service.UserService;
import com.FoodRush.OnlineFoodOrdering.model.CartItem;
import com.FoodRush.OnlineFoodOrdering.model.Order;
import com.FoodRush.OnlineFoodOrdering.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @PostMapping("/order")
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest req,
                                                  @RequestHeader("authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Order order = orderService.createOrder(req, user);

        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @GetMapping("/order/user")
    public ResponseEntity<List<Order>> getOrderHistory(
                                             @RequestHeader("authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        List<Order> orders = orderService.getUsersOrder(user.getId());

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }


}
