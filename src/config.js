import { config } from "dotenv";
config();
//BD
export const PORT = process.env.PORT;
export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_PORT = process.env.DB_PORT;
//EMAIL
export const EMAIL_HOST=process.env.EMAIL_HOST
export const EMAIL_USER=process.env.EMAIL_USER
export const EMAIL_PASS=process.env.EMAIL_PASS
export const EMAIL_PORT=process.env.EMAIL_PORT
export const EMAIL_TYPE=process.env.EMAIL_TYPE
export const JWT_SECRET=process.env.JWT_SECRET
export const JWT_EXPIRES=process.env.JWT_EXPIRES