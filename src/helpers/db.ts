import { Connection, createConnection } from 'typeorm';
import { config } from '../common/ormconfig';
import * as userService from '../resources/users/user.service';


const createUser = async () => {
  const userLogin = 'admin';
  const userPassword = 'admin';
  const userName = 'admin';

  const createdUser = await userService.getByProps(userLogin);
  if(!createdUser){
    await userService.save(userName, userLogin, userPassword);
  }
}

export const connectToDB = async () => {
  try {
    const connection: Connection = await createConnection(config);
    if(connection.isConnected){
      console.log('Successfully connected DB!');
      await createUser();
    }
  } catch (err) {
    console.error('Connection error!', err);
  }

};

