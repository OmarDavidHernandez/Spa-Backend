import  Jwt  from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import {conexion} from '../db.js';
import {JWT_SECRET,JWT_EXPIRES} from '../config.js';

export const getUsuarios = async (req,res) => {
    try{
        const {id} = req.params;
        var where = (id === undefined) ? '' : 'WHERE id ="'+id+'" ';
        const [rows] = await conexion.query('SELECT * FROM usuarios '+where);
        return res.json({status:true,data:rows});
    }
    catch(error){
        return res.status(500).json({message:false});
    }
};

export const comprobar = async (req,res) => {
    try{
        const {correo,password} = req.body;
        var validacion = validar('comprobar',correo,password);
        if(Object.entries(validacion).length === 0){
            const [rows] = await conexion.query('SELECT * FROM usuarios WHERE correo = ?',
            [correo]);

            if(rows.length  == 0 || !(await bcryptjs.compare(password,rows[0].password))){
                return res.status(404).json({status:false,errors:['Usuario NO válido']});
            }
            const token = Jwt.sign({id:rows[0].id},JWT_SECRET,{
                expiresIn: JWT_EXPIRES
            });
            rows.push({'token':token});
            return res.json({status:true,data:rows,message:['Acceso correcto']});
        }
        else{
            return res.status(400).json({status:false,errors:validacion});
        }
    }
    catch(error){
        return res.status(500).json({status:false,errors:[error.message]});
    }
};

export const saveUsuario = async (req,res) => {
    try{
        const {nombre,correo,password} = req.body;
        var validacion = validar(nombre,correo,password);
        if(Object.entries(validacion).length === 0){
            let pass = await bcryptjs.hash(password,8);
            await conexion.query('INSERT INTO usuarios (nombre,correo,password) VALUES(?,?,?)',
            [nombre,correo,pass]);
            return res.status(200).json({status:true,message:'Usuario creado'});
        }
        else{
            return res.status(400).json({status:false,errors:validacion});
        }
    }
    catch(error){
        return res.status(500).json({status:false,errors:[error.message]});
    }
};
export const updateUsuario = async (req,res) => {
    try{
        const {id} = req.params;
        const {nombre,correo,password} = req.body;
        var validacion = validar(nombre,correo,password);
        if(Object.entries(validacion).length === 0){
            let pass = await bcryptjs.hash(password,8);
            const [rows] = await conexion.query('UPDATE usuarios SET nombre=?,correo=?,password=? WHERE id = ?',
            [nombre,correo,pass,id]);
            if(rows.length  == 0){
                return res.status(404).json({status:false,errors:['Usuario NO válido']});
            }
            return res.status(200).json({status:true,message:'Usuario modificado'});
        }
        else{
            return res.status(400).json({status:false,errors:validacion});
        }
    }
    catch(error){
        return res.status(500).json({status:false,errors:[error.message]});
    }
};

export const deleteUsuario = async(req,res) => {
    try {
        const {id} = req.params;
        const [result] = await conexion.query('DELETE FROM usuarios WHERE id = ?',[id]);
        if(result.affectedRows === 0){
            return res.status(404).json({status:'error',errors:[{id:'No existe el ID'}]});
        }
        return res.status(200).json({status:true,message:'Usuario eliminado'});
    }
    catch (error) {
        return res.status(500).json({status:false,errors:[error.message]});
    }
};
function validar(nombre,correo,password){
    var errors =[];
    if(nombre === undefined || nombre.trim() === '' || nombre.lenght > 100){
        errors.push(
            'El nombre NO debe estar vacío y debe tener máximo 100 caracteres'
        );
    }
    if(correo === undefined || correo.trim() === '' || correo.lenght > 100){
        errors.push(
            'El correo NO debe estar vacío y debe tener máximo 100 caracteres'
        );
    }
    if(password === undefined || password.trim() === '' || password.lenght > 250){
        errors.push(
            'La contraseña NO debe estar vacía'
        );
    }
    return errors;
}