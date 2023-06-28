import { Router } from "express";
import multer from 'multer';
import { verificacion } from "../Controllers/Middleware.js";
import { getBlog,saveBlog,updateBlog,deleteBlog } from "../Controllers/BlogController.js";

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
    storage: storage, fileFilter:filtro
});

const router = Router();
router.get('/blog',getBlog);
router.get('/blog/:id',verificacion,getBlog);
router.post('/blog',verificacion,subir.single('imagen'),saveBlog);
router.put('/blog/:id',verificacion,subir.single('imagen'),updateBlog);
router.delete('/blog/:id',verificacion,deleteBlog);

export default router;
