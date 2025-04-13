import { Card, Chip, IconButton } from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isPresentInFavorites } from "../config/logic";
import { addToFavorite } from "../State/Authentication/Action";
const RestaurantCard = ({ item }) => {
  const naviagate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  const handleAddToFavorite = () => {
    dispatch(addToFavorite({ restaurantId: item.id, jwt }));
  };

  const handleNavigateToRestaurant = () => {
    if (item.open) {
      naviagate(`/restaurant/${item.address.city}/${item.name}/${item.id}`);
    }
  };

  return (
    <Card className="w-[18rem]">
      <div
        className={`${true ? "cursor-pointer" : "cursor-not-allowed"} relative`}
      >
        <img
          className="w-full h-[10rem] rounded-t-md object-cover"
          src={item.images[1]}
          alt=""
        />
        <Chip
          size="small"
          className="absolute top-2 left-2"
          color={item.open ? "success" : "error"}
          label={item.open ? "open" : "closed"}
        />
      </div>
      <div className="p-4 flex justify-between items-center">
        <div className="space-y-1">
          <p
            onClick={handleNavigateToRestaurant}
            className="font-semibold text-lg cursor-pointer"
          >
            {item.name}
          </p>
          <p className="text-gray-500 text-sm">{item.description}</p>
        </div>
        <IconButton onClick={handleAddToFavorite}>
          {isPresentInFavorites(auth.favorites, item) ? (
            <FavoriteIcon />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
      </div>
    </Card>
  );
};

export default RestaurantCard;
