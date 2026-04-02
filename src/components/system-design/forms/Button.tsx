import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet } from "react-native";
import { Button, ButtonProps } from "react-native-paper";

type AppButtonProps = ButtonProps & {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  loadingShrink?: boolean;
};

export function AppButton({
  variant = "primary",
  size = "md",
  loading,
  loadingShrink,
  style,
  contentStyle,
  labelStyle,
  children,
  ...props
}: AppButtonProps) {
  const isPrimary = variant === "primary";
  const isSmall = size === "sm";

  return (
    <Button
      mode={isPrimary ? "contained" : "text"}
      buttonColor={isPrimary ? Colors.light.primary : "transparent"}
      textColor={isPrimary ? "#fff" : Colors.light.primary}
      style={[
        styles.base,
        isSmall && styles.small,
        !isSmall && styles.medium,
        style,
      ]}
      contentStyle={[
        styles.contentBase,
        isSmall && styles.contentSmall,
        !isSmall && styles.contentMedium,
        loading && loadingShrink && styles.loadingContent,
        contentStyle,
      ]}
      labelStyle={[
        styles.labelBase,
        isSmall && styles.labelSmall,
        !isSmall && styles.labelMedium,
        loading && loadingShrink && styles.loadingLabel,
        labelStyle,
      ]}
      loading={loading}
      {...props}
    >
      {loading && loadingShrink ? "" : children}
    </Button>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 999,
  },

  small: {
    height: 32,
  },
  medium: {
    height: 56,
    borderRadius: 16,
  },

  contentBase: {
    justifyContent: "center",
    alignItems: "center",
  },
  contentSmall: {
    height: 32,
    paddingHorizontal: 16,
  },
  contentMedium: {
    height: 56,
  },

  labelBase: {
    fontWeight: "700",
  },
  labelSmall: {
    fontSize: 11,
    lineHeight: 14,
    marginHorizontal: 0,
    includeFontPadding: false,
  },
  labelMedium: {
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  loadingContent: {
    width: 44,
    paddingHorizontal: 0,
  },
  loadingLabel: {
    opacity: 0,
    marginHorizontal: 0,
  },
});
