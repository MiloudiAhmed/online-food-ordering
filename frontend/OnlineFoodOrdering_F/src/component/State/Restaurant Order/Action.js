import { api } from "../../config/api";
import {
  GET_RESTAURANT_ORDER_REQUEST,
  GET_RESTAURANT_ORDER_SUCCESS,
  GET_RESTAURANT_ORDER_FAILURE,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
} from "./ActionType";

export const fetchRestaurantOrder =
  ({ jwt, restaurantId, orderStatus }) =>
  async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_ORDER_REQUEST });
    try {
      const { data } = await api.get(
        `/api/admin/order/restaurants/${restaurantId}`,
        {
          params: { order_status: orderStatus },
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: GET_RESTAURANT_ORDER_SUCCESS, payload: data });
      console.log("Restaurant orders fetched successfully", data);
      return data;
    } catch (error) {
      dispatch({ type: GET_RESTAURANT_ORDER_FAILURE, payload: error });
      console.error("Error fetching restaurant orders", error);
      throw error;
    }
  };

export const updateOrderStatus = ({ jwt, orderId, orderStatus }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
      const response = await api.put(
        `/api/admin/orders/${orderId}/${orderStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: response.data });
      console.log("Order status updated successfully", response.data);
    } catch (error) {
      dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, payload: error });
      console.error("Error updating order status", error);
      throw error;
    }
  };
};
