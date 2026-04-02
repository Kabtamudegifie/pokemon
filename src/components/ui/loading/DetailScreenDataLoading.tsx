import { AppPrimitive } from "@/components/system-design/presentations/primitives";
import { Colors } from "@/constants/Colors";
import React from "react";
import { ActivityIndicator } from "react-native-paper";

export default function DetailScreenDataLoading() {
  return (
    <AppPrimitive
      className="flex-1 justify-center items-center"
      style={{ backgroundColor: Colors.light.background }}
    >
      <ActivityIndicator size="large" color={Colors.light.primary} />
    </AppPrimitive>
  );
}
