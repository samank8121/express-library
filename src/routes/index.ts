import { Express } from 'express';
import userRoutes from './user.routes';
import bookRoutes from './book.routes';
import borrowRoutes from './borrow.routes';

const routes = (app: Express)=>{
    app.use('/api/users', userRoutes);
    app.use('/api/books', bookRoutes);
    app.use('/api/borrows', borrowRoutes);
}
export default routes;
