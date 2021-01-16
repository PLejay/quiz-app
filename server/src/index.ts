import express from 'express';
import cors from 'cors';
import { port } from './config/config';
import { router } from './router';
import { connection } from './models/index.model';


const app = express();
app.use(express.json());
app.use(cors());
app.use(router);


app.listen(port, () => {
  console.log(`🚀🚀 Server listening on port ${port} 🚀🚀`);
  const dbStatus = connection.readyState;
  console.log(`${dbStatus === 2 ? '🐦 Database connected! 🐦' : 'DB Status' + dbStatus}`);
});