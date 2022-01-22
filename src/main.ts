import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import DatabaseConnection from './core/infra/database/connections/connections';
import { initServer } from './core/presentation/server/server';
require('dotenv/config');

const app = express();
app.use(express.json());
app.use(cors());

DatabaseConnection.initConnection()
   .then(() => {
      initServer();
   })
   .catch((error) => {
      console.log(error);
   });
