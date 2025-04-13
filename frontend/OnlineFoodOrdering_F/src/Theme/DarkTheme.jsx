import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#991B20", // Couleur primaire
    },
    secondary: {
      main: "#D4CFAE", // Couleur secondaire
    },
    black: {
      main: "#242B2E", // Couleur personnalisée
    },
    background: {
      default: "#0D0D0D", // Couleur de fond par défaut
      paper: "#0D0D0D", // Couleur de fond des composants comme les cartes
    },
    text: {
      primary: "#FFFFFF", // Couleur du texte principal
      secondary: "#CCCCCC", // Couleur du texte secondaire
    },
  },
});
