import { httpServer, webrtcManager } from '@/services';
import { useState } from 'react';

type HttpServiceStatus = 'started' | 'stoped';

export const useHttpService = () => {
  const [status, setStatus] = useState<HttpServiceStatus>('stoped');

  const startService = async () => {
    const value = httpServer.startServer();
    await webrtcManager.startLocalStream();

    setStatus(value ? 'started' : 'stoped');
  };

  const stopServer = () => {
    httpServer.stopServer();
    setStatus('stoped');
  };

  return {
    startService,
    stopServer,
    status,
  };
};
