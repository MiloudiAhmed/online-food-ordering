import { api } from "../../config/api";
import {
  CREATE_RESTAURANT_REQUEST,
  CREATE_RESTAURANT_SUCCESS,
  CREATE_RESTAURANT_FAILURE,
  GET_ALL_RESTAURANTS_REQUEST,
  GET_ALL_RESTAURANTS_SUCCESS,
  GET_ALL_RESTAURANTS_FAILURE,
  DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_SUCCESS,
  DELETE_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_SUCCESS,
  UPDATE_RESTAURANT_FAILURE,
  GET_RESTAURANT_BY_ID_REQUEST,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_ID_FAILURE,
  GET_RESTAURANT_BY_USER_ID_REQUEST,
  GET_RESTAURANT_BY_USER_ID_SUCCESS,
  GET_RESTAURANT_BY_USER_ID_FAILURE,
  UPDATE_RESTAURANT_STATUS_REQUEST,
  UPDATE_RESTAURANT_STATUS_SUCCESS,
  UPDATE_RESTAURANT_STATUS_FAILURE,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAILURE,
  GET_ALL_EVENTS_REQUEST,
  GET_ALL_EVENTS_SUCCESS,
  GET_ALL_EVENTS_FAILURE,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE,
  GET_RESTAURANTS_EVENTS_REQUEST,
  GET_RESTAURANTS_EVENTS_SUCCESS,
  GET_RESTAURANTS_EVENTS_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  GET_RESTAURANTS_CATEGORY_REQUEST,
  GET_RESTAURANTS_CATEGORY_SUCCESS,
  GET_RESTAURANTS_CATEGORY_FAILURE,
} from "./ActionType";

// Créer un restaurant
export const createRestaurant = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_RESTAURANT_REQUEST });
    try {
      const { data } = await api.post("/api/admin/restaurants", reqData.data, {
        headers: {
          Authorization: `Bearer ${reqData.token}`,
        },
      });
      dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data });
      console.log("Restaurant created successfully", data);
    } catch (error) {
      dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error });
      console.log("Error creating restaurant", error);
    }
  };
};

// Récupérer tous les restaurants
export const getAllRestaurantsAction = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_RESTAURANTS_REQUEST });
    try {
      console.log("Fetching restaurants..."); // Vérifier si la fonction est bien appelée

      const { data } = await api.get("/api/restaurants", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: GET_ALL_RESTAURANTS_SUCCESS, payload: data });
      console.log("Restaurants reçus:", data); // Vérifier la réponse du backend
    } catch (error) {
      dispatch({ type: GET_ALL_RESTAURANTS_FAILURE, payload: error });
      console.log("Erreur lors de la récupération des restaurants:", error);
    }
  };
};

// Supprimer un restaurant
export const deleteRestaurant =
  ({ restaurantId, jwt }) =>
  async (dispatch) => {
    dispatch({ type: DELETE_RESTAURANT_REQUEST });
    try {
      await api.delete(`/api/admin/restaurants/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: restaurantId });
      console.log("Restaurant deleted successfully");
    } catch (error) {
      dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: error });
      console.log("Error deleting restaurant", error);
    }
  };

// Mettre à jour un restaurant
export const updateRestaurant = ({ restaurantId, restaurantData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_REQUEST });
    try {
      const res = await api.put(
        `/api/admin/restaurants/${restaurantId}`,
        restaurantData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: UPDATE_RESTAURANT_SUCCESS, payload: res.data });
      console.log("Restaurant updated successfully", res.data);
    } catch (error) {
      dispatch({ type: UPDATE_RESTAURANT_FAILURE, payload: error });
      console.log("Error updating restaurant", error);
    }
  };
};

// Récupérer un restaurant par ID
export const getRestaurantById = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
    try {
      const response = await api.get(
        `/api/restaurants/${reqData.restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        }
      );
      dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: response.data });
      console.log("Restaurant fetched by ID successfully", response.data);
    } catch (error) {
      dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error });
      console.log("Error fetching restaurant by ID", error);
    }
  };
};

