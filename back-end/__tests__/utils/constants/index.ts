import 'dotenv/config';

const PORT = process.env.BACK_PORT;

export const BASE_URL = `http://localhost:${PORT || 3001}/api/v1`;

export const ENDPOINTS = {
  USER: '/api/v1/users',
  LOGIN: '/api/v1/login',
  TASK: '/api/v1/tasks',
};

export const DATABASE_RESET = 'npx prisma db seed';
