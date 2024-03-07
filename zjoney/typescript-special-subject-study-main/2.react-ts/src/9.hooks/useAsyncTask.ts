// Usage
// Implementation

import { useCallback, useState } from 'react';

const task = useAsyncTask(async (data: any) => await myApiRequest(data));
task.run(data);
useEffect(() => {
  console.log(task.status); // 'IDLE' | 'PROCESSING' | 'ERROR' | 'SUCCESS';
}, task.status);

type TStatus = 'IDLE' | 'PROCESSING' | 'ERROR' | 'SUCCESS';

function useAsyncTask<T extends any[], R = any>(
  task: (...args: T) => Promise<R>
) {
  const [status, setStatus] = useState<TStatus>('IDLE');
  const [message, setMessage] = useState('');

  const run = useCallback(async (...arg: T) => {
    setStatus('PROCESSING');
    try {
      const resp: R = await task(...arg);
      setStatus('SUCCESS');
      return resp;
    } catch (error) {
      let message = error?.response?.data?.error?.message || error.message;
      setMessage(message);
      setStatus('ERROR');
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setMessage('');
    setStatus('IDLE');
  }, []);

  return {
    run,
    status,
    message,
    reset,
  };
}

export default useAsyncTask;
