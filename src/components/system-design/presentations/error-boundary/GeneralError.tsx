import { router } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import { AppButton } from "../../forms";
import { AlertCircleIcon, HomeIcon } from "../../utils/icons";
import { AppPrimitive } from "../primitives";
import { SafeAreaView } from "../safe-area-view";

interface GeneralErrorProps {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
  onRetry?: () => void;
  retryText?: string;
}

export function GeneralError({
  title = "Something went wrong",
  message = "We're having trouble loading this content. Please try again.",
  showHomeButton = true,
  onRetry,
  retryText = "Try Again",
}: GeneralErrorProps) {
  const handleGoHome = () => {
    router.replace("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        contentContainerClassName="flex-1 p-6"
        showsVerticalScrollIndicator={false}
      >
        <AppPrimitive className="flex-1 items-center justify-center">
          <AlertCircleIcon className="w-20 h-20 text-muted-foreground mb-6" />

          <AppPrimitive
            as="text"
            className="text-2xl font-bold text-center mb-4"
          >
            {title}
          </AppPrimitive>

          <AppPrimitive
            as="text"
            className="text-center text-muted-foreground mb-8 max-w-xs"
          >
            {message}
          </AppPrimitive>

          <AppPrimitive className="gap-3 w-full max-w-xs">
            {onRetry && (
              <AppButton onPress={onRetry} size="lg" className="w-full">
                <AppPrimitive as="text" className="font-bold text-white">
                  {retryText}
                </AppPrimitive>
              </AppButton>
            )}

            {showHomeButton && (
              <AppButton
                onPress={handleGoHome}
                size="lg"
                className="w-full flex-row items-center justify-center"
              >
                <HomeIcon className="w-4 h-4 mr-2" />
                <AppPrimitive as="text" className="font-bold">
                  Go to Home
                </AppPrimitive>
              </AppButton>
            )}
          </AppPrimitive>
        </AppPrimitive>
      </ScrollView>
    </SafeAreaView>
  );
}
