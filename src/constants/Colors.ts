import { MD3LightTheme } from "react-native-paper";

const tintColorLight = "#1D35AD";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    primary: "#1D35AD",
    text: "#11181C",
    background: "#F5F7FA",
    surface: "#FFFFFF",
    tint: tintColorLight,
    placeholder: "#94A3B8",
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    border: "#E5E7EB",
  },
  dark: {
    primary: "#fff",
    text: "#ECEDEE",
    background: "#151718",
    surface: "#242627",
    tint: tintColorDark,
    placeholder: "#ECEDEE",
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    border: "#3F3F46",
  },
};

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.light.primary,
    secondaryContainer: Colors.light.primary,
  },
};
