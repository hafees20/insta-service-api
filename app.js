import express from 'express';
import connection from './database/db.js';
import router from './routes/routes.js';

const app = express();

connection()

app.use(router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log("Service started on : ", PORT))