import http from 'node:http';

import { userRouter } from "./users/users.js";
import express, { NextFunction, Request, Response} from 'express';

const port = 8000;
const app = express();
app.get('/hello', (req,res) => {
    res.send('Привет!');
    res.end();
});

app.use('/users', userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.message);
    res.status(401).send(err.message);
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`)
})
