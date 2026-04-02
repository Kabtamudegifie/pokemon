import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import "./global.css";

import { ErrorBoundary } from "@/components/system-design/presentations";
import { theme } from "@/constants/Colors";
import TqProvider from "@/providers/tq";
import { PaperProvider, Portal } from "react-native-paper";

SplashScreen.preventAutoHideAsync();
export const unstable_settings = {
  initialRouteName: "index",
};
export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <TqProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <PaperProvider theme={theme}>
            <Portal>
              <Slot />
              <StatusBar style="light" />
            </Portal>
          </PaperProvider>
        </GestureHandlerRootView>
      </TqProvider>
    </ErrorBoundary>
  );
}
