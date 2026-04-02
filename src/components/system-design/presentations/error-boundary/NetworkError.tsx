import React from "react";
import { ScrollView } from "react-native";
import { AppButton } from "../../forms";
import { RefreshCwIcon, WifiOffIcon } from "../../utils/icons";
import { AppPrimitive } from "../primitives";
import { SafeAreaView } from "../safe-area-view";

interface NetworkErrorProps {
  onRetry?: () => void;
  message?: string;
}

export function NetworkError({ onRetry, message }: NetworkErrorProps) {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        contentContainerClassName="flex-1 p-6"
        showsVerticalScrollIndicator={false}
      >
        <AppPrimitive className="flex-1 items-center justify-center">
          <WifiOffIcon className="w-20 h-20 text-muted-foreground mb-6" />

          <AppPrimitive
            as="text"
            className="text-2xl font-bold text-center mb-4"
          >
            No Internet Connection
          </AppPrimitive>

          <AppPrimitive
            as="text"
            className="text-center text-muted-foreground mb-8 max-w-xs"
          >
            {message ||
              "Please check your internet connection and try again. Make sure you're connected to WiFi or mobile data."}
          </AppPrimitive>

          {onRetry && (
            <AppButton
              onPress={onRetry}
              size="lg"
              className="w-full max-w-xs flex-row items-center justify-center"
            >
              <RefreshCwIcon className="w-4 h-4 mr-2" />
              <AppPrimitive as="text" className="font-bold text-white">
                Try Again
              </AppPrimitive>
            </AppButton>
          )}

          <AppPrimitive className="mt-12 p-4 bg-muted rounded-lg w-full max-w-xs">
            <AppPrimitive as="text" className="font-semibold mb-2 text-sm">
              Troubleshooting Tips:
            </AppPrimitive>
            <AppPrimitive className="gap-2">
              <AppPrimitive as="text" className="text-muted-foreground text-sm">
                • Check if airplane mode is off
              </AppPrimitive>
              <AppPrimitive as="text" className="text-muted-foreground text-sm">
                • Verify WiFi or mobile data is enabled
              </AppPrimitive>
              <AppPrimitive as="text" className="text-muted-foreground text-sm">
                • Try restarting your device
              </AppPrimitive>
              <AppPrimitive as="text" className="text-muted-foreground text-sm">
                • Move closer to your router
              </AppPrimitive>
            </AppPrimitive>
          </AppPrimitive>
        </AppPrimitive>
      </ScrollView>
    </SafeAreaView>
  );
}
