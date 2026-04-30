import { NitroModules } from 'react-native-nitro-modules';
import type { HttpServer, ServerManager, SignalingCallbacks } from './specs';

const HybridServerManager =
  NitroModules.createHybridObject<ServerManager>('ServerManager');

export const createSignalingServer = (callbacks: SignalingCallbacks) => {
  const signalingServer = HybridServerManager.createSignalingServer(callbacks);
  return signalingServer;
};

export type { HttpServer, ServerManager, SignalingCallbacks };
