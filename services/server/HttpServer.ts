import { BridgeServer } from 'react-native-http-bridge-refurbished';
import { WebRTCProvider } from '../webrtc/types';

const DEV_MODE = true;

export class HttpServer {
  private router: BridgeServer;
  private webrtc: WebRTCProvider;
  private port: number;

  constructor(webrtc: WebRTCProvider, port: number) {
    this.port = port;
    this.webrtc = webrtc;
    this.router = new BridgeServer('http_server', DEV_MODE);
  }

  private setupRoutes() {
    this.router.get('/offer', async (_req, res) => {
      const offer = await this.webrtc.createOffer();
      res.json({ sdp: offer.sdp, type: offer.type }, 200);
    });

    this.router.post('/answer', async (req, res) => {
      const answer: RTCSessionDescriptionInit = JSON.parse(req.data);
      await this.webrtc.handleAnswer(answer);

      res.json({}, 202);
    });

    this.router.post('/icecandidates', async (req, res) => {
      const remoteCandidates: RTCIceCandidateInit[] = JSON.parse(req.data);
      await this.webrtc.handleIceCandidates(remoteCandidates);

      const candidates = this.webrtc.getIceCandidates();
      if (candidates != null) {
        res.json(candidates, 200);
      }

      res.json({}, 204);
    });
  }

  startServer() {
    this.setupRoutes();

    try {
      this.router.listen(this.port);
    } catch (err) {
      // TODO: improve error handling
      console.error('error starting server', err);
      return false;
    }

    return true;
  }

  stopServer() {
    this.router.stop();
  }
}
