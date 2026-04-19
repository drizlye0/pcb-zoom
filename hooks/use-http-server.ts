import { useEffect, useState } from 'react';
import {
  BridgeServer,
  HttpCallback,
} from 'react-native-http-bridge-refurbished';

// TODO: change to .env
const DEV_MODE = true;
const PORT = 8080;

export const useHttpServer = () => {
  const [server, setServer] = useState<BridgeServer | null>(null);

  const handleOffer: HttpCallback<any> = async (req, res) => {};
  const handleAnswer: HttpCallback<any> = async (req, res) => {};

  const handleCandidates: HttpCallback<any> = async (req, res) => {};
  const handleRemoteCandidates: HttpCallback<any> = async (req, res) => {};

  const startServer = () => {
    const srv = new BridgeServer('http_service', DEV_MODE);

    srv.get('/offer', handleOffer);
    srv.post("/answer", handleAnswer);

    srv.get("/icecandidates", handleCandidates);
    srv.post("/icecandidates", handleRemoteCandidates);

    setServer(srv);
    server?.listen(PORT);
  };

  const cleanup = () => {
    if (server) {
      server.stop();
      setServer(null);
    }
  };

  useEffect(() => {
    return () => {
      cleanup();
    };
  });

  return {
    startServer,
  }
};
