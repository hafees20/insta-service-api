import express from 'express';
import connection from './database/db.js';
import router from './routes/routes.js';
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express();

connection()

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log("Service started on : ", PORT))