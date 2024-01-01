import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  PUBLIC_PATH: get('PUBLIC_PATH').required().default('public').asString(),
  MONGO_URL: get('MONGO_URL').required().asString(),
  MONGO_DBNAME: get('MONGO_DBNAME').required().asString(),
  MONGO_USER: get('MONGO_USER').required().asString(),
  MONGO_PASS: get('MONGO_PASS').required().asString(),
  JWT_SEED: get('JWT_SEED').required().asString(),
  MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
  MAILER_EMAIL: get('MAILER_EMAIL').required().asString(),
  MAILER_SECRET_PASSWORD: get('MAILER_SECRET_PASSWORD').required().asString(),
  WEB_SERVICE_URL: get('WEB_SERVICE_URL').required().asString(),
  SEND_EMAIL: get('SEND_EMAIL').required().default('false').asBool(),
}