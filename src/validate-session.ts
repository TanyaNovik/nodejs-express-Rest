import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import {getUser} from './resources/users/user.service'

interface IDecodeData{
  id:string,
  login: string
}
const checkToken = async (req:Request, res:Response, next:NextFunction) => {
  const authorizationToken = req.headers.authorization;
  if (authorizationToken !== undefined) {
    const [type, token] = authorizationToken.split(' ');
    if (type === 'Bearer') {
      try{
        const decoded = jwt.verify(token as string, process.env.JWT_SECRET_KEY) as IDecodeData;
        const user = await getUser(decoded.id);
        if(user){
          next();
          return;
        }
      } catch (err){
        res.status(401).send('Unauthorized user!');
      }
    }
  }
  res.status(401).send('Unauthorized user!');
};

export { checkToken};
