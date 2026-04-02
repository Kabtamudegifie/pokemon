import { Colors } from "@/constants/Colors";
import { formatHeight } from "@/constants/Pokemon";
import { Pokemon } from "@/data/models";
import React from "react";
import { Text, View } from "react-native";

type PokemonPhysicalInfoProps = { data: Pokemon };

export function PokemonPhysicalInfo({ data }: PokemonPhysicalInfoProps) {
  const height = formatHeight(data.height);
  const weightKg = (data.weight / 10).toFixed(1);
  const weightLbs = (parseFloat(weightKg) * 2.20462).toFixed(1);

  return (
    <View
      style={{
        backgroundColor: Colors.light.surface,
        borderColor: Colors.light.border,
      }}
      className="rounded-2xl p-4 border shadow-sm"
    >
      <View className="flex-row items-center">
        <View className="flex-1 items-center">
          <Text className="text-[10px] font-bold text-gray-400 uppercase mb-1">
            Height
          </Text>
          <View className="flex-row items-baseline gap-1">
            <Text
              style={{ color: Colors.light.text }}
              className="text-lg font-black"
            >
              {height.ftIn}
            </Text>
            <Text className="text-[10px] text-gray-500">{height.meters}</Text>
          </View>
        </View>

        <View className="w-[1px] h-8 bg-gray-100" />

        <View className="flex-1 items-center">
          <Text className="text-[10px] font-bold text-gray-400 uppercase mb-1">
            Weight
          </Text>
          <View className="flex-row items-baseline gap-1">
            <Text
              style={{ color: Colors.light.text }}
              className="text-lg font-black"
            >
              {weightLbs}
            </Text>
            <Text className="text-[10px] text-gray-400 font-bold uppercase">
              lbs
            </Text>
            <Text className="text-[10px] text-gray-500 ml-1">
              ({weightKg}kg)
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
