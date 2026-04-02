import { Colors } from "@/constants/Colors";
import { formatStatName, getStatColor } from "@/constants/Pokemon";
import { Pokemon } from "@/data/models";
import React from "react";
import { Text, View } from "react-native";

type PokemonStatsProps = { data: Pokemon };

export function PokemonStats({ data }: PokemonStatsProps) {
  const displayStats = data.stats.filter((s) =>
    ["hp", "attack", "defense", "speed"].includes(s.stat.name),
  );

  return (
    <View
      style={{
        backgroundColor: Colors.light.surface,
        borderColor: Colors.light.border,
      }}
      className="rounded-3xl p-6  shadow-xl border"
    >
      <Text className="text-gray-500 font-semibold text-xs tracking-widest">
        BASE STATS
      </Text>

      {displayStats.map((stat) => (
        <View key={stat.stat.name} className="mb-3">
          <View className="flex-row justify-between mb-2">
            <Text className="font-semibold text-gray-700">
              {formatStatName(stat.stat.name)}
            </Text>
            <Text
              style={{ color: Colors.light.text }}
              className="font-bold text-sm"
            >
              {stat.base_stat}
            </Text>
          </View>
          <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <View
              className="h-full rounded-full"
              style={{
                width: `${Math.min(stat.base_stat, 100)}%`,
                backgroundColor: getStatColor(stat.stat.name),
              }}
            />
          </View>
        </View>
      ))}
    </View>
  );
}
