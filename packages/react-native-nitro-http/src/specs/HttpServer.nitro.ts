import { type HybridObject } from 'react-native-nitro-modules';

export interface HttpServer extends HybridObject<{
  android: 'c++';
}> {
  listen(port: number): void;
  stop(): void;
}

export interface HttpServerKt extends HybridObject<{
 android: "kotlin"
}> {
  startForeground(server: HttpServer, port: number): void;
}
