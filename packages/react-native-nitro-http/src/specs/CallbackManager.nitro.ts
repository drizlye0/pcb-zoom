import type { HybridObject } from "react-native-nitro-modules";
import type { RTCSessionDescriptionInit } from "react-native-webrtc/lib/typescript/RTCSessionDescription";
import type { RTCIceCandidateInfo } from "./types";

export interface CallbackManager extends HybridObject<{
  android: "c++"
}> {
  setOffer(cb: () => RTCSessionDescriptionInit): void;
  setAnswer(cb: (answer: RTCSessionDescriptionInit) => void): void;
  setIceCandidate(cb: (c: RTCIceCandidateInfo[]) => RTCIceCandidateInfo[]): void;
}
