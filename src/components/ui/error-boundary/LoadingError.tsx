import { AppPrimitive } from "@/components/system-design/presentations/primitives";
import { Colors } from "@/constants/Colors";
import React from "react";
interface Props {
  error: string;
}
export default function LoadingError({ error }: Props) {
  return (
    <AppPrimitive
      className="flex-1 justify-center items-center"
      style={{ backgroundColor: Colors.light.background }}
    >
      <AppPrimitive as="text" className="text-red-500 text-lg">
        {error}
      </AppPrimitive>
    </AppPrimitive>
  );
}
