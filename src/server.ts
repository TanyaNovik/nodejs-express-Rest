import PORT from './common/config.js';
import app from './app';

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
