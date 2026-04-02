import { AppPrimitive } from "@/components/system-design/presentations/primitives";
import { Colors } from "@/constants/Colors";
import { formatStatName, getStatColor } from "@/constants/Pokemon";
import { Pokemon } from "@/data/models";
import React from "react";

export function PokemonStats({ data }: { data: Pokemon }) {
  const displayStats = data.stats.filter((s) =>
    ["hp", "attack", "defense", "speed"].includes(s.stat.name),
  );

  return (
    <AppPrimitive
      style={{
        backgroundColor: Colors.light.surface,
        borderColor: Colors.light.border,
      }}
      className="rounded-3xl p-6 shadow-xl border"
    >
      <AppPrimitive
        as="text"
        className="text-gray-500 font-semibold text-xs tracking-widest"
      >
        BASE STATS
      </AppPrimitive>
      {displayStats.map((stat) => (
        <AppPrimitive key={stat.stat.name} className="mb-3">
          <AppPrimitive className="flex-row justify-between mb-2">
            <AppPrimitive as="text" className="font-semibold text-gray-700">
              {formatStatName(stat.stat.name)}
            </AppPrimitive>
            <AppPrimitive
              as="text"
              style={{ color: Colors.light.text }}
              className="font-bold text-sm"
            >
              {stat.base_stat}
            </AppPrimitive>
          </AppPrimitive>
          <AppPrimitive className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <AppPrimitive
              className="h-full rounded-full"
              style={{
                width: `${Math.min(stat.base_stat, 100)}%`,
                backgroundColor: getStatColor(stat.stat.name),
              }}
            />
          </AppPrimitive>
        </AppPrimitive>
      ))}
    </AppPrimitive>
  );
}
