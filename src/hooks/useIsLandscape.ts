import { useWindowDimensions } from "react-native";

export default function useIsLandscape() {
  const { width } = useWindowDimensions();
  const isLandscape = width > 600;
  return { isLandscape };
}
