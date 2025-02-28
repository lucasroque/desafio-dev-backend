import * as functions from "firebase-functions";
import express = require('express');
import routes from './routes';
import cors from 'cors';

const app = express();

app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: true })); // Importante para `multipart/form-data`
app.use('/api/', routes);

exports.desafioBycoders = functions.https.onRequest(app)