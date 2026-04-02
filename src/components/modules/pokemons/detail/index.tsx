import { SafeAreaView } from "@/components/system-design/presentations";
import { Pokemon } from "@/data/models";
import { useFetch } from "@/libs/api/useFetch";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const getTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    grass: "bg-[#78c850]",
    poison: "bg-[#a040a0]",
    fire: "bg-[#f08030]",
    water: "bg-[#6890f0]",
    bug: "bg-[#a8b820]",
    normal: "bg-[#a8a878]",
    electric: "bg-[#f8d030]",
    ground: "bg-[#e0c068]",
    fairy: "bg-[#ee99ac]",
    fighting: "bg-[#c03028]",
    psychic: "bg-[#f85888]",
    rock: "bg-[#b8a038]",
    ghost: "bg-[#705898]",
    ice: "bg-[#98d8d8]",
    dragon: "bg-[#7038f8]",
  };
  return colors[type.toLowerCase()] || "bg-gray-400";
};

const getStatColor = (name: string): string => {
  const colors: Record<string, string> = {
    hp: "bg-[#4fc1a6]",
    attack: "bg-[#f7776a]",
    defense: "bg-[#f8d030]",
    speed: "bg-[#f7776a]",
  };
  return colors[name.toLowerCase()] || "bg-gray-300";
};

const formatStatName = (name: string): string => {
  const map: Record<string, string> = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    speed: "Speed",
  };
  return map[name.toLowerCase()] || name;
};

const formatHeight = (heightDm: number) => {
  const meters = (heightDm / 10).toFixed(1);
  const totalInches = Math.round((heightDm / 10) * 39.3701);
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return {
    ftIn: `${feet}'${inches.toString().padStart(2, "0")}"`,
    meters: `${meters} m`,
  };
};

export default function PokemonDetail() {
  const { name: pokemonId } = useLocalSearchParams<{ name: string }>();

  const { data, isLoading, error } = useFetch<Pokemon>(
    ["pokemon", pokemonId],
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#1a38b1]">
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  if (error || !data) return null;

  const formattedId = `#${data.id.toString().padStart(3, "0")}`;
  const height = formatHeight(data.height);
  const weightKg = (data.weight / 10).toFixed(1);
  const weightLbs = (parseFloat(weightKg) * 2.20462).toFixed(1);

  const displayStats = data.stats.filter((s) =>
    ["hp", "attack", "defense", "speed"].includes(s.stat.name),
  );

  return (
    <SafeAreaView className="flex-1 bg-[#1a38b1]">
      <ScrollView
        className="flex-1 px-4 pt-6"
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white rounded-[35px] p-6 mb-4 shadow-xl">
          <Text className="text-gray-400 font-bold text-lg">{formattedId}</Text>
          <Text className="text-[#2c3e8c] text-4xl font-extrabold capitalize mt-1 mb-4">
            {data.name}
          </Text>

          <View className="flex-row gap-2 mb-8">
            {data.types.map((t) => (
              <View
                key={t.type.name}
                className={`px-5 py-1 rounded-md ${getTypeColor(t.type.name)}`}
              >
                <Text className="text-white font-bold text-xs capitalize">
                  {t.type.name}
                </Text>
              </View>
            ))}
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-4">
              {displayStats.map((s) => (
                <View key={s.stat.name} className="mb-4">
                  <Text className="text-gray-500 font-bold text-xs mb-1">
                    {formatStatName(s.stat.name)}
                  </Text>
                  <View className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <View
                      className={`h-full ${getStatColor(s.stat.name)}`}
                      style={{ width: `${Math.min(s.base_stat, 100)}%` }}
                    />
                  </View>
                </View>
              ))}
            </View>

            <View className="flex-1 items-end">
              <Image
                source={{
                  uri:
                    (data.sprites.other?.["official-artwork"]?.front_default ||
                      data.sprites.front_default) ??
                    undefined,
                }}
                className="w-40 h-40"
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        <View className="bg-white rounded-[35px] p-6 mb-4 shadow-xl">
          <Text className="text-xl font-extrabold text-gray-800 mb-5">
            Breeding
          </Text>
          <View className="flex-row justify-between gap-4">
            <View className="flex-1">
              <Text className="text-center text-gray-400 font-bold mb-2 uppercase text-[10px] tracking-widest">
                Height
              </Text>
              <View className="bg-gray-50 border border-gray-100 py-4 rounded-2xl items-center">
                <Text className="font-bold text-gray-800 text-xl">
                  {height.ftIn}
                </Text>
                <Text className="text-gray-400 text-xs mt-0.5">
                  {height.meters}
                </Text>
              </View>
            </View>
            <View className="flex-1">
              <Text className="text-center text-gray-400 font-bold mb-2 uppercase text-[10px] tracking-widest">
                Weight
              </Text>
              <View className="bg-gray-50 border border-gray-100 py-4 rounded-2xl items-center">
                <Text className="font-bold text-gray-800 text-xl">
                  {weightLbs} lbs
                </Text>
                <Text className="text-gray-400 text-xs mt-0.5">
                  {weightKg} kg
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="bg-white rounded-[35px] p-6 mb-10 shadow-xl flex-row justify-between items-center">
          <View>
            <Text className="text-xl font-extrabold text-gray-800">Moves</Text>
          </View>
          <TouchableOpacity className="bg-[#212121] px-8 py-3 rounded-full">
            <Text className="text-white font-bold">See all</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
