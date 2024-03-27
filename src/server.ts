import mongoose from 'mongoose';

import { server } from './app';

mongoose
  .connect('mongodb://localhost:27017')
  .then(() => {
    console.log('MongoDB connected successfully');

    server.listen(3333, () =>
      console.log('🔥 server running on http://localhost:3333'),
    );
  })
  .catch(() => console.log('Error when trying to connect to MongoDB'));
