import { config } from 'dotenv';

config();
export const {
  PORT,
  BASE_URL,
  MAILING_HOST,
  MAILING_EMAIL,
  MAILING_USERNAME,
  MAILING_PASSWORD,
} = process.env;
