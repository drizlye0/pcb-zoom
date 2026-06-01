import { type RTCSessionDescriptionInit } from 'react-native-webrtc/lib/typescript/RTCSessionDescription';

export interface RTCIceCandidateInfo {
  candidate: string;
  sdpMLineIndex: number;
  sdpMid: string;
}

export interface SignalingCallbacks {
  offerCb: () => Promise<RTCSessionDescriptionInit>;
  answerCb: (answer: RTCSessionDescriptionInit) => Promise<void>;
  iceCandidatesCb: (
    candidates: RTCIceCandidateInfo[]
  ) => Promise<RTCIceCandidateInfo[] | undefined>;
}
