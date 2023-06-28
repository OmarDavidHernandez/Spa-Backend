import {conexion} from '../db.js';
import * as fs from 'fs';

export const getServicios = async (req,res) => {
    try{
        const {id} = req.params;
        var where = (id === undefined) ? '' : 'WHERE id ="'+id+'" ';
        const [rows] = await conexion.query('SELECT * FROM servicios '+where);
        return res.json({status:true,data:rows});
    }
    catch(error){
        return res.status(500).json({message:false});
    }
};

export const saveServicios = async(req,res) => {
    try {
        const {nombre,descripcion,precio} = req.body;
        const imagen = '/uploads/'+req.file.filename;
        var validacion = validar(nombre,descripcion,precio);
        if(Object.entries(validacion).length === 0){
            await conexion.query(
            'INSERT INTO servicios(nombre,descripcion,precio,imagen) VALUES (?,?,?,?)',
            [nombre,descripcion,precio,imagen]);
            return res.status(200).json({status:true,message:'Servicio guardado'});
        }
        else{
            return res.status(400).json({status:false,errors:validacion});
        }
    }
    catch (error) {
        return res.status(500).json({status:false,errors:[error.message]});
    }
};
export const updateServicios = async(req,res) => {
    try {
        const {id} = req.params;
        const {nombre,descripcion,precio} = req.body;
        let imagen = '';
        let valores = [nombre,descripcion,precio,id];
        let colImg = '';
        if(req.file != null){
            imagen = '/uploads/'+req.file.filename;
            colImg = ', imagen = ?';
            valores = [nombre,descripcion,precio,imagen,id];
            await eliminarImagen(id);
        }
        var validacion = validar(nombre,descripcion,precio);
        if(Object.entries(validacion).length === 0){
            const [result] = await conexion.query(
            'UPDATE servicios SET nombre = ? , descripcion = ? , precio = ? '+colImg+' WHERE id = ?',
            valores);
            if(result.affectedRows === 0){
                return res.status(404).json({status:'error',errors:[{id:'No existe el ID'}]});
            }
            return res.status(200).json({status:true,message:'Servicio modificado'});
        }
        else{
            return res.status(400).json({status:false,errors:validacion});
        }
    }
    catch (error) {
        return res.status(500).json({status:false,errors:[error.message]});
    }
};
export const deleteServicios = async(req,res) => {
    try {
        const {id} = req.params;
        await eliminarImagen(id);
        const [result] = await conexion.query('DELETE FROM servicios WHERE id = ?',[id]);
        if(result.affectedRows === 0){
            return res.status(404).json({status:'error',errors:[{id:'No existe el ID'}]});
        }
        return res.status(200).json({status:true,message:'Servicio eliminado'});
    }
    catch (error) {
        return res.status(500).json({status:false,errors:[error.message]});
    }
};

function validar(nombre,descripcion,precio){
    var errors =[];
    if(nombre === undefined || nombre.trim() === '' || nombre.lenght > 100){
        errors.push(
            'El nombre del servicio NO debe estar vacío y debe tener máximo 100 caracteres'
        );
    }
    if(descripcion === undefined || descripcion.trim() === '' || descripcion.lenght > 250){
        errors.push(
            'La descripción del servicio NO debe estar vacía y debe tener máximo 250 caracteres'
        );
    }
    if(precio === undefined || precio.trim() === '' || precio.lenght > 6 || isNaN(precio)){
        errors.push(
            'El precio del servicio NO debe estar vacío y debe ser numérico'
        );
    }
    return errors;
}
function validarImg(imagen){
    var errors =[];
    if(imagen === undefined || imagen.trim() === '' || imagen.lenght > 100){
        errors.push(
            'Debes seleccionar una imagen'
        );
    }
    return errors;
}
const eliminarImagen = async(id) =>{
    const [rows] = await conexion.query('SELECT imagen FROM servicios WHERE id= "'+id+'" ');
    const img = rows[0].imagen;
    fs.unlinkSync('./public'+img)
}