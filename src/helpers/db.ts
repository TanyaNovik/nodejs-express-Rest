import { createConnection } from 'typeorm';
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
    await createConnection(config);
    await createUser();
    console.log('Successfully connected DB!');
  } catch (err) {
    console.error('Connection error!', err);
  }

};

