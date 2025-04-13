import {
  // Restaurant Actions
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

  // Events Actions
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAILURE,
  GET_ALL_EVENTS_SUCCESS,
  DELETE_EVENT_SUCCESS,
  GET_RESTAURANTS_EVENTS_SUCCESS,

  // Categories Actions
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  GET_RESTAURANTS_CATEGORY_REQUEST,
  GET_RESTAURANTS_CATEGORY_SUCCESS,
  GET_RESTAURANTS_CATEGORY_FAILURE,
} from "./ActionType";

const initialState = {
  restaurants: [],
  userRestaurant: null,
  restaurant: null,
  events: [],
  restaurantsEvents: [],
  categories: [],
  loading: false,
  error: null,
};

export const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    // Gestion des états de chargement
    case CREATE_RESTAURANT_REQUEST:
    case GET_ALL_RESTAURANTS_REQUEST:
    case DELETE_RESTAURANT_REQUEST:
    case UPDATE_RESTAURANT_REQUEST:
    case GET_RESTAURANT_BY_ID_REQUEST:
    case CREATE_CATEGORY_REQUEST:
    case GET_RESTAURANTS_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null };

    // Gestion des restaurants
    case CREATE_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        userRestaurant: action.payload,
      };

    case GET_ALL_RESTAURANTS_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: action.payload,
      };

    case GET_RESTAURANT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurant: action.payload,
      };

    case GET_RESTAURANT_BY_USER_ID_SUCCESS:
    case UPDATE_RESTAURANT_SUCCESS:
    case UPDATE_RESTAURANT_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        userRestaurant: action.payload,
      };
    case DELETE_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: state.restaurants.filter(
          (restaurant) => restaurant.id !== action.payload
        ),
        userRestaurant: state.userRestaurant.filter(
          (restaurant) => restaurant.id !== action.payload
        ),
      };

    // Gestion des événements
    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        events: [action.payload, ...state.events],
        restaurantsEvents: [...state.restaurantsEvents, action.payload],
      };

    case GET_ALL_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurantsEvents: action.payload,
      };

    case GET_RESTAURANTS_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurantsEvents: action.payload,
      };

    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        events: state.events.filter((event) => event.id !== action.payload),
        restaurantsEvents: state.restaurantsEvents.filter(
          (event) => event.id !== action.payload
        ),
      };

    // Gestion des catégories
    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: [action.payload, ...state.categories],
      };

    case GET_RESTAURANTS_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };

    // case GET_ALL_CATEGORIES_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     categories: action.payload,
    //   };

    // case UPDATE_CATEGORY_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     categories: state.categories.map((category) =>
    //       category.id === action.payload.id ? action.payload : category
    //     ),
    //     restaurantsCategories: state.restaurantsCategories.map((category) =>
    //       category.id === action.payload.id ? action.payload : category
    //     ),
    //   };

    // Gestion des erreurs
    case CREATE_RESTAURANT_FAILURE:
    case GET_ALL_RESTAURANTS_FAILURE:
    case DELETE_RESTAURANT_FAILURE:
    case UPDATE_RESTAURANT_FAILURE:
    case GET_RESTAURANT_BY_ID_FAILURE:
    case CREATE_EVENT_FAILURE:
    case CREATE_CATEGORY_FAILURE:
    case GET_RESTAURANTS_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default restaurantReducer;
