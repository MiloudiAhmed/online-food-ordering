import {
  CREATE_INGREDIENT_SUCCESS,
  CREATE_INGREDIENT_CATEGORY_SUCCESS,
  GET_INGREDIENT_CATEGORY_SUCCESS,
  GET_INGREDIENTS,
  UPDATE_STOCK,
} from "./ActionType";

const initialState = {
  ingredients: [],
  category: [],
  update: null,
};

export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    // Récupération des ingrédients
    case GET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload,
      };

    case GET_INGREDIENT_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload,
      };

    case CREATE_INGREDIENT_CATEGORY_SUCCESS:
      return {
        ...state,
        category: [...state.category, action.payload],
      };

    case CREATE_INGREDIENT_SUCCESS:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };

    case UPDATE_STOCK:
      return {
        ...state,
        update: action.payload,
        ingredients: state.ingredients.map((ingredient) =>
          ingredient.id === action.payload.id ? action.payload : ingredient
        ),
      };

    // case GET_INGREDIENTS_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload,
    //     ingredients: [],
    //   };

    default:
      return state;
  }
};
