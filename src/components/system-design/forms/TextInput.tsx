import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";

type AppTextInputProps = TextInputProps & {
  size?: "sm" | "md";
};

export function AppTextInput({
  size = "sm",
  style,
  contentStyle,
  ...props
}: AppTextInputProps) {
  const isSmall = size === "sm";

  return (
    <TextInput
      mode="outlined"
      dense
      selectionColor={Colors.light.text}
      cursorColor={Colors.light.text}
      activeOutlineColor="transparent"
      outlineStyle={styles.outline}
      style={[isSmall ? styles.inputSmall : styles.inputMedium, style]}
      contentStyle={[
        isSmall ? styles.contentSmall : styles.contentMedium,
        contentStyle,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  outline: {
    borderRadius: 999,
    borderWidth: 0,
  },
  inputSmall: {
    flex: 1,
    height: 44,
    backgroundColor: "white",
  },
  inputMedium: {
    flex: 1,
    height: 56,
    backgroundColor: "white",
  },
  contentSmall: {
    fontSize: 14,
    paddingLeft: 4,
  },
  contentMedium: {
    fontSize: 16,
    paddingLeft: 8,
  },
});
