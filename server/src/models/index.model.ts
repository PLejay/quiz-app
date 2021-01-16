import mongoose from 'mongoose';
import { db } from '../config/config';

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export const connection = mongoose.connection;