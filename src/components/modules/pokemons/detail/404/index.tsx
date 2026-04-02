import { AppButton } from "@/components/system-design/forms/Button";
import { SafeAreaView } from "@/components/system-design/presentations";
import { AppPrimitive } from "@/components/system-design/presentations/primitives";
import {
  ArrowLeftIcon,
  HelpCircleIcon,
  HomeIcon,
} from "@/components/system-design/utils";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet } from "react-native";

export default function PokemonNotFound() {
  const router = useRouter();
  const { name } = useLocalSearchParams<{ name: string }>();

  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.light.background }}
      className="flex-1 justify-center items-center px-10"
    >
      <AppPrimitive className="items-center mb-10">
        <AppPrimitive
          className="w-40 h-40 rounded-full justify-center items-center mb-6"
          style={{ backgroundColor: Colors.light.surface, elevation: 4 }}
        >
          <Image
            source={require("@/assets/images/icon.png")}
            className="w-24 h-24 opacity-20"
            style={{ transform: [{ rotate: "15deg" }] }}
            resizeMode="contain"
          />
          <AppPrimitive className="absolute">
            <HelpCircleIcon
              size={80}
              strokeWidth={1.5}
              color={Colors.light.icon}
            />
          </AppPrimitive>
        </AppPrimitive>

        <AppPrimitive
          as="text"
          style={{ color: Colors.light.text }}
          className="text-3xl font-black text-center mb-2"
        >
          Oops!
        </AppPrimitive>

        <AppPrimitive
          as="text"
          className="text-gray-500 text-center text-lg leading-6"
        >
          We could not find a Pokémon named{"\n"}
          <AppPrimitive
            as="text"
            className="font-bold text-gray-800 capitalize"
          >
            &quot;{name || "Unknown"}&quot;
          </AppPrimitive>
        </AppPrimitive>
      </AppPrimitive>

      <AppButton
        onPress={() => router.replace("/")}
        icon={({ size, color }) => <HomeIcon size={size} color={color} />}
        style={[styles.primaryButton, styles.shadow]}
      >
        Back to Pokedex
      </AppButton>

      <AppButton
        variant="secondary"
        onPress={() => router.back()}
        icon={({ size, color }) => <ArrowLeftIcon size={size} color={color} />}
        style={styles.secondaryButton}
      >
        Try another search
      </AppButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  primaryButton: { width: "100%" },
  secondaryButton: { marginTop: 12 },
  shadow: {
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
});
