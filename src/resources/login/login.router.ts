import Router from 'express';
import * as loginService from '../login/login.service';

const router = Router();

router.route('/').post(async (req, res) => {
  const {login, password} = req.body;
  const token = await loginService.signToken(login, password);
  console.log('token', token)
  if(!token){
    res.status(403).send('Wrong login/password combination!');
  } else {
    res.status(200).json(token);
  }
});

export default router;
