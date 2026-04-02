import { Button } from "@/components/system-design/forms";
import { SafeAreaView } from "@/components/system-design/presentations";
import { AppPrimitive } from "@/components/system-design/presentations/primitives";
import { Link, Stack } from "expo-router";

export function NotFound() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <SafeAreaView className="flex-1 bg-background">
        <AppPrimitive className="flex-1 items-center justify-center p-5">
          <AppPrimitive as="text" className="text-5xl font-black mb-4">
            404
          </AppPrimitive>

          <AppPrimitive as="text" className="text-2xl font-bold mb-2">
            Page not found
          </AppPrimitive>

          <AppPrimitive as="text" className="text-gray-500 text-center mb-8">
            This screen does not exist.
          </AppPrimitive>

          <Link href="/" asChild>
            <Button variant="default">
              <AppPrimitive as="text" className="font-bold text-white">
                Go to home screen
              </AppPrimitive>
            </Button>
          </Link>
        </AppPrimitive>
      </SafeAreaView>
    </>
  );
}
