import jwt from 'jsonwebtoken';
import * as usersService from '../users/user.service';

const signToken = async (loginUser: string): Promise<null | string> => {
  const user = await usersService.getByProps(loginUser);
  if (!user) {
    return null;
  }
  const { id, login } = user;
  const token = jwt.sign({ id, login }, process.env.JWT_SECRET_KEY);
  return token;

};
export { signToken };
