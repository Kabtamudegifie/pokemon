import { AppPrimitive } from "@/components/system-design/presentations/primitives";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PokemonHeader() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const CONTENT_HEIGHT = 70;
  const HEADER_TOTAL_HEIGHT = CONTENT_HEIGHT + insets.top;
  const HORIZONTAL_PADDING = 24;

  return (
    <AppPrimitive
      className="relative overflow-hidden flex-row items-center"
      style={{
        backgroundColor: Colors.light.primary,
        paddingTop: insets.top - 10,
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

      <AppPrimitive
        className="absolute justify-center"
        style={{
          right: HORIZONTAL_PADDING,
          top: insets.top,
          bottom: 0,
        }}
      >
        <Image
          source={require("@/assets/images/icon.png")}
          className="w-28 h-28 -top-8 absolute -right-2 opacity-30 rounded-full"
          style={{ transform: [{ rotate: "-20deg" }] }}
          resizeMode="contain"
        />
      </AppPrimitive>
    </AppPrimitive>
  );
}
