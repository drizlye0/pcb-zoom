import { HttpServer } from './server/HttpServer';
import { WebRTCManager } from './webrtc/WebRTCManager';

// TODO: change to settings config
const PORT = 8080;

const webrtcManager = new WebRTCManager();
const httpServer = new HttpServer(webrtcManager, PORT);

export { webrtcManager, httpServer };
