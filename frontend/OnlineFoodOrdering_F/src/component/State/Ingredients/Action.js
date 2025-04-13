import { api } from "../../config/api";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILURE,
  UPDATE_STOCK_REQUEST,
  UPDATE_STOCK_SUCCESS,
  UPDATE_STOCK_FAILURE,
  CREATE_INGREDIENT_REQUEST,
  CREATE_INGREDIENT_SUCCESS,
  CREATE_INGREDIENT_FAILURE,
  CREATE_INGREDIENT_CATEGORY_REQUEST,
  CREATE_INGREDIENT_CATEGORY_SUCCESS,
  CREATE_INGREDIENT_CATEGORY_FAILURE,
  GET_INGREDIENT_CATEGORY_REQUEST,
  GET_INGREDIENT_CATEGORY_SUCCESS,
  GET_INGREDIENT_CATEGORY_FAILURE,
  GET_INGREDIENTS,
  UPDATE_STOCK,
} from "./ActionType";

// Récupérer tous les ingrédients
export const getIngredientsOfRestaurant = ({ id, jwt }) => {
  return async (dispatch) => {
    try {
      const { data } = await api.get(
        `/api/admin/ingredients/restaurant/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: GET_INGREDIENTS, payload: data });
      console.log("Ingredients fetched successfully");
    } catch (error) {
      console.error("Error fetching ingredients", error);
      throw error;
    }
  };
};

// Mettre à jour le stock d'un ingrédient
export const updateStockOfIngredient = ({ ingredientId, jwt }) => {
  return async (dispatch) => {
    try {
      const { data } = await api.put(
        `/api/admin/ingredients/${ingredientId}/stoke`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: UPDATE_STOCK, payload: data });
      console.log("Stock updated successfully");
    } catch (error) {
      console.error("Error updating stock", error);
      throw error;
    }
  };
};

// Créer un nouvel ingrédient
export const createIngredient = (ingredientData, jwt) => {
  return async (dispatch) => {
    try {
      const response = await api.post(
        `/api/admin/ingredients`,
        ingredientData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: CREATE_INGREDIENT_SUCCESS, payload: response.data });
      console.log("Ingredient created successfully");
    } catch (error) {
      console.error("Error creating ingredient", error);
      throw error;
    }
  };
};

// Créer une catégorie d'ingrédient
export const createIngredientCategory = ({ categoryData, jwt }) => {
  return async (dispatch) => {
    try {
      const response = await api.post(
        "/api/admin/ingredients/category",
        categoryData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({
        type: CREATE_INGREDIENT_CATEGORY_SUCCESS,
        payload: response.data,
      });
      console.log("Ingredient category created successfully");
    } catch (error) {
      dispatch({ type: CREATE_INGREDIENT_CATEGORY_FAILURE, payload: error });
      console.error("Error creating ingredient category", error);
      throw error;
    }
  };
};

// Récupérer les catégories d'ingrédients
export const getIngredientCategory = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    try {
      const response = await api.get(
        `/api/admin/ingredients/restaurant/${restaurantId}/category`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({
        type: GET_INGREDIENT_CATEGORY_SUCCESS,
        payload: response.data,
      });
      console.log("Ingredient categories fetched successfully");
    } catch (error) {
      console.error("Error fetching ingredient categories", error);
      throw error;
    }
  };
};
