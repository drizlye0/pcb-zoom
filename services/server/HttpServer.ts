import { BridgeServer, respond } from 'react-native-http-bridge-refurbished';
import { WebRTCProvider } from '../webrtc/types';
import { homepage } from './public';

const DEV_MODE = true;

export type HttpServiceStatus = 'started' | 'stoped';
type Listener = (status: HttpServiceStatus) => void;

export class HttpServer {
  private router: BridgeServer;
  private webrtc: WebRTCProvider;
  private port: number;
  private status: HttpServiceStatus = 'stoped';
  private listeners: Set<Listener> = new Set();

  constructor(webrtc: WebRTCProvider, port: number) {
    this.port = port;
    this.webrtc = webrtc;
    this.router = new BridgeServer('http_server', DEV_MODE);
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.status));
  }

  private setupRoutes() {
    this.router.get('/', async (req, res) => {
      res.html(homepage, 200);
    });

    this.router.get('/offer', async (_req, res) => {
      console.log('GET /offer');
      const offer = await this.webrtc.createOffer();
      res.json({ sdp: offer.sdp, type: offer.type }, 200);
      res.send(200, 'application-json', '');
    });

    this.router.post('/answer', async (req, res) => {
      console.log('POST /answer');
      const answer: RTCSessionDescriptionInit = JSON.parse(req.data);
      await this.webrtc.handleAnswer(answer);

      res.json({}, 202);
    });

    this.router.post('/icecandidates', async (req, res) => {
      console.log('POST /icecandidates');
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
    if (this.status === 'started') return;

    this.setupRoutes();

    try {
      this.router.listen(this.port);
    } catch (err) {
      // TODO: improve error handling
      console.error('error starting server', err);
      this.status = 'stoped';
      this.notify();
      return;
    }

    this.status = 'started';
    this.notify();
    console.log('Server started on port: ', this.port);
  }

  stopServer() {
    if (this.status === 'stoped') return;

    this.router.stop();
    this.status = 'stoped';
    this.notify();
    console.log('Server stoped');
  }
}
