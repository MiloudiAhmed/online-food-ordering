import {
  GET_USERS_ORDERS_REQUEST,
  GET_USERS_ORDERS_SUCCESS,
  GET_USERS_ORDERS_FAILURE,
} from "./ActionType";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

export const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // Gestion des états de chargement
    // case CREATE_ORDER_REQUEST:
    case GET_USERS_ORDERS_REQUEST:
      return { ...state, error: null, loading: true };

    case GET_USERS_ORDERS_SUCCESS:
      return { ...state, error: null, loading: false, orders: payload };

    case GET_USERS_ORDERS_FAILURE:
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
};

// case GET_USERS_NOTIFICATION_REQUEST:
// case UPDATE_ORDER_STATUS_REQUEST:
// case CANCEL_ORDER_REQUEST:
//   return {
//     ...state,
//     loading: true,
//     error: null,
//     message: null,
//   };

// Création de commande
// case CREATE_ORDER_SUCCESS:
// Récupération des commandes utilisateur

// Récupération des notifications
// case GET_USERS_NOTIFICATION_SUCCESS:
//   return {
//     ...state,
//     loading: false,
//     notifications: action.payload,
//     message: "Notifications fetched successfully",
//   };

// Mise à jour du statut
// case UPDATE_ORDER_STATUS_SUCCESS:
//   return {
//     ...state,
//     loading: false,
//     orders: state.orders.map((order) =>
//       order.id === action.payload.id ? action.payload : order
//     ),
//     message: "Order status updated successfully",
//   };

// // Annulation de commande
// case CANCEL_ORDER_SUCCESS:
//   return {
//     ...state,
//     loading: false,
//     orders: state.orders.map((order) =>
//       order.id === action.payload.id ? action.payload : order
//     ),
//     message: "Order cancelled successfully",
//   };

// // Gestion des erreurs
// case CREATE_ORDER_FAILURE:
