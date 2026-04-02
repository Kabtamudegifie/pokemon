import { cssInterop } from "nativewind";
import React from "react";
import {
  TextProps as RNTextProps,
  StyleProp,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { Text } from "react-native-paper";

cssInterop(Text, { className: "style" });
cssInterop(View, { className: "style" });

type PrimitiveProps = {
  as?: "text" | "view";
  children?: React.ReactNode;
} & Omit<RNTextProps, "style"> &
  Omit<ViewProps, "style"> & {
    style?: StyleProp<TextStyle> | StyleProp<ViewStyle>;
  };

export const AppPrimitive = ({
  as = "view",
  children,
  ...props
}: PrimitiveProps) => {
  if (as === "text") {
    return (
      <Text
        {...(props as any)}
        style={[
          { backgroundColor: "transparent" },
          props.style as StyleProp<TextStyle>,
        ]}
      >
        {children}
      </Text>
    );
  }

  return (
    <View {...(props as any)} style={props.style as StyleProp<ViewStyle>}>
      {children}
    </View>
  );
};
