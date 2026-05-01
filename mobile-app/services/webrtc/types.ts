import { RTCSessionDescriptionInit } from 'react-native-webrtc/lib/typescript/RTCSessionDescription';

export interface WebRTCProvider {
  createOffer: () => Promise<RTCSessionDescriptionInit>;
  handleAnswer: (answer: RTCSessionDescriptionInit) => Promise<void>;
  handleIceCandidates: (candidates: RTCIceCandidateInit[]) => Promise<void>;
  getIceCandidates: () => RTCIceCandidateInit[] | null;
}
