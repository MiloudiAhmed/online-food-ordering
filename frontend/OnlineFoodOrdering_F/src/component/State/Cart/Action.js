import { api } from "../../config/api";
import {
  FIND_CART_REQUEST,
  FIND_CART_SUCCESS,
  FIND_CART_FAILURE,
  CLEAR_CART_REQUEST,
  CLEAR_CART_SUCCESS,
  CLEAR_CART_FAILURE,
  GET_ALL_CART_ITEMS_REQUEST,
  GET_ALL_CART_ITEMS_SUCCESS,
  GET_ALL_CART_ITEMS_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  ADD_ITEM_TO_CART_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
} from "./ActionType";

// Trouver le panier d'un utilisateur
export const findCart = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: FIND_CART_REQUEST });
    try {
      const response = await api.get(`/api/cart`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: FIND_CART_SUCCESS, payload: response.data });
      console.log("Cart found successfully", response.data);
    } catch (error) {
      dispatch({ type: FIND_CART_FAILURE, payload: error });
      console.log("Error finding cart", error);
      throw error;
    }
  };
};

// Vider le panier
export const clearCart = () => {
  return async (dispatch) => {
    dispatch({ type: CLEAR_CART_REQUEST });
    try {
      const { data } = await api.put(
        `/api/cart/clear`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      dispatch({ type: CLEAR_CART_SUCCESS, payload: data });
      console.log("Cart cleared successfully");
    } catch (error) {
      dispatch({ type: CLEAR_CART_FAILURE, payload: error });
      console.log("Error clearing cart", error);
      throw error;
    }
  };
};

// Récupérer tous les items du panier
export const getAllCartItems = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_CART_ITEMS_REQUEST });
    try {
      const response = await api.get(`/api/carts/${reqData.cartId}/items`, {
        headers: {
          Authorization: `Bearer ${reqData.token}`,
        },
      });
      dispatch({ type: GET_ALL_CART_ITEMS_SUCCESS, payload: response.data });
      console.log("Cart items fetched successfully", response.data);
    } catch (error) {
      dispatch({ type: GET_ALL_CART_ITEMS_FAILURE, payload: error });
      console.log("Error fetching cart items", error);
      throw error;
    }
  };
};

// Ajouter un item au panier
export const addItemToCart = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
    try {
      const { data } = await api.put(`/api/cart/add`, reqData.cartItem, {
        headers: {
          Authorization: `Bearer ${reqData.token}`,
        },
      });
      dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
      console.log("Item added to cart successfully", data);
    } catch (error) {
      dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error });
      console.log("Error adding item to cart", error);
      throw error;
    }
  };
};

// Mettre à jour un item du panier
export const updateCartItem = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_CART_ITEM_REQUEST });
    try {
      const { data } = await api.put(`/api/cart-item/update`, reqData.data, {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      });
      dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
      console.log("Cart item updated successfully", data);
    } catch (error) {
      dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error });
      console.log("Error updating cart item", error);
      throw error;
    }
  };
};

// Supprimer un item du panier
export const removeCartItem = ({ jwt, cartItemId }) => {
  return async (dispatch) => {
    dispatch({ type: REMOVE_CART_ITEM_REQUEST });
    try {
      const { data } = await api.delete(`/api/cart-item/${cartItemId}/remove`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: cartItemId });
      console.log("Cart item removed successfully");
      return data;
    } catch (error) {
      dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error });
      console.log("Error removing cart item", error);
      throw error;
    }
  };
};
