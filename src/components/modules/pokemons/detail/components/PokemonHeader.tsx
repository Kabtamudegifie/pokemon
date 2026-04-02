import { AppPrimitive } from "@/components/system-design/presentations/primitives";
import { Colors } from "@/constants/Colors";
import { getTypeColor } from "@/constants/Pokemon";
import { Pokemon } from "@/data/models";
import React from "react";
import { Image } from "react-native";

export function PokemonHeader({ data }: { data: Pokemon }) {
  const formattedId = `#${data.id.toString().padStart(3, "0")}`;
  const primaryTypeColor = getTypeColor(data.types[0].type.name);

  return (
    <AppPrimitive
      style={{ backgroundColor: Colors.light.surface }}
      className="rounded-2xl flex-row overflow-hidden border border-gray-100 shadow-sm"
    >
      <AppPrimitive className="flex-1 p-4 justify-center">
        <AppPrimitive
          as="text"
          className="text-gray-400 font-bold text-xs mb-1"
        >
          {formattedId}
        </AppPrimitive>
        <AppPrimitive
          as="text"
          style={{ color: Colors.light.text }}
          className="text-xl font-black capitalize mb-3"
        >
          {data.name}
        </AppPrimitive>
        <AppPrimitive className="flex-row flex-wrap gap-1">
          {data.types.map((t, index) => (
            <AppPrimitive
              key={index}
              className="px-2 py-0.5 rounded-md"
              style={{ backgroundColor: getTypeColor(t.type.name) }}
            >
              <AppPrimitive
                as="text"
                className="text-[10px] text-white font-bold uppercase"
              >
                {t.type.name}
              </AppPrimitive>
            </AppPrimitive>
          ))}
        </AppPrimitive>
      </AppPrimitive>

      <AppPrimitive className="relative w-32 items-center justify-center">
        <AppPrimitive
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
      </AppPrimitive>
    </AppPrimitive>
  );
}
