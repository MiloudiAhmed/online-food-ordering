import { LOGOUT } from "../Authentication/ActionType";
import {
  FIND_CART_REQUEST,
  FIND_CART_SUCCESS,
  FIND_CART_FAILURE,
  CLEAR_CART_SUCCESS,
  GET_ALL_CART_ITEMS_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
} from "./ActionType";

const initialState = {
  cart: null,
  cartItems: [],
  loading: false,
  error: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // Gestion des états de chargement
    case FIND_CART_REQUEST:
    case GET_ALL_CART_ITEMS_REQUEST:
    case UPDATE_CART_ITEM_REQUEST:
    case REMOVE_CART_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Trouver le panier
    case FIND_CART_SUCCESS:
    case CLEAR_CART_SUCCESS:
      return {
        ...state,
        loading: action.payload,
        cart: null,
        cartItems: action.payload.items,
      };

    // Récupérer tous les items du panier
    // case GET_ALL_CART_ITEMS_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     cartItems: action.payload,
    //     message: "Cart items fetched successfully",
    //   };

    // Ajouter un item au panier
    case ADD_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: [...state.cartItems, action.payload],
      };

    // Mettre à jour un item du panier
    case UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        message: "Cart item updated successfully",
      };

    // Supprimer un item du panier
    case REMOVE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };

    // Gestion des erreurs
    case FIND_CART_FAILURE:
    case UPDATE_CART_ITEM_FAILURE:
    case REMOVE_CART_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOGOUT:
      localStorage.removeItem("item");
      return { ...state, cartItems: [], cart: null, success: "logout success" };
    default:
      return state;
  }
};
