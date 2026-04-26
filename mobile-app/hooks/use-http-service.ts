import { httpServer } from '@/services';
import { useEffect, useState } from 'react';

type HttpServiceStatus = 'started' | 'stoped';

export const useHttpService = () => {
  const [status, setStatus] = useState<HttpServiceStatus>('stoped');

  useEffect(() => {
    const unsubscribe = httpServer.subscribe((newStatus) => {
      setStatus(newStatus);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    startService: () => httpServer.startServer(),
    stopService: () => httpServer.stopServer(),
    status,
  };
};
