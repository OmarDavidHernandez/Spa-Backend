import { Router } from "express";
import { verificacion } from "../Controllers/Middleware.js";
import { getReservaciones,saveReservaciones,updateReservaciones,deleteReservaciones } from "../Controllers/ReservacionesController.js";
const router = Router();
router.get('/reservaciones',verificacion,getReservaciones);
router.get('/reservaciones/:id',verificacion,getReservaciones);
router.post('/reservaciones',saveReservaciones);
router.put('/reservaciones/:id',verificacion,updateReservaciones);
router.delete('/reservaciones/:id',verificacion,deleteReservaciones);

export default router;