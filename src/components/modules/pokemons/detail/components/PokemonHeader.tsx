import { Colors } from "@/constants/Colors";
import { getTypeColor } from "@/constants/Pokemon";
import { Pokemon } from "@/data/models";
import React from "react";
import { Image, Text, View } from "react-native";

type PokemonHeaderProps = { data: Pokemon };

export function PokemonHeader({ data }: PokemonHeaderProps) {
  const formattedId = `#${data.id.toString().padStart(3, "0")}`;
  const primaryTypeColor = getTypeColor(data.types[0].type.name);

  return (
    <View
      style={{ backgroundColor: Colors.light.surface }}
      className="rounded-2xl flex-row overflow-hidden border border-gray-100 shadow-sm"
    >
      {/* Left Side: Info */}
      <View className="flex-1 p-4 justify-center">
        <Text className="text-gray-400 font-bold text-xs mb-1">
          {formattedId}
        </Text>

        <Text
          style={{ color: Colors.light.text }}
          className="text-xl font-black capitalize mb-3"
        >
          {data.name}
        </Text>

        <View className="flex-row flex-wrap gap-1">
          {data.types.map((t, index) => (
            <View
              key={index}
              className="px-2 py-0.5 rounded-md"
              style={{ backgroundColor: getTypeColor(t.type.name) }}
            >
              <Text className="text-[10px] text-white font-bold uppercase">
                {t.type.name}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Right Side: Image with subtle background splash */}
      <View className="relative w-32 items-center justify-center">
        <View
          className="absolute right-[-20] w-32 h-32 rounded-full opacity-10"
          style={{ backgroundColor: primaryTypeColor }}
        />
        <Image
          source={{
            uri:
              data.sprites.other?.["official-artwork"]?.front_default ||
              data.sprites.front_default ||
              "",
          }}
          className="w-24 h-24"
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
