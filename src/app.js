import expres from 'express';
import morgan from 'morgan';
import cors from 'cors';

import servicios from './Routes/servicios.routes.js';
import testimonios from './Routes/testimonios.routes.js';
import reservaciones from './Routes/reservaciones.routes.js';
import blog from './Routes/blog.routes.js';
import auth from './Routes/auth.routes.js'

const app = expres();

app.use(cors());
app.use(morgan('dev'));
app.use(expres.json());
app.use(expres.static('public'));

app.use('/',servicios);
app.use('/',testimonios);
app.use('/',reservaciones);
app.use('/',blog);
app.use('/',auth);

app.use( (req,res,next) => {
    res.status(404).json({message:'Página no encontrada'});
});

export default app;