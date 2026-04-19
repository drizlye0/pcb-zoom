import { WebRTCProvider } from './types';
import { RTCPeerConnection } from 'react-native-webrtc';

export class WebRTCManager implements WebRTCProvider {
  pc: RTCPeerConnection;
  candidates: RTCIceCandidateInit[] = [];

  constructor() {
    this.pc = new RTCPeerConnection();

    this.pc.onicecandidate = (event: any) => {
      if (!event.candidate) return;

      const candidateData: RTCIceCandidateInit = {
        candidate: event.candidate.candidate,
        sdpMid: event.candidate.sdpMid ?? null,
        sdpMLineIndex: event.candidate.sdpMLineIndex ?? null,
      };

      this.candidates.push(candidateData);
    };
  }

  async createOffer() {
    const offer = await this.pc.createOffer();
    await this.pc.setLocalDescription(offer);
    return offer;
  }

  getIceCandidates() {
    if (this.candidates.length < 1) return null;

    return this.candidates;
  }

  async handleAnswer(answer: RTCSessionDescriptionInit) {
    const answerData = new RTCSessionDescription({
      sdp: answer.sdp,
      type: answer.type,
    });

    await this.pc.setRemoteDescription(answerData);
    return;
  }

  async handleIceCandidates(candidates: RTCIceCandidateInit[]) {
    if(candidates.length < 1) return;

    candidates.forEach((candidate) => {
      this.pc.addIceCandidate(candidate);
    });
  }
}
