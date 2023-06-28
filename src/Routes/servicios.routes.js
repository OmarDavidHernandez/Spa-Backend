import { Router } from "express";
import multer from 'multer';
import { verificacion } from "../Controllers/Middleware.js";
import { getServicios,saveServicios,updateServicios,deleteServicios } from "../Controllers/ServiciosController.js";

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads')
    },
    filename:(req,file,cb)=>{
        const ext = file.originalname.split('.').pop()
        cb(null,Date.now()+'.'+ext)
    }
});

const filtro = (req,file,cb) =>{
    if(file && (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const subir = multer({
    storage: storage, fileFilter:filtro});


const router = Router();
router.get('/servicios',getServicios);
router.get('/servicios/:id',verificacion,getServicios);
router.post('/servicios',verificacion,subir.single('imagen'),saveServicios);
router.put('/servicios/:id',verificacion,subir.single('imagen'),updateServicios);
router.delete('/servicios/:id',verificacion,deleteServicios);

export default router;
