import express from 'express';
const app = express();

app.listen(5050, () => console.log(`Connected to DB. Server running on port: 5050`));