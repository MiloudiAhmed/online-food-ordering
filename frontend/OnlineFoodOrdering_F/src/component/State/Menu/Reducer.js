import {
  CREATE_MENU_ITEM_REQUEST,
  CREATE_MENU_ITEM_SUCCESS,
  CREATE_MENU_ITEM_FAILURE,
  GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST,
  GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
  GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
  DELETE_MENU_ITEM_REQUEST,
  DELETE_MENU_ITEM_SUCCESS,
  DELETE_MENU_ITEM_FAILURE,
  SEARCH_MENU_ITEM_REQUEST,
  SEARCH_MENU_ITEM_SUCCESS,
  SEARCH_MENU_ITEM_FAILURE,
  UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST,
  UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,
  UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
} from "./ActionType";

const initialState = {
  menuItems: [],
  searchedMenuItems: [],
  loading: false,
  error: null,
  message: null,
};

export const menuItemReducer = (state = initialState, action) => {
  switch (action.type) {
    // Gestion des états de chargement
    case CREATE_MENU_ITEM_REQUEST:
    case GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST:
    case DELETE_MENU_ITEM_REQUEST:
    case SEARCH_MENU_ITEM_REQUEST:
    case UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };

    // Création d'un item de menu
    case CREATE_MENU_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        menuItems: [action.payload, ...state.menuItems],
        message: "Food created successfully",
      };

    // Récupération des items par restaurant
    case GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        menuItems: action.payload,
      };

    // Suppression d'un item de menu
    case DELETE_MENU_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        menuItems: state.menuItems.filter((item) => item.id !== action.payload),
      };

    // Recherche d'items de menu
    case SEARCH_MENU_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        searchedMenuItems: action.payload,
      };

    // Mise à jour de la disponibilité
    case UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS:
      console.log("updated items id ", action.payload.id);
      return {
        ...state,
        loading: false,
        menuItems: state.menuItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    // Gestion des erreurs
    case CREATE_MENU_ITEM_FAILURE:
    case GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE:
    case DELETE_MENU_ITEM_FAILURE:
    case SEARCH_MENU_ITEM_FAILURE:
    case UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: null,
      };

    default:
      return state;
  }
};

export default menuItemReducer;
