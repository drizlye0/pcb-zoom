import { NitroModules } from 'react-native-nitro-modules';
import type {
  SignalingCallbacks,
  RTCIceCandidateInfo,
  SignalingServer as SignalingServerSpec,
  CallbackManager as CallbackManagerSpec
} from './specs';

export const SignalingServer =
  NitroModules.createHybridObject<SignalingServerSpec>('SignalingServer');

export const CallbackManager = 
  NitroModules.createHybridObject<CallbackManagerSpec>('CallbackManager')


export type { SignalingCallbacks, RTCIceCandidateInfo };
