import { Router } from "express";
import { verificacion } from "../Controllers/Middleware.js";
import { getTestimonios,saveTestimonios,updateTestimonios,deleteTestimonios } from "../Controllers/TestimoniosController.js";
const router = Router();
router.get('/testimonios',getTestimonios);
router.get('/testimonios/:id',verificacion,getTestimonios);
router.post('/testimonios',verificacion,saveTestimonios);
router.put('/testimonios/:id',verificacion,updateTestimonios);
router.delete('/testimonios/:id',verificacion,deleteTestimonios);

export default router;
