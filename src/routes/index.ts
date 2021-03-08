import {Router} from 'express';
import userRouter from './devices.routes';

const routes = Router();

routes.use('/device', userRouter);

export default routes;