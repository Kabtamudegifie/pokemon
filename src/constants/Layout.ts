import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const GRID_GAP = 16;

export const Layout = {
  window: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  grid: {
    gap: GRID_GAP,
    itemWidth: (SCREEN_WIDTH - GRID_GAP * 3) / 2,
  },
  header: {
    contentHeight: 64,
    borderRadius: 40,
  },
};
