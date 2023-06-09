import { userRouter } from "./src/users/users.js";
import express from 'express';
const port = 8000;
const app = express();
app.get('/hello', (req, res) => {
    res.send('Привет!');
    res.end();
});
app.use('/users', userRouter);
app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(401).send(err.message);
});
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
