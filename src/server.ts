import config from './common/config';
import app from './app';
import {connectToDB} from './helpers/db';

connectToDB()
  app.listen(config.PORT, () =>
    console.log(`App is running on http://localhost:${config.PORT}`)
  );


