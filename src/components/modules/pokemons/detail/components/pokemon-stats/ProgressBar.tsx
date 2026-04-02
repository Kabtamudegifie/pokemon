import { AppPrimitive } from "@/components/system-design/presentations/primitives";
import { Colors } from "@/constants/Colors";
import { formatStatName, getStatColor } from "@/constants/Pokemon";
import React from "react";
interface Props {
  name: string;
  base_stat: number;
}
export default function ProgressBar({ name, base_stat }: Props) {
  return (
    <AppPrimitive key={name} className="mb-3">
      <AppPrimitive className="flex-row justify-between mb-2">
        <AppPrimitive as="text" className="font-semibold text-gray-700">
          {formatStatName(name)}
        </AppPrimitive>
        <AppPrimitive
          as="text"
          style={{ color: Colors.light.text }}
          className="font-bold text-sm"
        >
          {base_stat}
        </AppPrimitive>
      </AppPrimitive>
      <AppPrimitive className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <AppPrimitive
          className="h-full rounded-full"
          style={{
            width: `${Math.min(base_stat, 100)}%`,
            backgroundColor: getStatColor(name),
          }}
        />
      </AppPrimitive>
    </AppPrimitive>
  );
}
