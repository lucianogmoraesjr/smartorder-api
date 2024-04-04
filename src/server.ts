import { server } from './app';
import { env } from './env';

server.listen(env.PORT, () =>
  console.log(`🔥 server running on http://localhost:${env.PORT}`),
);
