import { type HybridObject } from 'react-native-nitro-modules';

export interface HttpServer extends HybridObject<{
  android: 'c++';
}> {
  listen(port: number): void;
  stop(): void;
}

export interface HttpForegroundService extends HybridObject<{
  android: 'kotlin';
}> {
  startForeground(task: () => void): void;
  stopForeground(cb: () => void): void;
}
