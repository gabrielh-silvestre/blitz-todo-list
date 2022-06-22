import 'dotenv/config';
import 'express-async-errors';
import { app } from './app';

const PORT = process.env.BACK_PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
