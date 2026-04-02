import { ConfigContext } from "@expo/config";
import { ExpoConfig } from "@expo/config-types";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Pokemon",
  slug: "pokemon",
  version: "0.1.0",
  orientation: "default",
  icon: "./assets/images/icon.png",
  scheme: "Pokemon",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  splash: {
    image: "./assets/images/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#5B21B6",
  },
  ios: {
    supportsTablet: true,
    infoPlist: {
      NSPhotoLibraryUsageDescription:
        "This app needs access to your photo library to select and save images.",
      NSPhotoLibraryAddUsageDescription:
        "This app needs permission to save photos to your photo library.",
      NSCameraUsageDescription:
        "This app needs access to your camera to take photos.",
      NSLocationWhenInUseUsageDescription:
        "This app needs access to your location to provide location-based features.",
      NSLocationAlwaysAndWhenInUseUsageDescription:
        "This app needs access to your location to provide location-based features.",
      NSContactsUsageDescription:
        "This app needs access to your contacts to help you connect with friends.",
      NSUserTrackingUsageDescription:
        "This app needs permission to track your activity across other apps and websites.",
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#5B21B6",
    },
    edgeToEdgeEnabled: true,
    permissions: [
      "CAMERA",
      "READ_EXTERNAL_STORAGE",
      "WRITE_EXTERNAL_STORAGE",
      "ACCESS_MEDIA_LOCATION",
      "ACCESS_COARSE_LOCATION",
      "ACCESS_FINE_LOCATION",
      "ACCESS_BACKGROUND_LOCATION",
      "READ_CONTACTS",
      "WRITE_CONTACTS",
    ],
  },

  plugins: [
    ["expo-router", { root: "./src/app" }],
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
});
