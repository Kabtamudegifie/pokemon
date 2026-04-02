import { SafeAreaView } from "@/components/system-design/presentations";
import {
  ArrowLeftIcon,
  HelpCircleIcon,
  HomeIcon,
} from "@/components/system-design/utils";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function PokemonNotFound() {
  const router = useRouter();
  const { name } = useLocalSearchParams<{ name: string }>();

  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.light.background }}
      className="flex-1 justify-center items-center px-10"
    >
      <View className="items-center mb-10">
        <View
          className="w-40 h-40 rounded-full justify-center items-center mb-6"
          style={{ backgroundColor: Colors.light.surface, elevation: 4 }}
        >
          <Image
            source={require("../../../assets/images/icon.png")}
            className="w-24 h-24 opacity-20"
            style={{ transform: [{ rotate: "15deg" }] }}
            resizeMode="contain"
          />
          <View className="absolute">
            <HelpCircleIcon
              size={80}
              strokeWidth={1.5}
              color={Colors.light.icon}
            />
          </View>
        </View>

        <Text
          style={{ color: Colors.light.text }}
          className="text-3xl font-black text-center mb-2"
        >
          Oops!
        </Text>

        <Text className="text-gray-500 text-center text-lg leading-6">
          We could not find a Pokémon named{"\n"}
          <Text className="font-bold text-gray-800 capitalize">
            &quot;{name || "Unknown"}&quot;
          </Text>
        </Text>
      </View>

      <Button
        mode="contained"
        onPress={() => router.replace("/")}
        buttonColor={Colors.light.primary}
        textColor="white"
        icon={({ size, color }) => <HomeIcon size={size} color={color} />}
        contentStyle={styles.primaryButtonContent}
        labelStyle={styles.primaryButtonLabel}
        style={[styles.primaryButton, styles.shadow]}
        uppercase={false}
      >
        Back to Pokedex
      </Button>

      <Button
        mode="text"
        onPress={() => router.back()}
        textColor={Colors.light.primary}
        icon={({ size, color }) => <ArrowLeftIcon size={size} color={color} />}
        labelStyle={styles.secondaryButtonLabel}
        style={styles.secondaryButton}
        compact
      >
        Try another search
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    width: "100%",
    borderRadius: 16,
  },
  primaryButtonContent: {
    height: 56,
  },
  primaryButtonLabel: {
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  secondaryButton: {
    marginTop: 12,
    borderRadius: 12,
  },
  secondaryButtonLabel: {
    fontSize: 15,
    fontWeight: "700",
    paddingHorizontal: 8,
  },
  shadow: {
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
});
