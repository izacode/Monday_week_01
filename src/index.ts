import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';
import { authMiddleware } from './middlewares/auth-middleware';

import {videosRouter} from './routes/videos-routes';




const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use("/videos", videosRouter);
const port = process.env.PORT || 5000;

app.use(authMiddleware)
app.use('/videos',videosRouter)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
