import { createConnection } from 'typeorm';
import { config } from '../common/ormconfig';

export const connectToDB = async () => {
  try {
    await createConnection(config);

    console.log('Successfully connected DB!');
  } catch (err) {
    console.error('Connection error!', err);
  }

};