import { colors } from "@material-ui/core";

const white = "#FFFFFF";
const black = "#000000";

export default {
  black,
  white,
  primary: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[900],
    light: colors.green[100]
  },
  secondary: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red["A400"],
    light: colors.red["A400"]
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400]
  },
  info: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400]
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400]
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    primary: colors.grey[900],
    secondary: colors.grey[600],
    link: colors.green[600]
  },
  background: {
    default: "#F4F6F8",
    paper: white
  },
  icon: colors.grey[600],
  divider: colors.grey[200]
};
