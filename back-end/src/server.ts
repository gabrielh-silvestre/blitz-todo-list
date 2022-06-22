import 'dotenv/config';
import { app } from './app';

const PORT = process.env.BACK_PORT || 3001;

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
