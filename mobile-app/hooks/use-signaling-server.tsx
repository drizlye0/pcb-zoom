import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';
import { webrtcManager } from '@/services';
import { RTCIceCandidate } from 'react-native-webrtc';
import { RTCSessionDescriptionInit } from 'react-native-webrtc/lib/typescript/RTCSessionDescription';
import {
  SignalingServer,
  CallbackManager,
  RTCIceCandidateInfo,
} from 'react-native-nitro-http';

type ServerStatus = 'stopped' | 'disconnected' | 'connected';

interface SignalingServerContextType {
  status: ServerStatus;
  startForeground: (port: number) => void;
  stop: () => void;
}

const SignalingServerContext = createContext<SignalingServerContextType | null>(
  null,
);

export const SignalingServerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [status, setStatus] = useState<ServerStatus>('stopped');

  CallbackManager.setOffer(async () => {
    return await webrtcManager.createOffer()
  });

  CallbackManager.setAnswer(async (answer: RTCSessionDescriptionInit) => {
    console.log('handle answer: ', JSON.stringify(answer));
    await webrtcManager.handleAnswer(answer);
  });

  CallbackManager.setIceCandidate((candidateInfo: RTCIceCandidateInfo[]) => {
    const remoteCandidates = candidateInfo.map((c) => {
      const candidate = new RTCIceCandidate({
        candidate: c.candidate,
        sdpMid: c.sdpMid,
        sdpMLineIndex: c.sdpMLineIndex,
      });

      return candidate;
    });

    console.log('remote candidates: ', JSON.stringify(remoteCandidates));
    let localCandidates: RTCIceCandidateInit[] | null = [];

    webrtcManager.handleIceCandidates(remoteCandidates).then(() => {
      localCandidates = webrtcManager.getIceCandidates();
    });

    if (localCandidates === null) {
      return [];
    }

    const localCandidatesInfo = localCandidates.map((c) => {
      const candidateInfo: RTCIceCandidateInfo = {
        candidate: c.candidate ?? '',
        sdpMLineIndex: c.sdpMLineIndex ?? 0,
        sdpMid: c.sdpMid ?? '',
      };

      return candidateInfo;
    });

    return localCandidatesInfo;
  });

  const startForeground = (port: number) => {
    SignalingServer.startForeground(port);
    setStatus('disconnected');
  };

  const stop = () => {
    SignalingServer.stop();
    setStatus('stopped');
  };

  return (
    <SignalingServerContext.Provider value={{ status, startForeground, stop }}>
      {children}
    </SignalingServerContext.Provider>
  );
};

export const useSignalingServer = () => {
  const context = useContext(SignalingServerContext);
  if (!context) {
    throw new Error(
      'useSignalingServer must be used within SignalingServerProvider',
    );
  }
  return context;
};
