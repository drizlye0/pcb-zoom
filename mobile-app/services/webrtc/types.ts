export interface WebRTCProvider {
  createOffer: () => Promise<RTCSessionDescriptionInit>;
  handleAnswer: (answer: RTCSessionDescriptionInit) => Promise<void>;
  handleIceCandidates: (candidates: RTCIceCandidateInit[]) => Promise<void>;
  getIceCandidates: () => RTCIceCandidateInit[] | null;
}