// Récupérer les restaurants par user ID
export const getRestaurantsByUserId = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
    try {
      const { data } = await api.get(`/api/admin/restaurants/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data });
      console.log("Restaurants fetched by user ID successfully", data);
    } catch (error) {
      dispatch({
        type: GET_RESTAURANT_BY_USER_ID_FAILURE,
        payload: error.message,
      });
      console.log("Error fetching restaurants by user ID", error);
    }
  };
};

// Mettre à jour le statut d'un restaurant
export const updateRestaurantStatus =
  ({ restaurantId, jwt }) =>
  async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
    try {
      const res = await api.put(
        `/api/admin/restaurants/${restaurantId}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: res.data });
      console.log("Restaurant status updated successfully", res.data);
    } catch (error) {
      dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error });
      console.log("Error updating restaurant status", error);
    }
  };

// Créer un événement
export const createEventAction =
  ({ data, jwt, restaurantId }) =>
  async (dispatch) => {
    dispatch({ type: CREATE_EVENT_REQUEST });
    try {
      const res = await api.post(
        `/api/admin/events/restaurant/${restaurantId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: CREATE_EVENT_SUCCESS, payload: res.data });
      console.log("Event created successfully", res.data);
      return data;
    } catch (error) {
      dispatch({ type: CREATE_EVENT_FAILURE, payload: error });
      console.log("Error creating event", error);
      throw error;
    }
  };

// Récupérer tous les événements
export const getAllEvents = ({ jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_EVENTS_REQUEST });
    try {
      const res = await api.get(`/api/events`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: res.data });
      console.log("Events fetched successfully", res.data);
    } catch (error) {
      dispatch({ type: GET_ALL_EVENTS_FAILURE, payload: error });
      console.log("Error fetching events", error);
      throw error;
    }
  };
};

// Supprimer un événement
export const deleteEventAction =
  ({ eventId, jwt }) =>
  async (dispatch) => {
    dispatch({ type: DELETE_EVENT_REQUEST });
    try {
      const res = await api.delete(`/api/admin/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: DELETE_EVENT_SUCCESS, payload: eventId });
      console.log("Event deleted successfully", res.data);
    } catch (error) {
      dispatch({ type: DELETE_EVENT_FAILURE, payload: error });
      console.log("Error deleting event", error);
      throw error;
    }
  };

// Mettre à jour un événement
// export const updateEvent = (eventId, eventData) => async (dispatch) => {
//   dispatch({ type: UPDATE_EVENT_REQUEST });
//   try {
//     const { data } = await api.put(`/api/admin/events/${eventId}`, eventData);
//     dispatch({ type: UPDATE_EVENT_SUCCESS, payload: data });
//     console.log("Event updated successfully", data);
//     return data;
//   } catch (error) {
//     dispatch({ type: UPDATE_EVENT_FAILURE, payload: error });
//     console.log("Error updating event", error);
//     throw error;
//   }
// };

// Récupérer les événements d'un restaurant
export const getRestaurantsEvents = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_EVENTS_REQUEST });
    try {
      const res = await api.get(
        `/api/admin/events/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: GET_RESTAURANTS_EVENTS_SUCCESS, payload: res.data });
      console.log("Restaurant events fetched successfully", res.data);
    } catch (error) {
      dispatch({ type: GET_RESTAURANTS_EVENTS_FAILURE, payload: error });
      console.log("Error fetching restaurant events", error);
      throw error;
    }
  };
};

// Créer une catégorie
export const createCategory = ({ reqData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    try {
      // Assurez-vous que reqData contient bien la propriété 'name'
      const requestData = {
        name: reqData.name, // Extrait le nom de reqData
      };

      const res = await api.post(
        `/api/admin/category`,
        requestData, // Envoie l'objet formaté correctement
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: res.data });
      console.log("Category created successfully", res.data);
    } catch (error) {
      dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error });
      console.log("Error creating category", error);
      throw error;
    }
  };
};

// Récupérer toutes les catégories d'un restaurant
export const getRestaurantCategory = ({ jwt, restaurantId }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_CATEGORY_REQUEST });
    try {
      const res = await api.get(`/api/category/restaurant/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: GET_RESTAURANTS_CATEGORY_SUCCESS, payload: res.data });
      console.log("Restaurant categories fetched successfully", res.data);
      return res.data;
    } catch (error) {
      dispatch({ type: GET_RESTAURANTS_CATEGORY_FAILURE, payload: error });
      console.log("Error fetching restaurant categories", error);
      throw error;
    }
  };
};
