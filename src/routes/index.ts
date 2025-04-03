import { Express } from 'express';
import userRoutes from './user.routes';
import bookRoutes from './book.routes';

const routes = (app: Express)=>{
    app.use('/api/users', userRoutes);
    app.use('/api/books', bookRoutes);
}
export default routes;
