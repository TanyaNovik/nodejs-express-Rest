import { createConnection } from 'typeorm';
import { config } from '../common/ormconfig';

export const connectToDB = async () => {
  // let connection;
  // const connection: Connection = await createConnection(config);

  // try {
  //   connection = getConnectionManager().get('my-connection');
  // } catch (err) {
  //   console.error('!!!!!!!!!!!!!', err);
  // }
  try {
    // if (connection) {
    //   if (!connection.isConnected) {
    //     await connection.connect();
    //   } else {
        await createConnection(config);
      // }
    // }
    console.log('Successfully connected DB!');
  } catch (err) {
    console.error('Connection error!', err);
  }

};

// export const TryDBConnect = async (cb: () => void) => {
//   try {
//     await connectToDB();
//     cb();
//   } catch (err) {
//     console.error('DB connection err', err);
//   }
// };


// import { Connection, createConnection } from 'typeorm';
// import { config } from '../common/ormconfig';
//
//
// export const dbRun = async (): Promise<void> => {
//
//   const connection: Connection = await createConnection(config);
//   console.log('kuku');
//
//   console.log('DB: ', await connection.isConnected);
// };