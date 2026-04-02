import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RootLayout() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const CONTENT_HEIGHT = 64;
  const HEADER_TOTAL_HEIGHT = CONTENT_HEIGHT + insets.top;
  const HORIZONTAL_PADDING = 24;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="PokemonDetail"
        options={{
          headerShown: true,
          headerTransparent: true,
          header: () => (
            <View
              className="bg-[#1a38b1] relative overflow-hidden flex-row items-center"
              style={{
                paddingTop: insets.top,
                height: HEADER_TOTAL_HEIGHT,
                paddingHorizontal: HORIZONTAL_PADDING,
              }}
            >
              <TouchableOpacity
                onPress={() => router.back()}
                className="z-10"
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="arrow-back" size={28} color="white" />
              </TouchableOpacity>

              <View
                className="absolute justify-center"
                style={{
                  right: HORIZONTAL_PADDING,
                  top: insets.top,
                  bottom: 0,
                }}
              >
                <Image
                  source={require("../../../assets/images/icon.png")}
                  className="w-12 h-12 opacity-30 rounded-full"
                  style={{ transform: [{ rotate: "-20deg" }] }}
                  resizeMode="contain"
                />
              </View>
            </View>
          ),
        }}
      />
    </Stack>
  );
}
