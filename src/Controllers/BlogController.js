import {conexion} from '../db.js';
import * as fs from 'fs';

export const getBlog = async (req,res) => {
    try{
        const {id} = req.params;
        var where = (id === undefined) ? '' : 'WHERE id ="'+id+'" ';
        const [rows] = await conexion.query('SELECT * FROM blog '+where);
        return res.json({status:true,data:rows});
    }
    catch(error){
        return res.status(500).json({message:false});
    }
};

export const saveBlog = async(req,res) => {
    try {
        const {descripcion,titulo} = req.body;
        const imagen = '/uploads/'+req.file.filename;
        var validacion = validar(descripcion,titulo);
        if(Object.entries(validacion).length === 0){
            await conexion.query(
            'INSERT INTO blog(descripcion,titulo,imagen,fecha) VALUES (?,?,?,DATE(NOW()))',
            [descripcion,titulo,imagen]);
            return res.status(200).json({status:true,message:'Entrada de blog guardada'});
        }
        else{
            return res.status(400).json({status:false,errors:validacion});
        }
    }
    catch (error) {
        return res.status(500).json({status:false,errors:[error.message]});
    }
};
export const updateBlog = async(req,res) => {
    try {
        const {id} = req.params;
        const {descripcion,titulo} = req.body;
        let imagen = '';
        let valores = [descripcion,titulo,id];
        let colImg = '';
        if(req.file != null){
            imagen = '/uploads/'+req.file.filename;
            colImg = ', imagen = ?';
            valores = [descripcion,titulo,imagen,id];
            await eliminarImagen(id);
        }
        var validacion = validar(descripcion,titulo);
        if(Object.entries(validacion).length === 0){
            const [result] = await conexion.query(
            'UPDATE blog SET descripcion = ? , titulo = ? '+colImg+' WHERE id = ?',
            valores);
            if(result.affectedRows === 0){
                return res.status(404).json({status:'error',errors:[{id:'No existe el ID'}]});
            }
            return res.status(200).json({status:true,message:'Entrada de blog modificada'});
        }
        else{
            return res.status(400).json({status:false,errors:validacion});
        }
    }
    catch (error) {
        return res.status(500).json({status:false,errors:[error.message]});
    }
};
export const deleteBlog = async(req,res) => {
    try {
        const {id} = req.params;
        await eliminarImagen(id);
        const [result] = await conexion.query('DELETE FROM blog WHERE id = ?',[id]);
        if(result.affectedRows === 0){
            return res.status(404).json({status:'error',errors:[{id:'No existe el ID'}]});
        }
        return res.status(200).json({status:true,message:'Entrada de blog eliminada'});
    }
    catch (error) {
        return res.status(500).json({status:false,errors:[error.message]});
    }
};

function validar(descripcion,titulo){
    var errors =[];
    if(titulo === undefined || titulo.trim() === '' || titulo.lenght > 200){
        errors.push(
            'El título de la entrada de blog NO debe estar vacío y debe tener máximo 200 caracteres'
        );
    }
    if(descripcion === undefined || descripcion.trim() === ''){
        errors.push(
            'La redacción de la entrada de blog NO debe estar vacía'
        );
    }
    return errors;
}

const eliminarImagen = async(id) =>{
    const [rows] = await conexion.query('SELECT imagen FROM blog WHERE id= "'+id+'" ');
    const img = rows[0].imagen;
    fs.unlinkSync('./public'+img)
}