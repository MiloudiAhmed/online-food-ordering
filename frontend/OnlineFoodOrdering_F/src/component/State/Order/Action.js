import { api } from "../../config/api";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  GET_USERS_ORDERS_REQUEST,
  GET_USERS_ORDERS_SUCCESS,
  GET_USERS_ORDERS_FAILURE,
} from "./ActionType";

// Créer une commande
export const createOrder = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
      const { data } = await api.post("/api/orders", reqData.order, {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      });
      //   if (data.payment_url) {
      //     window.location.href = data.payment_url;
      //   }
      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
      console.log("Order created successfully", data);
    } catch (error) {
      dispatch({ type: CREATE_ORDER_FAILURE, payload: error });
      console.log("Error creating order", error);
      throw error;
    }
  };
};

// Récupérer les commandes de l'utilisateur
export const getUsersOrders = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_USERS_ORDERS_REQUEST });
    try {
      const { data } = await api.get(`/api/order/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: GET_USERS_ORDERS_SUCCESS, payload: data });
      console.log("User orders fetched successfully", data);
    } catch (error) {
      dispatch({ type: GET_USERS_ORDERS_FAILURE, payload: error });
      console.log("Error fetching user orders", error);
      throw error;
    }
  };
};
