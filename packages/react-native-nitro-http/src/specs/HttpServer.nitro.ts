import { type HybridObject } from "react-native-nitro-modules"

export interface HttpServer extends HybridObject<{
  android: "c++"
}> {
  start(port: number): void;
  stop(): void;
}
