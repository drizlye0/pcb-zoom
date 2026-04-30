import type { HybridObject } from 'react-native-nitro-modules';
import type { HttpServer } from './HttpServer.nitro';

export interface RTCDescriptionInit {
  sdp: string;
  type: string;
}

export interface RTCIceCandidatesInit {
  candidate: string | undefined;
  sdpMLineIndex: number | undefined;
  usernameFragment: string | undefined;
  sdpMid: string | undefined;
}

export interface SignalingCallbacks {
  offerCb: () => RTCDescriptionInit;
  answerCb: (answer: RTCDescriptionInit) => void;
  iceCandidatesCb: (candidates: RTCIceCandidatesInit[]) => RTCIceCandidatesInit[] | undefined;
}

export interface ServerManager extends HybridObject<{
  android: 'c++';
}> {
  createSignalingServer(callbacks: SignalingCallbacks): HttpServer;
}
