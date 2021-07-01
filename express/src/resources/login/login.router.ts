import Router from 'express';
import * as loginService from '../login/login.service';

const router = Router();

router.route('/').post(async (req, res) => {
  const {login} = req.body;
  const token = await loginService.signToken(login);
  if(!token){
    res.status(403).send('Wrong login/password combination!');
  } else {
    res.status(200).json({token});
  }
});

export default router;
