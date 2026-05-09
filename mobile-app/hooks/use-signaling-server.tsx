import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from 'react';
import { webrtcManager } from '@/services';
import { RTCIceCandidate } from 'react-native-webrtc';
import { RTCSessionDescriptionInit } from 'react-native-webrtc/lib/typescript/RTCSessionDescription';
import {
  createSignalingServer,
  HttpServer,
  RTCIceCandidateInfo,
} from 'react-native-nitro-http';

type ServerStatus = 'stopped' | 'disconnected' | 'connected';

interface SignalingServerContextType {
  status: ServerStatus;
  listen: (port: number) => void;
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
  const serverRef = useRef<HttpServer | null>(null);

  const offerCb = async () => {
    const offer =
      (await webrtcManager.createOffer()) as RTCSessionDescriptionInit;
    return offer;
  };

  const answerCb = async (answer: RTCSessionDescriptionInit) => {
    console.log('handle answer: ', JSON.stringify(answer));
    await webrtcManager.handleAnswer(answer);
  };

  const iceCandidatesCb = async (candidateInfo: RTCIceCandidateInfo[]) => {
    const remoteCandidates = candidateInfo.map((c) => {
      const candidate = new RTCIceCandidate({
        candidate: c.candidate,
        sdpMid: c.sdpMid,
        sdpMLineIndex: c.sdpMLineIndex,
      });

      return candidate;
    });

    console.log('remote candidates: ', JSON.stringify(remoteCandidates));
    await webrtcManager.handleIceCandidates(remoteCandidates);
    const localCandidates = webrtcManager.getIceCandidates();

    if (localCandidates == null) {
      return undefined;
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
  };

  useEffect(() => {
    serverRef.current = createSignalingServer({
      offerCb,
      answerCb,
      iceCandidatesCb,
    });

    return () => {
      serverRef.current?.stop();
      serverRef.current = null;
    };
  }, []);

  const listen = (port: number) => {
    serverRef.current?.listen(port);
    setStatus('disconnected');
  };

  const stop = () => {
    serverRef.current?.stop();
    setStatus('stopped');
  };

  return (
    <SignalingServerContext.Provider value={{ status, listen, stop }}>
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
