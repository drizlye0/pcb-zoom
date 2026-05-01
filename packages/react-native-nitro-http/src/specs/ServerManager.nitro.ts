import type { HybridObject } from 'react-native-nitro-modules';
import type { HttpServer } from './HttpServer.nitro';
import { type RTCSessionDescriptionInit } from 'react-native-webrtc/lib/typescript/RTCSessionDescription';

export interface RTCIceCandidateInfo {
  candidate: string;
  sdpMLineIndex: number | null;
  sdpMid: string | null;
}

export interface SignalingCallbacks {
  offerCb: () => Promise<RTCSessionDescriptionInit>;
  answerCb: (answer: RTCSessionDescriptionInit) => Promise<void>;
  iceCandidatesCb: (
    candidates: RTCIceCandidateInfo[]
  ) => Promise<RTCIceCandidateInfo[] | undefined>;
}

export interface ServerManager extends HybridObject<{
  android: 'c++';
}> {
  createSignalingServer(callbacks: SignalingCallbacks): HttpServer;
}
