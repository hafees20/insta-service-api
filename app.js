import express from 'express';
import connection from './database/db.js';

const app = express();


connection()

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log("Service started on : ", PORT))