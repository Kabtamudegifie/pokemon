import { router } from "expo-router";
import React, { Component, ReactNode } from "react";
import { Pressable, ScrollView } from "react-native";
import { AppButton } from "../../system-design/forms";
import { AppPrimitive } from "../../system-design/presentations/primitives";
import { SafeAreaView } from "../../system-design/presentations/safe-area-view";
import {
  AlertCircleIcon,
  HomeIcon,
  RefreshCwIcon,
} from "../../system-design/utils";

interface Props {
  children: ReactNode;
  fallback?: (error: Error, resetError: () => void) => ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleReload = () => {
    this.resetError();
    router.replace("/");
  };

  handleGoHome = () => {
    this.resetError();
    router.replace("/");
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error!, this.resetError);
      }

      return (
        <SafeAreaView className="flex-1 bg-background">
          <ScrollView
            contentContainerClassName="flex-1 p-6"
            showsVerticalScrollIndicator={false}
          >
            <AppPrimitive className="flex-1 items-center justify-center">
              <AlertCircleIcon className="w-20 h-20 text-destructive mb-6" />

              <AppPrimitive
                as="text"
                className="text-2xl font-bold text-center mb-4"
              >
                Oops! Something went wrong
              </AppPrimitive>

              <AppPrimitive
                as="text"
                className="text-center text-muted-foreground mb-8 max-w-xs"
              >
                We encountered an unexpected error. Don&apos;t worry, you can
                try reloading the app or go back to home.
              </AppPrimitive>

              <AppPrimitive className="gap-3 w-full max-w-xs">
                <AppButton
                  onPress={this.handleReload}
                  size="lg"
                  className="w-full flex-row items-center justify-center"
                >
                  <RefreshCwIcon className="w-4 h-4 mr-2" />
                  <AppPrimitive as="text" className="text-white font-bold">
                    Reload App
                  </AppPrimitive>
                </AppButton>

                <AppButton
                  onPress={this.handleGoHome}
                  size="lg"
                  className="w-full flex-row items-center justify-center"
                >
                  <HomeIcon className="w-4 h-4 mr-2" />
                  <AppPrimitive as="text" className="font-bold">
                    Go to Home
                  </AppPrimitive>
                </AppButton>
              </AppPrimitive>

              {__DEV__ && this.state.error && (
                <Pressable className="mt-8 p-4 bg-muted rounded-lg w-full max-w-sm">
                  <AppPrimitive
                    as="text"
                    className="font-semibold mb-2 text-sm"
                  >
                    Error Details (Dev Only):
                  </AppPrimitive>
                  <AppPrimitive
                    as="text"
                    className="text-xs text-destructive font-mono"
                  >
                    {this.state.error.message}
                  </AppPrimitive>
                  {this.state.errorInfo && (
                    <AppPrimitive
                      as="text"
                      className="text-xs text-muted-foreground mt-2 font-mono"
                    >
                      {this.state.errorInfo.componentStack?.slice(0, 200)}...
                    </AppPrimitive>
                  )}
                </Pressable>
              )}
            </AppPrimitive>
          </ScrollView>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}
