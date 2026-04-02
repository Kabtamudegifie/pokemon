import { AppPrimitive } from "@/components/system-design/presentations/primitives";
import { Colors } from "@/constants/Colors";
import { formatHeight } from "@/constants/Pokemon";
import { Pokemon } from "@/data/models";
import React from "react";

export function PokemonPhysicalInfo({ data }: { data: Pokemon }) {
  const height = formatHeight(data.height);
  const weightKg = (data.weight / 10).toFixed(1);
  const weightLbs = (parseFloat(weightKg) * 2.20462).toFixed(1);

  return (
    <AppPrimitive
      style={{
        backgroundColor: Colors.light.surface,
        borderColor: Colors.light.border,
      }}
      className="rounded-2xl p-6 border shadow-sm"
    >
      <AppPrimitive className="flex-row items-center">
        <AppPrimitive className="flex-1 items-center">
          <AppPrimitive
            as="text"
            className="text-[11px] font-bold text-gray-400 uppercase mb-1"
          >
            Height
          </AppPrimitive>
          <AppPrimitive className="flex-row items-baseline gap-1">
            <AppPrimitive
              as="text"
              style={{ color: Colors.light.text }}
              className="text-lg font-black"
            >
              {height.ftIn}
            </AppPrimitive>
            <AppPrimitive as="text" className="text-[11px] text-gray-500">
              {height.meters}
            </AppPrimitive>
          </AppPrimitive>
        </AppPrimitive>
        <AppPrimitive className="w-[1px] h-8 bg-gray-100" />
        <AppPrimitive className="flex-1 items-center">
          <AppPrimitive
            as="text"
            className="text-[11px] font-bold text-gray-400 uppercase mb-1"
          >
            Weight
          </AppPrimitive>
          <AppPrimitive className="flex-row items-baseline gap-1">
            <AppPrimitive
              as="text"
              style={{ color: Colors.light.text }}
              className="text-lg font-black"
            >
              {weightLbs}
            </AppPrimitive>
            <AppPrimitive
              as="text"
              className="text-[11px] text-gray-400 font-bold uppercase"
            >
              lbs
            </AppPrimitive>
            <AppPrimitive as="text" className="text-[11px] text-gray-500 ml-1">
              ({weightKg}kg)
            </AppPrimitive>
          </AppPrimitive>
        </AppPrimitive>
      </AppPrimitive>
    </AppPrimitive>
  );
}
