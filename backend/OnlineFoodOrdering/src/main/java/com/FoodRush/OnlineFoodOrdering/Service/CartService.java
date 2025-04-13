package com.FoodRush.OnlineFoodOrdering.Service;

import com.FoodRush.OnlineFoodOrdering.Request.AddCartItemRequest;
import com.FoodRush.OnlineFoodOrdering.model.Cart;
import com.FoodRush.OnlineFoodOrdering.model.CartItem;

public interface CartService {

    public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws Exception;

    public CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws Exception;

    public Cart removeItemFromCart(Long caretItemId, String jwt) throws Exception;

    public Long calculateCartTotals(Cart cart) throws Exception;

    public Cart findCartById(Long id) throws Exception;

    public Cart findCartByUserId(Long userId) throws Exception;

    public  Cart clearCart(Long userId) throws Exception;
}
