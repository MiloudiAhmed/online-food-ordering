import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const EventCard = () => {
  return (
    <div>
      <Card sx={{ width: 345 }}>
        <CardMedia
          sx={{ height: 345 }}
          image="https://cdn.pixabay.com/photo/2019/08/19/11/52/burger-4416178_1280.jpg"
        />
        <CardContent>
          <Typography variant="h5">Gueliz Delecious Restaurant</Typography>
          <Typography variant="body2">50% off on your first order</Typography>
          <div className="py-2 space-y-2 ">
            <p>{"Marrakech"}</p>
            <p className="text-sm text-blue-500">Mars 25, 2025 12:00 AM</p>
            <p className="text-sm text-red-500">Mars 28, 2025 12:00 AM</p>
          </div>
        </CardContent>
        {false && (
          <CardActions>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>
    </div>
  );
};

export default EventCard;
