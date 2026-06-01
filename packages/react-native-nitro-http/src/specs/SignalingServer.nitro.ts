import { type HybridObject } from 'react-native-nitro-modules';

export interface SignalingServer extends HybridObject<{
  android: 'kotlin'
}> {
  startForeground(port: number): void;
  stop(): void;
}
