import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  PUBLIC_PATH: get('PUBLIC_PATH').required().default('public').asString(),
  MONGO_URL: get('MONGO_URL').required().asString(),
  MONGO_DBNAME: get('MONGO_DBNAME').required().asString(),
  MONGO_USER: get('MONGO_USER').required().asString(),
  MONGO_PASS: get('MONGO_PASS').required().asString(),
}