import { WebRTCProvider } from './types';
import {
  RTCPeerConnection,
  MediaStream,
  mediaDevices,
} from 'react-native-webrtc';

import { RTCSessionDescriptionInit } from 'react-native-webrtc/lib/typescript/RTCSessionDescription';

export class WebRTCManager implements WebRTCProvider {
  pc: RTCPeerConnection;
  candidates: RTCIceCandidateInit[] = [];
  localStream: MediaStream | null = null;

  constructor() {
    this.pc = new RTCPeerConnection();
    this.pc.onicecandidate = (event: any) => {
      if (!event.candidate) return;

      const candidateData: RTCIceCandidateInit = {
        candidate: event.candidate.candidate,
        sdpMid: event.candidate.sdpMid ?? null,
        sdpMLineIndex: event.candidate.sdpMLineIndex ?? null,
      };

      console.log("local ice candidate: ", candidateData);
      this.candidates.push(candidateData);
    };
  }

  async startLocalStream() {
    this.localStream = await mediaDevices.getUserMedia({
      // TODO: change to settings config
      video: {
        frameRate: 30,
        facingMode: 'environment',
      },
    });

    this.localStream?.getTracks().forEach((track) => {
      this.pc.addTrack(track);
    });
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
    await this.pc.setRemoteDescription(answer);
    return;
  }

  async handleIceCandidates(candidates: RTCIceCandidateInit[]) {
    if (candidates.length < 1) return;

    candidates.forEach((candidate) => {
      this.pc.addIceCandidate(candidate);
    });
  }
}
