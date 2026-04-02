import { AppPrimitive } from "@/components/system-design/presentations/primitives";
import { Colors } from "@/constants/Colors";
import { Config } from "@/constants/Configs";
import { Layout } from "@/constants/Layout";
import { NamedAPIResource } from "@/data/models";
import { useRouter } from "expo-router";
import React from "react";
import { Image, TouchableOpacity } from "react-native";

interface Props {
  item: NamedAPIResource;
}

export const PokemonCard = ({ item }: Props) => {
  const router = useRouter();
  const id = item.url.split("/").filter(Boolean).pop();
  const imageUrl = `${Config.links.artworkBaseUrl}/${id}.png`;

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/PokemonDetail",
          params: { name: item.name },
        })
      }
      activeOpacity={0.7}
      style={{
        width: Layout.window.width / 2 - 24,
        backgroundColor: Colors.light.surface,
      }}
      className="rounded-[32px] p-4 mb-4 shadow-sm shadow-black/5 items-center mx-2 border border-gray-50"
    >
      <AppPrimitive className="w-24 h-24 bg-gray-50 rounded-full items-center justify-center mb-3">
        <Image
          source={{ uri: imageUrl }}
          className="w-20 h-20"
          resizeMode="contain"
        />
      </AppPrimitive>

      <AppPrimitive
        as="text"
        style={{ color: Colors.light.text }}
        className="font-bold text-sm capitalize text-center"
      >
        {item.name}
      </AppPrimitive>

      <AppPrimitive className="mt-1 opacity-20">
        <AppPrimitive
          as="text"
          className="text-[9px] font-bold uppercase tracking-widest"
        >
          Details
        </AppPrimitive>
      </AppPrimitive>
    </TouchableOpacity>
  );
};
